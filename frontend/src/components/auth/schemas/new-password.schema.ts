import { z } from 'zod'

export const newPasswordSchema = z.object({
	password: z.string().min(6, 'Пароль должен содержать 6 минимум символов'),
})

export type TypeNewPasswordSchema = z.infer<typeof newPasswordSchema>
