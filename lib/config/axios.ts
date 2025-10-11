import axios from "axios"
import { TodoError } from "../utils/index.types"
import { Cookie, getCookie } from "../redux/cookie"
import { credentialsActions, CredentialsSlice } from "../redux/credentials"
import { isPast } from "date-fns"
import { todoStore } from "../redux"
import { disconnectUser } from "../utils/auth"
import { refreshTokenAsync } from "@/api/controllers/auth"

let isUpdatingToken = false
let haveDisconnected = false

let failedRequestsQueue: {
	resolve: (token: string) => void
	reject: (error?: TodoError) => void
}[] = []

/**
 * Reset all data related to Axios, as the token updating status,
 * the failed requests queue and if the user have been disconnected
 */
export const resetAxiosData = () => {
	isUpdatingToken = false
	haveDisconnected = false
	failedRequestsQueue = []
}

const commonHeaders = {
	"Content-Type": "application/json",
}

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:7000",
	headers: commonHeaders,
})

const instances = [api]

instances.forEach((instance) => {
	instance.interceptors.request.use((config) => {
		const credentials = getCookie<CredentialsSlice.State>(Cookie.Credentials)
		const accessToken = credentials?.token

		if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`

		return config
	})

	instance.interceptors.response.use(
		(res) => res,
		async (error) => {
			if (error.response?.status === 401) {
				if (haveDisconnected) return Promise.reject(error)

				if (isUpdatingToken) {
					return new Promise((resolve, reject) => {
						const originalConfig = error.config

						failedRequestsQueue.push({
							resolve: (token) => {
								if (!originalConfig) return
								originalConfig.headers.Authorization = `Bearer ${token}`
								resolve(instance(originalConfig))
							},
							reject: (error) => {
								reject(error)
							},
						})
					})
				}

				try {
					isUpdatingToken = true
					const credentials = getCookie<CredentialsSlice.State>(Cookie.Credentials)

					if (!credentials || !credentials.token || !credentials.refreshToken)
						throw new Error("Credentials not found.")

					if (isPast(new Date(credentials.refreshTokenExpiryTime))) throw new Error("Expired refresh token.")

					const {
						token: newAccessToken,
						refreshToken: newRefreshToken,
						refreshTokenExpiryTime: newExpiration,
					} = await refreshTokenAsync({
						refreshToken: credentials.refreshToken,
						accessToken: credentials.token,
					})

					if (!newAccessToken || !newRefreshToken || !newExpiration)
						throw new Error("Unable to obtain new credentials. Please log in again.")

					credentials.token = newAccessToken
					credentials.refreshToken = newRefreshToken
					credentials.refreshTokenExpiryTime = newExpiration

					todoStore.dispatch(credentialsActions.defineCredentials(credentials))

					instance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`

					failedRequestsQueue.forEach((prom) => {
						prom.resolve(newAccessToken)
					})

					failedRequestsQueue = []
				} catch {
					haveDisconnected = true
					disconnectUser("Your session has expired. Please, log in again.")
				} finally {
					isUpdatingToken = false
				}
			}

			return Promise.reject(error)
		}
	)
})
