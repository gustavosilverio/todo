import { useMutation } from "@tanstack/react-query"
import { Login } from "../models/auth.types"
import { api } from "@/lib/config/axios"
import { toast } from "sonner"

// Queries
export const useLoginUser = () => {
	return useMutation({
		mutationFn: async (request: Login.Request) => {
			const { data } = await api.post<Login.Response>("/auth/login", {
				...request,
			})

			return data
		},
		onError: () => {
			toast.error("Error while logging you in.")
		},
	})
}
