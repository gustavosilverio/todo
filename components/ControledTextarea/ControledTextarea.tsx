"use client"

import { useId } from "react"
import { Label } from "../ui/label"
import { Controller, FieldValues } from "react-hook-form"
import { ConditionalTransition } from "../ConditionalTransition"
import { ControledTextareaProps } from "./ControledTextarea.types"
import { Textarea } from "../ui/textarea"

export const ControledTextarea = <TFieldValues extends FieldValues>({
	label,
	control,
	name,
	...props
}: ControledTextareaProps<TFieldValues>) => {
	const id = useId()

	return (
		<div className="flex flex-col gap-2 w-full">
			<Label htmlFor={id}>{label}</Label>

			<Controller
				control={control}
				name={name}
				render={({ field, fieldState: { error } }) => (
					<div className="flex flex-col gap-1">
						<Textarea
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
