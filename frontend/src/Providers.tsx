import type { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router'

export function Providers({ children }: PropsWithChildren) {
	return <BrowserRouter>{children}</BrowserRouter>
}
