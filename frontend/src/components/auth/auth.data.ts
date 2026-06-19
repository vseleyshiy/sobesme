import type { IAuthField } from './auth.types'

export const REGISTER_FIELDS: IAuthField[] = [
	{
		title: 'введите ваш email',
		placeholder: 'support@sobesme.ru',
	},
	{
		title: 'придумайте пароль',
		placeholder: '**********',
		isPassword: 'first',
	},
	{
		title: 'повторите пароль',
		placeholder: '**********',
		isPassword: 'second',
	},
]

export const LOGIN_FIELDS: IAuthField[] = [
	{
		title: 'введите ваш email',
		placeholder: 'support@sobesme.ru',
	},
	{
		title: 'введите ваш пароль',
		placeholder: '**********',
		isPassword: 'first',
	},
]
