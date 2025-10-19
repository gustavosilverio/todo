import { Button } from "../ui/button"
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	Dialog as DialogRoot,
	DialogTitle,
} from "../ui/dialog"
import { DialogProps } from "./Dialog.types"

export const Dialog = ({ title, description, onClose, open, buttons, children }: DialogProps) => {
	return (
		<DialogRoot
			open={open}
			onOpenChange={onClose}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
				<DialogFooter>
					{buttons.map(({ content, ...props }, i) => (
						<Button
							key={i}
							{...props}
						>
							{content}
						</Button>
					))}
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	)
}
