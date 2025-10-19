import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "../ui/button"

export type DialogProps = {
	open: boolean
	onClose: (open: boolean) => void
	title: string
	description?: string
	buttons: FooterButton[]
	children: React.ReactNode
}

type FooterButton = {
	onClick: () => void
	content: React.ReactNode
	loading?: boolean
	disabled?: boolean
} & VariantProps<typeof buttonVariants>
