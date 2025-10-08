import { REGEX } from "@/lib/regex"
import z from "zod"

export const registerSchema = z
	.object({
		name: z.string().trim().min(1, "Name is required"),
		email: z.string().min(1, "Email is required").regex(REGEX.email, "Invalid email"),
		password: z.string().min(6, "Minimum of 6 characters"),
		confirmPassword: z.string().min(6, "Minimum of 6 characters"),
	})
	.superRefine((values, context) => {
		if (values.confirmPassword !== values.password)
			context.addIssue({
				code: "custom",
				message: "Password did not match",
				path: ["confirmPassword"],
				input: values.confirmPassword,
			})
	})
