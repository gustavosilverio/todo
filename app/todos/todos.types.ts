export type TodoProps = {
	id: number
	name: string
	description: string | undefined
	isDone: boolean
}

export type ActionButtonProps = {
	icon: React.ReactNode
	onClick: () => void
	loading?: boolean
}
