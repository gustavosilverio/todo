export type ConditionalTransitionProps = {
	condition: boolean
	children: React.ReactNode
	haveBlur?: boolean
	mode?: "vertical" | "horizontal" | "center"
}
