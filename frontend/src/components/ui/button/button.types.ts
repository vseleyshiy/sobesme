import type {
	ButtonHTMLAttributes,
	CSSProperties,
	PropsWithChildren,
} from 'react'

import type { ClassValue } from 'clsx'

export interface IButtonProps extends PropsWithChildren {
	style?: CSSProperties
	classNames?: ClassValue[]
	args?: ButtonHTMLAttributes<HTMLButtonElement>
}
