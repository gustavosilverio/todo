"use client"

import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { LogOut, Moon, Sun } from "lucide-react"
import { disconnectUser } from "@/lib/utils/auth"
import { useReduxSelector } from "@/lib/hooks/useReduxSelector"
import { Skeleton } from "../ui/skeleton"
import { useTheme } from "next-themes"

export const Header = () => {
	const userCredentials = useReduxSelector("credentials")

	const pathname = usePathname()

	const { theme, setTheme } = useTheme()

	if (pathname !== "/todos") return

	return (
		<header className="flex items-center gap-4 w-dvw px-36 py-8 justify-end">
			{!userCredentials ? <Skeleton className="w-[160px] h-5" /> : <p>{userCredentials.name}</p>}

			<Button
				variant="outline"
				onClick={() => {
					disconnectUser("Your session has expired. Please, log in again.", userCredentials?.id)
				}}
			>
				<LogOut />
			</Button>

			<Button
				variant="ghost"
				onClick={() => {
					setTheme(theme === "dark" ? "light" : "dark")
				}}
			>
				{theme === "dark" ? <Sun /> : <Moon />}
			</Button>
		</header>
	)
}
