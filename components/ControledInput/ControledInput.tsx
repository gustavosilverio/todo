"use client"

import { useId } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ControledInputProps } from "./ControledInput.types"
import { Controller, FieldValues } from "react-hook-form"
import { ConditionalTransition } from "../ConditionalTransition"

export const ControledInput = <TFieldValues extends FieldValues>({
	label,
	control,
	name,
	...props
}: ControledInputProps<TFieldValues>) => {
	const id = useId()

	return (
		<div className="flex flex-col gap-2 w-full">
			<Label htmlFor={id}>{label}</Label>

			<Controller
				control={control}
				name={name}
				render={({ field, fieldState: { error } }) => (
					<div className="flex flex-col gap-1">
						<Input
							id={id}
							{...props}
							{...field}
						/>

						<ConditionalTransition condition={!!error?.message}>
							<p className="text-sm text-red-500">{error?.message}</p>
						</ConditionalTransition>
					</div>
				)}
			/>
		</div>
	)
}
