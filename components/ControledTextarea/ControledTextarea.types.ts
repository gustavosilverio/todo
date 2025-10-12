import { Control, FieldValues, Path } from "react-hook-form"

export type ControledTextareaProps<TFieldValues extends FieldValues> = Omit<
	React.ComponentProps<"textarea">,
	"name"
> & {
	label?: string
	control: Control<TFieldValues>
	name: Path<TFieldValues>
}
