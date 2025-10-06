import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 10, // 10 minutes,
			retry: 1,
			retryOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
})
