import { configureStore } from "@reduxjs/toolkit"
import { credentialsReducer } from "./credentials"

export const todoStore = configureStore({
	reducer: {
		credentials: credentialsReducer,
	},
})
