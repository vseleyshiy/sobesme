import type { ButtonHTMLAttributes, CSSProperties } from 'react'

import type { ClassValue } from 'clsx'

export interface IButtonProps {
	text: string
	style?: CSSProperties
	classNames?: ClassValue[]
	args?: ButtonHTMLAttributes<HTMLButtonElement>
}
