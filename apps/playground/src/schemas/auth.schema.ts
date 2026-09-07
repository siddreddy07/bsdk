import { z } from "zod"

export const LoginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const SignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type LoginSchemaData = z.infer<typeof LoginSchema>
export type SignUpSchemaData = z.infer<typeof SignUpSchema>