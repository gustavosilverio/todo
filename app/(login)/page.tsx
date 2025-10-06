"use client"

import { Container } from "@/components/Container"
import { ControledInput } from "@/components/ControledInput/ControledInput"
import { useLogin } from "./login.hook"
import { Button } from "@/components/ui/button"

export default function Home() {
	const { control, onSubmit, loginUserIsPending } = useLogin()

	return (
		<Container.Centralized>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h1 className="font-bold text-3xl">Sign in 🔑</h1>
					<p>Just log in the platform.</p>
				</div>
				<form
					className="flex flex-col gap-4"
					onSubmit={onSubmit}
				>
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

					<Button
						type="submit"
						loading={loginUserIsPending}
					>
						submit
					</Button>
				</form>
			</div>
		</Container.Centralized>
	)
}
