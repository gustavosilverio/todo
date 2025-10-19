import { Todo } from "@/api/models/todo"

export type EditProps = {
	open: boolean
	onClose: (open: boolean) => void
	data: Pick<Todo, "id" | "name" | "description"> | null
}
