import { redirect } from "next/navigation"
import { queryClient } from "../config/queryClient"
import { todoStore } from "../redux"
import { removeAllCookies } from "../redux/cookie"
import { credentialsActions } from "../redux/credentials"
import { api } from "../config/axios"
import { revokeUser } from "@/api/controllers/auth"

export const disconnectUser = async (toastDescription?: string, userId?: number) => {
	revokeUser({ userId })

	removeAllCookies()

	todoStore.dispatch(
		credentialsActions.cleanCredentials({
			toastDescription,
		})
	)

	api.defaults.headers.Authorization = ""

	queryClient.clear()

	redirect("/")
}
