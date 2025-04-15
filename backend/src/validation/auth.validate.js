import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password is too short"),
});

export const registerSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password is too short"),
  name: z.string()
});

export const resetSchema = z
  .object({
    email: z.string().email("Invalid email"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
