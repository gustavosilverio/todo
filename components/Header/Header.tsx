"use client"

import { usePathname } from "next/navigation"

export const Header = () => {
	const pathname = usePathname()

	if (pathname !== "/todo") return

	return (
		<header className="flex w-dvw px-36 py-8 justify-end">
			<h1>Hello, Header!</h1>
		</header>
	)
}
