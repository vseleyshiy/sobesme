import type { IAuthField } from './auth.types'
import type { TypeLoginSchema } from './schemas/login.schema'
import type { TypeRegisterSchema } from './schemas/register.schema'

export const REGISTER_FIELDS: IAuthField<TypeRegisterSchema>[] = [
	{
		name: 'email',
		title: 'введите ваш email',
		placeholder: 'support@sobesme.ru',
	},
	{
		name: 'password',
		title: 'придумайте пароль',
		placeholder: '******',
		isPassword: true,
	},
	{
		name: 'passwordRepeat',
		title: 'повторите пароль',
		placeholder: '******',
		isPassword: true,
	},
]

export const LOGIN_FIELDS: IAuthField<TypeLoginSchema>[] = [
	{
		name: 'email',
		title: 'введите ваш email',
		placeholder: 'support@sobesme.ru',
	},
	{
		name: 'password',
		title: 'введите ваш пароль',
		placeholder: '**********',
		isPassword: true,
	},
]
