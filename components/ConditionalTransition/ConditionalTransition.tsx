import { AnimatePresence, motion } from "motion/react"
import { ConditionalTransitionProps } from "./ConditionalTransition.types"

/**
 * Allows conditionally rendered elements to have a smoother transition animation.
 * Avoids shift layout, making the user experience more fluid.
 */
export const ConditionalTransition = ({
	children,
	condition,
	haveBlur,
	mode = "vertical",
}: ConditionalTransitionProps) => {
	return (
		<AnimatePresence>
			{condition && (
				<motion.div
					layout
					initial={{
						opacity: 0,
						...(mode !== "center" && (mode === "vertical" ? { height: 0 } : { width: 0 })),
						...(haveBlur && { filter: "blur(5px)" }),
					}}
					animate={{
						opacity: 1,
						...(mode !== "center" && (mode === "vertical" ? { height: "auto" } : { width: "auto" })),
						...(haveBlur && { filter: "blur(0px)" }),
					}}
					exit={{
						opacity: 0,
						...(mode !== "center" && (mode === "vertical" ? { height: 0 } : { width: 0 })),
						...(haveBlur && { filter: "blur(5px)" }),
					}}
					transition={{ duration: 0.2, visualDuration: 0.8 }}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
