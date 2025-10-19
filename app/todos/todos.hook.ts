import { useCreateTodo, useGetTodosByUserId } from "@/api/controllers/todo"
import { useReduxSelector } from "@/lib/hooks/useReduxSelector"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { todosSchema } from "./todos.schema"

export const useTodos = () => {
	const [enableDescription, setEnableDescription] = useState(false)

	const userCredentials = useReduxSelector("credentials")

	const { data: todos, isPending: getTodosByUserIdIsPending } = useGetTodosByUserId({
		userId: userCredentials?.id,
	})

	const { mutateAsync: createTodoAsync, isPending: createTodoIsPending } = useCreateTodo()

	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(todosSchema),
		disabled: createTodoIsPending,
		defaultValues: {
			name: "",
			description: "",
		},
	})

	const onSubmit = handleSubmit(async (values) => {
		if (!userCredentials) return

		await createTodoAsync({
			userId: userCredentials.id,
			...values,
		})

		reset()
	})
	return {
		enableDescription,
		setEnableDescription,
		todos: todos?.data,
		getTodosByUserIdIsPending,
		control,
		onSubmit,
		createTodoIsPending,
	}
}
