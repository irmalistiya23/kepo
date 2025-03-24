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