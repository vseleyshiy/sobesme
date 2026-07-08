import cn from 'clsx'

import styles from './Tooltip.module.scss'
import type { ITooltipProps } from './tooltip.types'

export const Tooltip = (props: ITooltipProps) => {
	const { children, text, placement = 'top', offset = 8, className } = props

	return (
		<div
			className={cn(styles.container, className)}
			style={{ '--offset': `${offset}px` } as React.CSSProperties}
		>
			{children}
			<div className={cn(styles.tooltip, styles[placement])}>{text}</div>
		</div>
	)
}
