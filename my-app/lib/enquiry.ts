import { z } from 'zod';

export const enquiryContext = {
  package: {
    'dubai-escape': 'Dubai Escape',
    'london-discovery': 'London Discovery',
    'cape-town-explorer': 'Cape Town Explorer',
  },
  event: {
    'dubai-shopping-festival': 'Dubai Shopping Festival',
    'new-year-in-dubai': 'New Year in Dubai',
    'cape-town-wine-culture-weekend': 'Cape Town Wine & Culture Weekend',
  },
  destination: {
    dubai: 'A trip to Dubai',
    london: 'A trip to London',
    paris: 'A trip to Paris',
    'cape-town': 'A trip to Cape Town',
    istanbul: 'A trip to Istanbul',
    maldives: 'A trip to the Maldives',
    tokyo: 'A trip to Tokyo',
    'new-york': 'A trip to New York',
    rome: 'A trip to Rome',
    marrakech: 'A trip to Marrakech',
    reykjavik: 'A trip to Reykjavik',
    zanzibar: 'A trip to Zanzibar',
    bali: 'A trip to Bali',
    santorini: 'A trip to Santorini',
  },
} as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  phone: z.string().trim().min(6, 'Please enter a valid phone number.').max(40),
  travelDate: z.string().optional().default(''),
  travellers: z.enum(['1', '2', '3', '4', '5+']),
  notes: z.string().trim().max(1000).optional().default(''),
  type: z.enum(['package', 'event', 'destination', 'general']).default('general'),
  slug: z.string().trim().max(120).optional().default(''),
});

export function getEnquirySubject(type: string, slug: string) {
  if (type === 'general') return 'General travel enquiry';
  const group = enquiryContext[type as keyof typeof enquiryContext];
  if (!group || !(slug in group)) return null;
  return group[slug as keyof typeof group];
}
