import { Loader } from "lucide-react"
import { AnimatedLoadingIconProps } from "./AnimatedLoadingIcon.types"

export const AnimatedLoadingIcon = ({ size, color }: AnimatedLoadingIconProps) => {
	return (
		<div className={`w-[${size}px] h-[${size}px] min-w-[${size}px]`}>
			<Loader
				className="animate-spin w-10 h-10"
				color={color}
			/>
		</div>
	)
}
