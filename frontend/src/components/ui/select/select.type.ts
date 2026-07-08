import type { CSSProperties } from 'react'

export interface ISelectProps<T> {
	title: string
	error?: string
	options: ISelectOption<T>[]
	pickFn: (value: T) => void
	style?: CSSProperties
}

export interface ISelectOption<T> {
	text: T
	info?: string
}
