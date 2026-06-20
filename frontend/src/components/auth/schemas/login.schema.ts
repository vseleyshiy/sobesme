import { z } from 'zod'

export const loginSchema = z.object({
	email: z.email('Некорректный email'),
	password: z.string().min(6, 'Пароль должен содержать 6 минимум символов'),
})

export type TypeLoginSchema = z.infer<typeof loginSchema>
