import type { ReactElement } from 'react'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface ITooltipProps {
	children: ReactElement
	text: string
	placement?: TooltipPlacement
	offset?: number
	className?: string
}
