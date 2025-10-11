import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Cookie, createPersistentCookie, getCookie, removeCookie } from "./cookie"
import { api } from "../config/axios"
import { toast } from "sonner"

export namespace CredentialsSlice {
	export type State = {
		id: number
		name: string
		email: string
		token: string
		refreshToken: string
		refreshTokenExpiryTime: string
	} | null

	export namespace ReducerActions {
		export type DefineCredentials = PayloadAction<State>

		export type CleanCredentials = PayloadAction<{
			toastDescription?: string
		}>
	}
}

const initialState: CredentialsSlice.State = getCookie<CredentialsSlice.State>(Cookie.Credentials)

export const { actions: credentialsActions, reducer: credentialsReducer } = createSlice({
	name: "credentials",
	initialState,
	reducers: {
		defineCredentials: (_, action: CredentialsSlice.ReducerActions.DefineCredentials) => {
			createPersistentCookie(Cookie.Credentials, action.payload)

			return action.payload || null
		},
		cleanCredentials: (_, action: CredentialsSlice.ReducerActions.CleanCredentials) => {
			removeCookie(Cookie.Credentials)

			api.defaults.headers.Authorization = ""

			setTimeout(() => {
				toast.message("You have been disconnected.", {
					description: action.payload.toastDescription,
				})
			}, 200)

			return null
		},
	},
})
