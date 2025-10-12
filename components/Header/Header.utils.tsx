import { Themes } from "@/lib/utils/index.types"
import { Bolt, Moon, Sun } from "lucide-react"

export const ICON_BY_THEME: Record<Themes, React.ReactNode> = {
	[Themes.Dark]: <Moon />,
	[Themes.Light]: <Sun />,
	[Themes.System]: <Bolt />,
}

export const THEME_CICLE: Record<string, Themes> = {
	[Themes.Dark]: Themes.Light,
	[Themes.Light]: Themes.System,
	[Themes.System]: Themes.Dark,
}
