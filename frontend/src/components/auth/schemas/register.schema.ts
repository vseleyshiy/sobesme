import { z } from 'zod'

export const registerSchema = z
	.object({
		email: z.email('Некорректный email'),
		password: z.string().min(6, 'Пароль должен содержать 6 минимум символов'),
		passwordRepeat: z
			.string()
			.min(6, 'Пароль должен содержать 6 минимум символов'),
	})
	.refine(data => data.password === data.passwordRepeat, {
		path: ['passwordRepeat'],
		message: 'Введённые пароли не совпадают',
	})

export type TypeRegisterSchema = z.infer<typeof registerSchema>
