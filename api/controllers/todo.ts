import { api } from "@/lib/config/axios"
import { useMutation, useQuery } from "@tanstack/react-query"
import { CreateTodo, DeleteTodo, GetTodosByUserId, TodoQueryKeys, UpdateIsDoneTodo, UpdateTodo } from "../models/todo"
import { toast } from "sonner"
import { queryClient } from "@/lib/config/queryClient"

// Mutations
export const useCreateTodo = () => {
	return useMutation({
		mutationFn: async (request: CreateTodo.Request) => {
			await api.post("/todo", { ...request })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TodoQueryKeys.GetTodosByUserId],
				exact: false,
			})
		},
		onError: () => {
			toast.error("An error ocurred while trying to create a todo")
		},
	})
}

export const useUpdateIsDoneTodo = () => {
	return useMutation({
		mutationFn: async (request: UpdateIsDoneTodo.Request) => {
			const { data } = await api.patch<UpdateIsDoneTodo.Response>(`/todo/${request.idTodo}`, null, {
				params: { isDone: request.isDone },
			})

			return data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TodoQueryKeys.GetTodosByUserId],
				exact: false,
			})
		},
		onError: () => {
			toast.error("An error ocurred while trying to update the todo")
		},
	})
}

export const useUpdateTodo = () => {
	return useMutation({
		mutationFn: async (request: UpdateTodo.Request) => {
			const { data } = await api.put<UpdateTodo.Response>(`/todo/${request.idTodo}`, { ...request })

			return data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TodoQueryKeys.GetTodosByUserId],
				exact: false,
			})
		},
		onError: () => {
			toast.error("An error ocurred while trying to update the todo")
		},
	})
}

export const useDeleteTodo = () => {
	return useMutation({
		mutationFn: async (request: DeleteTodo.Request) => {
			const { data } = await api.delete(`/todo/${request.idTodo}`)

			return data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [TodoQueryKeys.GetTodosByUserId],
				exact: false,
			})
		},
		onError: () => {
			toast.error("An error ocurred while trying to delete the todo")
		},
	})
}

// Queries
export const useGetTodosByUserId = (request: GetTodosByUserId.Request) => {
	return useQuery({
		queryKey: [TodoQueryKeys.GetTodosByUserId, request],
		enabled: !!request.userId,
		queryFn: async () => {
			const { data } = await api.get<GetTodosByUserId.Response>("/todo/get-by-user-id", {
				params: {
					...request,
				},
			})

			return data
		},
	})
}
