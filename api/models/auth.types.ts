import { CommonResponse } from "./index.types"

// Mutations
export namespace Login {
	export type Request = {
		email: string
		password: string
	}
	export type Response = CommonResponse<{
		userCredentials: UserCredentials
		token: string
		refreshToken: string
	}>
}

// Types
export type UserCredentials = {
	id: number
	name: string
	email: string
}
