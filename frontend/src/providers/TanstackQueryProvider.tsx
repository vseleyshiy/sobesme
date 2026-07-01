import { type PropsWithChildren } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '../configs/tanstack-query-client.config'

export function TanstackQueryProvider(props: PropsWithChildren) {
	const { children } = props

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
