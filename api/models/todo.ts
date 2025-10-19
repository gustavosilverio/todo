import { CommonResponse } from "./index.types"

// Query keys
export enum TodoQueryKeys {
	GetTodosByUserId = "get-todos-by-user-id",
}

// Mutations
export namespace CreateTodo {
	export type Request = {
		userId: number
		name: string
		description?: string | undefined
	}
}

export namespace UpdateIsDoneTodo {
	export type Request = {
		idTodo: number
		isDone: boolean
	}
	export type Response = CommonResponse<Todo>
}

export namespace UpdateTodo {
	export type Request = {
		idTodo: number
		name: string
		description?: string | undefined
	}
	export type Response = CommonResponse<Todo>
}

export namespace DeleteTodo {
	export type Request = {
		idTodo: number
	}
}

// Queries
export namespace GetTodosByUserId {
	export type Request = {
		userId: number | undefined
	}
	export type Response = CommonResponse<Todo[]>
}

// Types
export type Todo = {
	id: number
	userId: number
	name: string
	description: string | undefined
	isDone: boolean
	createdAt: string
	updatedAt: string
}
