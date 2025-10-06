"use client"

import { queryClient } from "@/lib/config/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "sonner"

export const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster position="top-right" />

			{children}

			{process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
		</QueryClientProvider>
	)
}
