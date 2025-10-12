import { Tooltip as RootTooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { TooltipProps } from "./Tooltip.types"

export const Tooltip = ({ title, children }: TooltipProps) => {
	return (
		<RootTooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent hidden={!title}>
				<p>{title}</p>
			</TooltipContent>
		</RootTooltip>
	)
}
