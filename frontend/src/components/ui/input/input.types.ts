import type {
	CSSProperties,
	Dispatch,
	InputHTMLAttributes,
	SetStateAction,
} from 'react'

export interface IInputProps {
	title?: string
	args?: InputHTMLAttributes<HTMLInputElement>
	style?: CSSProperties
	isPassword?: 'first' | 'second'
	isHidePassword?: boolean
	setIsHidePassword?: Dispatch<SetStateAction<boolean>>
}
