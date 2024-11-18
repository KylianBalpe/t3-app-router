import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  confirm_password: z.string().min(6).max(100),
});

export const editUsernameSchema = z.object({
  username: z.string().min(3).max(100),
});
