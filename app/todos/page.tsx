"use client"

import { useReduxSelector } from "@/lib/hooks/useReduxSelector"

export default function Todos() {
	const userCredentials = useReduxSelector("credentials")

	return <h1>Hello, {userCredentials?.name || "John Doe"}!</h1>
}
