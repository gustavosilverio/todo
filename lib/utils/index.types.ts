import { AxiosError } from "axios"

export type TodoError = AxiosError<ErrorResponse>

export type ErrorResponse = {
	success: false
	data: null
	error: string
}

export enum Themes {
	System = "system",
	Dark = "dark",
	Light = "light",
}
