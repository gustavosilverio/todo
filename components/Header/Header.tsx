"use client"

import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { disconnectUser } from "@/lib/utils/auth"
import { useReduxSelector } from "@/lib/hooks/useReduxSelector"

export const Header = () => {
	const userCredentials = useReduxSelector("credentials")

	const pathname = usePathname()

	if (pathname !== "/todos") return

	return (
		<header className="flex w-dvw px-36 py-8 justify-end">
			<Button
				onClick={() => {
					disconnectUser("Your session has expired. Please, log in again.", userCredentials?.id)
				}}
			>
				<LogOut />
			</Button>
		</header>
	)
}
