'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const context: Record<string, Record<string, { label: string; title: string; description: string }>> = {
  package: {
    'dubai-escape': { label: 'Package enquiry', title: 'Dubai Escape', description: 'Tell us a few details about your trip and we will take it from there.' },
    'london-discovery': { label: 'Package enquiry', title: 'London Discovery', description: 'Tell us a few details about your trip and we will take it from there.' },
    'cape-town-explorer': { label: 'Package enquiry', title: 'Cape Town Explorer', description: 'Tell us a few details about your trip and we will take it from there.' },
  },
  event: {
    'dubai-shopping-festival': { label: 'Event enquiry', title: 'Dubai Shopping Festival', description: 'Tell us your preferred dates and what you have in mind.' },
    'new-year-in-dubai': { label: 'Event enquiry', title: 'New Year in Dubai', description: 'Tell us your preferred dates and what you have in mind.' },
    'cape-town-wine-culture-weekend': { label: 'Event enquiry', title: 'Cape Town Wine & Culture Weekend', description: 'Tell us your preferred dates and what you have in mind.' },
  },
  destination: {
    dubai: { label: 'Trip enquiry', title: 'A trip to Dubai', description: 'Tell us a little about the journey you are considering.' },
    london: { label: 'Trip enquiry', title: 'A trip to London', description: 'Tell us a little about the journey you are considering.' },
    paris: { label: 'Trip enquiry', title: 'A trip to Paris', description: 'Tell us a little about the journey you are considering.' },
    'cape-town': { label: 'Trip enquiry', title: 'A trip to Cape Town', description: 'Tell us a little about the journey you are considering.' },
  },
};

export default function EnquirePage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'general';
  const slug = searchParams.get('slug') || '';
  const selected = context[type]?.[slug];
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setError('');
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.type = selected ? type : 'general';
    payload.slug = selected ? slug : '';

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong.');
      setStatus('success');
      event.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f4ef] text-slate-950">
      <header className="border-b border-slate-900/10"><nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10"><Link href="/" className="font-serif text-2xl tracking-tight">TravelQ.</Link><Link href="/contact" className="text-sm text-slate-500 hover:text-slate-950">General enquiry ↗</Link></nav></header>
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{selected?.label || 'Start an enquiry'}</p><h1 className="mt-6 max-w-2xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] sm:text-7xl">{selected?.title || 'Let’s plan the next step.'}</h1><p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">{selected?.description || 'Share a few details about what you have in mind. You do not need to have the entire trip figured out yet.'}</p><div className="mt-16 hidden border-t border-slate-900/10 pt-7 lg:block"><p className="text-sm leading-7 text-slate-500">No account. No long application form. Just enough information for TravelQ to understand what you are looking for.</p></div></motion.div>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-white p-7 sm:p-10 lg:p-12">
          {status === 'success' ? <div className="py-12"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Enquiry received</p><h2 className="mt-5 font-serif text-5xl leading-tight">We’ve got it.</h2><p className="mt-6 max-w-md text-lg leading-8 text-slate-600">Thanks for getting in touch. We’ve received your enquiry and sent a confirmation to your email.</p><Link href="/" className="mt-10 inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white">Back to TravelQ</Link></div> : <><div className="mb-10 border-b border-slate-200 pb-7">{selected && <><p className="text-xs uppercase tracking-[0.2em] text-slate-400">You are enquiring about</p><p className="mt-2 font-serif text-3xl">{selected.title}</p></>}</div><form className="space-y-8" onSubmit={handleSubmit}><div className="grid gap-8 sm:grid-cols-2"><label><span className="text-sm font-medium">Your name</span><input name="name" required type="text" autoComplete="name" placeholder="Full name" className="mt-3 w-full border-b border-slate-300 bg-transparent py-4 outline-none focus:border-slate-950" /></label><label><span className="text-sm font-medium">Email address</span><input name="email" required type="email" autoComplete="email" placeholder="you@example.com" className="mt-3 w-full border-b border-slate-300 bg-transparent py-4 outline-none focus:border-slate-950" /></label></div><div className="grid gap-8 sm:grid-cols-2"><label><span className="text-sm font-medium">Phone or WhatsApp</span><input name="phone" required type="tel" autoComplete="tel" placeholder="Your preferred number" className="mt-3 w-full border-b border-slate-300 bg-transparent py-4 outline-none focus:border-slate-950" /></label><label><span className="text-sm font-medium">Preferred travel date</span><input name="travelDate" type="date" className="mt-3 w-full border-b border-slate-300 bg-transparent py-4 outline-none focus:border-slate-950" /></label></div><label><span className="text-sm font-medium">How many people are travelling?</span><select name="travellers" defaultValue="1" className="mt-3 w-full border-b border-slate-300 bg-transparent py-4 outline-none focus:border-slate-950"><option value="1">1 traveller</option><option value="2">2 travellers</option><option value="3">3 travellers</option><option value="4">4 travellers</option><option value="5+">5+ travellers</option></select></label><label><span className="text-sm font-medium">Anything else we should know? <span className="text-slate-400">Optional</span></span><textarea name="notes" rows={4} maxLength={1000} placeholder="Tell us about your preferences, questions or anything important for the trip." className="mt-3 w-full resize-none border-b border-slate-300 bg-transparent py-4 outline-none focus:border-slate-950" /></label>{status === 'error' && <p role="alert" className="text-sm text-red-600">{error}</p>}<button disabled={status === 'loading'} type="submit" className="inline-flex rounded-full bg-slate-950 px-7 py-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60">{status === 'loading' ? 'Sending enquiry…' : <>Send enquiry <span className="ml-6">↗</span></>}</button><p className="text-sm leading-6 text-slate-400">By submitting, you are sharing these details so TravelQ can respond to your enquiry.</p></form></>}
        </motion.div>
      </section>
    </main>
  );
}
