import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email cannot be empty" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "Name cannot be empty" })
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name cannot be more than 255 characters"),
  email: z
    .string({ required_error: "Email cannot be empty" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
