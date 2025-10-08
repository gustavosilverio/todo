"use client"

import { Container } from "@/components/Container"
import { ControledInput } from "@/components/ControledInput/ControledInput"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRegister } from "./register.hook"

export default function Register() {
	const { control, onSubmit, createUserIsPending } = useRegister()

	return (
		<Container.Centralized>
			<div className="flex flex-col gap-6 w-full max-w-[340px]">
				<div className="flex flex-col gap-2">
					<h1 className="font-bold text-3xl">Sign up 🔑</h1>
					<p>Just create your account.</p>
				</div>
				<form
					className="flex flex-col gap-4"
					onSubmit={onSubmit}
				>
					<ControledInput
						control={control}
						name="name"
						label="Name"
						placeholder="John Doe"
					/>

					<ControledInput
						control={control}
						name="email"
						label="Email"
						placeholder="user@email.com"
					/>

					<ControledInput
						control={control}
						name="password"
						label="Password"
						placeholder="123456"
					/>

					<ControledInput
						control={control}
						name="confirmPassword"
						label="Confirm password"
						placeholder="123456"
					/>

					<Button
						type="submit"
						loading={createUserIsPending}
					>
						Create
					</Button>
					<p className="text-sm">
						Already have an account?{" "}
						<Link
							className="underline"
							href="/"
						>
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</Container.Centralized>
	)
}
