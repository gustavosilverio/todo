import { REGEX } from "@/lib/regex"
import z from "zod"

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").regex(REGEX.email, "Invalid email"),
	password: z.string().min(6, "Minimum of 6 characters"),
})
