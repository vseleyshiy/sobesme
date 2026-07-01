import type { Resolver } from 'react-hook-form'

import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { IAuthError } from '../../../types/auth.type'
import type { IAuthField } from '../auth.types'

export interface IAuthWrapperProps<T, R> {
	header: 'Регистрация' | 'Вход'
	fields: IAuthField<T>[]
	resolver: Resolver<T, T, T>
	mutate: UseMutateFunction<R, AxiosError<IAuthError>, T>
	isPending: boolean
	isLogin?: boolean
}
