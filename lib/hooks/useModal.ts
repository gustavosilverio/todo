import { useCallback, useState } from "react"

export const useModal = <T extends Record<string, boolean>>(initialModals: T) => {
	const [modais, setModais] = useState(initialModals)

	const toggleModal = useCallback((modal: keyof typeof initialModals, open: boolean) => {
		setModais((prev) => ({
			...prev,
			[modal]: open,
		}))
	}, [])

	return { modais, toggleModal }
}
