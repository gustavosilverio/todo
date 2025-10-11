"use client"

import { queryClient } from "@/lib/config/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "sonner"
import { Provider as ReduxProvider } from "react-redux"
import { todoStore } from "@/lib/redux"

export const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<ReduxProvider store={todoStore}>
			<QueryClientProvider client={queryClient}>
				<Toaster position="top-right" />

				{children}

				{process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
			</QueryClientProvider>
		</ReduxProvider>
	)
}
