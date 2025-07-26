import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name is too short'),
    email: z.email('Email is invalid'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password is too long'),
    passwordConfirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })
