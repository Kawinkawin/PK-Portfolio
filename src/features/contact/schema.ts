import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your mobile number.')
    .regex(/^[+\d][\d\s()-]{6,19}$/, 'Please enter a valid mobile number.'),
  message: z.string().trim().min(1, 'Please enter your message.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
