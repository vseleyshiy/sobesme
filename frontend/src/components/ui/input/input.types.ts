import type {
	CSSProperties,
	InputHTMLAttributes,
	PropsWithChildren,
} from 'react'
import type { Path, UseFormRegister } from 'react-hook-form'

export interface IInputProps<T> extends PropsWithChildren {
	title: string
	name?: Path<T>
	register?: UseFormRegister<T>
	error?: string
	args?: InputHTMLAttributes<HTMLInputElement>
	style?: CSSProperties
}
