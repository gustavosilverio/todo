import { useMutation } from "@tanstack/react-query"
import { Login, RefreshToken, RevokeUser } from "../models/auth.types"
import { api, resetAxiosData } from "@/lib/config/axios"
import { toast } from "sonner"
import { credentialsActions, CredentialsSlice } from "@/lib/redux/credentials"
import { useDispatch } from "react-redux"

// Methods
export const refreshTokenAsync = async (request: RefreshToken.Request) => {
	if (!request.refreshToken || !request.accessToken) throw new Error("Insufficient data")

	const { data: response } = await api.put<RefreshToken.Response>(
		"/auth/refresh",
		{
			...request,
		},
		{ headers: { Authorization: request.accessToken } }
	)

	if (!response.success) throw new Error("We were unsuccessful in our attempt to renew the token.")

	return response.data
}

export const revokeUser = async (request: RevokeUser.Request) => {
	if (!request.userId) return

	await api.delete(`/auth/revoke/${request.userId}`)
}

// Mutations
export const useLoginUser = () => {
	const dispatch = useDispatch()

	return useMutation({
		mutationFn: async (request: Login.Request) => {
			const { data } = await api.post<Login.Response>("/auth/login", {
				...request,
			})

			return data
		},
		onSuccess: (data) => {
			const responseData = data.data

			const credentials: CredentialsSlice.State = {
				id: responseData.userCredentials.id,
				name: responseData.userCredentials.name,
				email: responseData.userCredentials.email,
				token: responseData.token,
				refreshToken: responseData.refreshToken,
				refreshTokenExpiryTime: responseData.refreshTokenExpiryTime,
			}

			api.defaults.headers.Authorization = `Bearer ${responseData.token}`

			dispatch(credentialsActions.defineCredentials(credentials))
			resetAxiosData()
		},
		onError: () => {
			toast.error("Error while logging you in.")
		},
	})
}
