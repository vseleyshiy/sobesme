import type {
	CSSProperties,
	InputHTMLAttributes,
	PropsWithChildren,
} from 'react'
import type { Path, UseFormRegister } from 'react-hook-form'

import type { ClassValue } from 'clsx'

export interface IInputProps<T> extends PropsWithChildren {
	title: string
	name?: Path<T>
	register?: UseFormRegister<T>
	error?: string | undefined
	args?: InputHTMLAttributes<HTMLInputElement>
	style?: CSSProperties
	classNames?: ClassValue[]
}
