import z from "zod"

export const todosSchema = z.object({
	name: z.string().min(1, "Title is required"),
	description: z
		.string()
		.optional()
		.transform((value) => (value ? value : undefined)),
})
