import { CommonResponse } from "./index.types"

// Mutations
export namespace Login {
	export type Request = {
		email: string
		password: string
	}
	export type Response = CommonResponse<LoginResponse>
}

export namespace RefreshToken {
	export type Request = {
		accessToken: string
		refreshToken: string
	}
	export type Response = CommonResponse<LoginResponse>
}

export namespace RevokeUser {
	export type Request = {
		userId: number | undefined
	}
}

// Types
export type LoginResponse = {
	userCredentials: UserCredentials
	token: string
	refreshToken: string
	refreshTokenExpiryTime: string
}

export type UserCredentials = {
	id: number
	name: string
	email: string
}
