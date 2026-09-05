import { InferSchemaType, Model, Schema, model, models } from 'mongoose';

const enquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    travelDate: { type: Date, default: null },
    travellers: { type: String, required: true, enum: ['1', '2', '3', '4', '5+'] },
    notes: { type: String, trim: true, maxlength: 1000, default: '' },
    type: { type: String, required: true, enum: ['package', 'event', 'destination', 'general'] },
    slug: { type: String, trim: true, maxlength: 120, default: '' },
    subject: { type: String, required: true, trim: true, maxlength: 160 },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

export type EnquiryDocument = InferSchemaType<typeof enquirySchema>;

const Enquiry: Model<EnquiryDocument> = models.Enquiry || model<EnquiryDocument>('Enquiry', enquirySchema);

export default Enquiry;
