import { z } from 'zod';

// Define the schema for the environment variables
const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
