import type { Path } from 'react-hook-form'

export interface IAuthField<T> {
	name: Path<T>
	title: string
	placeholder: string
	isPassword?: boolean
}
