import { Dialog } from "@/components/Dialog"
import { EditProps } from "./Edit.types"
import { useEdit } from "./Edit.hook"
import { ControledInput } from "@/components/ControledInput"
import { ControledTextarea } from "@/components/ControledTextarea/ControledTextarea"

export const Edit = ({ open, onClose, data }: EditProps) => {
	const { control, handleSubmit, onSubmit, updateTodoIsPending } = useEdit({ open, onClose, data })

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title="Test"
			buttons={[
				{
					content: "Close",
					variant: "secondary",
					disabled: updateTodoIsPending,
					onClick: () => onClose(false),
				},
				{
					content: "Edit",
					loading: updateTodoIsPending,
					onClick: handleSubmit(onSubmit),
				},
			]}
		>
			<form className="flex flex-col gap-2">
				<ControledInput
					control={control}
					name="name"
					placeholder="Buy more milk..."
					maxLength={255}
				/>

				<ControledTextarea
					control={control}
					name="description"
					placeholder="I need to buy some milk for my cat..."
					rows={4}
					className="max-h-32"
					maxLength={500}
				/>
			</form>
		</Dialog>
	)
}
