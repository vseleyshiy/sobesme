import type { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router'

import { SonnerProvider } from './SonnerProvider'
import { TanstackQueryProvider } from './TanstackQueryProvider'

export function MainProvider(props: PropsWithChildren) {
	const { children } = props

	return (
		<BrowserRouter>
			<TanstackQueryProvider>
				<SonnerProvider />
				{children}
			</TanstackQueryProvider>
		</BrowserRouter>
	)
}
