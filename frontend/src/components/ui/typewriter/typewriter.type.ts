import type { RefObject } from 'react'

import type { ClassValue } from 'clsx'

export interface ITypewriterProps {
	text: string
	speed?: number
	onComplete?: () => void
	classNames?: ClassValue
	ref?: RefObject<HTMLDivElement>
}
