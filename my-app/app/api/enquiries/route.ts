import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectToDatabase } from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { enquirySchema, getEnquirySubject } from '@/lib/enquiry';

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const requests = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = requests.get(key);
  if (!current || now > current.resetAt) {
    requests.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error('Email service is not configured.');
  return nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a moment and try again.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check the information you entered.', issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const data = parsed.data;
    const subject = getEnquirySubject(data.type, data.slug);
    if (!subject) {
      return NextResponse.json({ error: 'This enquiry is no longer available.' }, { status: 400 });
    }

    const travelDate = data.travelDate ? new Date(data.travelDate) : null;
    if (travelDate && Number.isNaN(travelDate.getTime())) {
      return NextResponse.json({ error: 'Please enter a valid travel date.' }, { status: 400 });
    }

    await connectToDatabase();
    const enquiry = await Enquiry.create({ ...data, subject, travelDate });

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) throw new Error('Admin email is not configured.');

    const transporter = createTransporter();
    const dateText = travelDate ? travelDate.toLocaleDateString('en-GB', { dateStyle: 'long' }) : 'Not specified';
    const safeNotes = data.notes || 'No additional notes provided.';

    const [travellerEmail, adminNotification] = await Promise.allSettled([
      transporter.sendMail({
        from: `TravelQ <${process.env.GMAIL_USER}>`,
        to: data.email,
        subject: `We received your enquiry about ${subject}`,
        text: `Hi ${data.name},\n\nThanks for contacting TravelQ. We received your enquiry about ${subject}.\n\nOur team will review your details and get back to you.\n\nTravelQ`,
      }),
      transporter.sendMail({
        from: `TravelQ Enquiries <${process.env.GMAIL_USER}>`,
        to: adminEmail,
        subject: `New enquiry: ${subject}`,
        text: `New TravelQ enquiry\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${subject}\nType: ${data.type}\nTravel date: ${dateText}\nTravellers: ${data.travellers}\nNotes: ${safeNotes}\nEnquiry ID: ${enquiry._id}`,
      }),
    ]);

    if (travellerEmail.status === 'rejected' || adminNotification.status === 'rejected') {
      console.error('Enquiry email failure', { traveller: travellerEmail.status, admin: adminNotification.status });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Enquiry submission error', error);
    return NextResponse.json({ error: 'We could not send your enquiry right now. Please try again.' }, { status: 500 });
  }
}
