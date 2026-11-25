import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('Please enter a valid email address.'),
  message: z.string().trim().min(1, 'Please enter your message.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
