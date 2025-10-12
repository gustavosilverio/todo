import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const Centralized = ({ children }: React.PropsWithChildren) => {
	const pathname = usePathname()

	return (
		<div
			className={cn("flex justify-center w-dvw h-dvh overflow-y-auto py-16 px-4", {
				"h-[calc(100dvh-100px)]": pathname === "/todos",
			})}
		>
			{children}
		</div>
	)
}
