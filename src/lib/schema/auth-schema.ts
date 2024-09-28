import { z } from "zod";

export const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().max(100).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});
