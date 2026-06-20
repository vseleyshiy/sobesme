import { type PropsWithChildren } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export function TanstackQueryProvider(props: PropsWithChildren) {
	const { children } = props

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

// продолжай идти по курсу авторизации + самодеятельность в виде ахуенного кода
