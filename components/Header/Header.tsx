"use client"

import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { LogOut, Moon } from "lucide-react"
import { disconnectUser } from "@/lib/utils/auth"
import { useReduxSelector } from "@/lib/hooks/useReduxSelector"
import { useTheme } from "next-themes"
import { Themes } from "@/lib/utils/index.types"
import { ICON_BY_THEME, THEME_CICLE } from "./Header.utils"

export const Header = () => {
	const userCredentials = useReduxSelector("credentials")

	const pathname = usePathname()

	const { theme, setTheme } = useTheme()

	const handleChangeTheme = () => {
		setTheme(THEME_CICLE[theme as Themes])
	}

	if (pathname !== "/todos") return

	return (
		<header className="flex items-center gap-2 px-12 lg:px-36 py-8 justify-end">
			<Button
				variant="outline"
				onClick={() => {
					disconnectUser("Your session has expired. Please, log in again.", userCredentials?.id)
				}}
			>
				<LogOut />
			</Button>

			<Button
				size="icon"
				variant="ghost"
				onClick={handleChangeTheme}
			>
				{ICON_BY_THEME[theme as Themes] || <Moon />}
			</Button>
		</header>
	)
}
