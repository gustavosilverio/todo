export type TodoProps = {
	id: number
	name: string
	description: string
	isDone: boolean
}

export type ActionButtonProps = {
	icon: React.ReactNode
	onClick: () => void
	loading?: boolean
}
