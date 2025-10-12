"use client"

import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLogin } from "./login.hook"
import { ControledInput } from "@/components/ControledInput"

export default function Home() {
	const { control, onSubmit, loginUserIsPending } = useLogin()

	return (
		<Container.Centralized>
			<div className="flex flex-col gap-6 w-full max-w-[340px]">
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
						placeholder="john@doe.com"
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
						Login
					</Button>
					<p className="text-sm">
						Don&apos;t have an account?{" "}
						<Link
							className="underline"
							href="register"
						>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Container.Centralized>
	)
}
