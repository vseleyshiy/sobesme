import cn from 'clsx'

import styles from './Button.module.scss'
import type { IButtonProps } from './button.types'

export function Button(props: IButtonProps) {
	const { children, style, args, classNames } = props

	return (
		<button
			{...args}
			style={style}
			className={cn(styles.button, classNames, {
				[styles.disabled]: args?.disabled,
			})}
		>
			{children}
		</button>
	)
}
