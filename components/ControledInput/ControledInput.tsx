"use client"

import { useId } from "react"
import { Label } from "../ui/label"
import { ControledInputProps } from "./ControledInput.types"
import { Controller, FieldValues } from "react-hook-form"
import { ConditionalTransition } from "../ConditionalTransition"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

export const ControledInput = <TFieldValues extends FieldValues>({
	label,
	control,
	name,
	startAdornment,
	endAdornment,
	...props
}: ControledInputProps<TFieldValues>) => {
	const id = useId()

	return (
		<div className="flex flex-col gap-2 w-full">
			{label && <Label htmlFor={id}>{label}</Label>}

			<Controller
				control={control}
				name={name}
				render={({ field, fieldState: { error } }) => (
					<div className="relative flex flex-col gap-1">
						<InputGroup>
							{startAdornment && <InputGroupAddon align="inline-start">{startAdornment}</InputGroupAddon>}

							<InputGroupInput
								id={id}
								{...props}
								{...field}
							/>

							{endAdornment && <InputGroupAddon align="inline-end">{endAdornment}</InputGroupAddon>}
						</InputGroup>

						<ConditionalTransition condition={!!error?.message}>
							<p className="text-sm text-red-500">{error?.message}</p>
						</ConditionalTransition>
					</div>
				)}
			/>
		</div>
	)
}
