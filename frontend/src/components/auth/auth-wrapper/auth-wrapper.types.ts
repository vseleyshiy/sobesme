import type { Resolver } from 'react-hook-form'

import type { IAuthField } from '../auth.types'

export interface IAuthWrapperProps<T> {
	header: 'Регистрация' | 'Вход'
	fields: IAuthField<T>[]
	resolver: Resolver<T, T, T>
}
