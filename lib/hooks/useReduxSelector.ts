import { useSelector } from "react-redux"
import { todoStore } from "../redux"

export type RootState = ReturnType<typeof todoStore.getState>

export const useReduxSelector = <T extends keyof RootState>(slice: T) => {
	return useSelector((state: RootState) => state[slice])
}
