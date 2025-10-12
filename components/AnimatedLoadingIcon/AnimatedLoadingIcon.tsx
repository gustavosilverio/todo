import { Loader } from "lucide-react"
import { AnimatedLoadingIconProps } from "./AnimatedLoadingIcon.types"

export const AnimatedLoadingIcon = ({ size, color }: AnimatedLoadingIconProps) => {
	return (
		<div style={{ width: size, height: size, minWidth: size }}>
			<Loader
				className="animate-spin"
				style={{ width: "100%", height: "100%" }}
				color={color}
			/>
		</div>
	)
}
