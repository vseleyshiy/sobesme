import { z } from 'zod'

import { DIFFICULTY, GRADE } from '@/types/enums.type'

export const interviewStartSchema = z.object({
	grade: z.enum(GRADE, 'выберите один из предложенных грейдов!'),
	difficulty: z.enum(DIFFICULTY, 'выберите одну из предложенных сложностей!'),
	topic: z.string().min(2, 'тема должна быть размером как минимум в 2 символа'),
})

export type TypeInterviewStartSchema = z.infer<typeof interviewStartSchema>
