import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TodosSchema, todosSchema } from "../../todos.schema"
import { EditProps } from "./Edit.types"
import { useEffect } from "react"
import { useUpdateTodo } from "@/api/controllers/todo"

export const useEdit = ({ onClose, data }: EditProps) => {
	const { mutateAsync: updateTodoAsync, isPending: updateTodoIsPending } = useUpdateTodo()

	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(todosSchema),
		disabled: updateTodoIsPending,
		defaultValues: {
			name: "",
			description: "",
		},
	})

	const onSubmit = async (values: TodosSchema) => {
		if (!data) return

		await updateTodoAsync({
			idTodo: data.id,
			name: values.name,
			description: values.description,
		})

		onClose(false)
	}

	useEffect(() => {
		if (data)
			reset({
				...data,
			})
	}, [data, reset])

	return {
		control,
		handleSubmit,
		onSubmit,
		updateTodoIsPending,
	}
}
