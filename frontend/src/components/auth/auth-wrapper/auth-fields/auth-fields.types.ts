import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import type { IAuthField } from '../../auth.types'

export interface IAuthFieldsProps<T> {
	fields: IAuthField<T>[]
	register: UseFormRegister<T>
	errors: FieldErrors<T>
}
