import type { IAuthField } from '../auth.types'

export interface IAuthWrapperProps {
	header: 'Регистрация' | 'Вход'
	fields: IAuthField[]
}
