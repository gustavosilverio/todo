import { useMutation } from "@tanstack/react-query"
import { CreateUser } from "../models/user.types"
import { api } from "@/lib/config/axios"
import { toast } from "sonner"

// Mutations
export const useCreateUser = () => {
	return useMutation({
		mutationFn: async (request: CreateUser.Request) => {
			await api.post<CreateUser.Response>("/user", {
				...request,
			})
		},
		onError: () => {
			toast.error("Error while creating user.")
		},
	})
}
