import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirm_password: z.string().min(6).max(100),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (password !== confirm_password) {
      return ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const editUsernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(100)
    .refine((s) => !s.includes(" "), "Username cannot contain spaces"),
});
