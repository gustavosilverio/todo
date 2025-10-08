export type CommonResponse<T = null> = {
	success: boolean
	data: T
	error: string
}
