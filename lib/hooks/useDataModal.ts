import { useCallback, useState } from "react"

export const useDataModal = <T extends Record<string, U>, U>(initialModais: T) => {
	const [dataModais, setModais] = useState<{ [K in keyof T]: { open: boolean; data: T[K] } }>(
		Object.keys(initialModais).reduce(
			(acc, key) => ({
				...acc,
				[key]: {
					open: false,
					data: initialModais[key as keyof T],
				},
			}),
			{} as { [K in keyof T]: { open: boolean; data: T[K] } }
		)
	)

	const toggleDataModal = useCallback(
		<M extends keyof T>(modal: M, params?: { open: boolean; data?: T[M] }) => {
			setModais((prev) => ({
				...prev,
				[modal]: {
					open: params?.open ?? !prev[modal].open,
					data: params?.open === false ? initialModais[modal] : (params?.data ?? prev[modal].data),
				},
			}))
		},
		[initialModais]
	)

	return {
		dataModais,
		toggleDataModal,
	}
}
