import { Control, FieldValues, Path } from "react-hook-form"

export type ControledInputProps<TFieldValues extends FieldValues> = Omit<React.ComponentProps<"input">, "name"> & {
	label?: string
	control: Control<TFieldValues>
	name: Path<TFieldValues>
	endAdornment?: React.ReactNode
	startAdornment?: React.ReactNode
}
