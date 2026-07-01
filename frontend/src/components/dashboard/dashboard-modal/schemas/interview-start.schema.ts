import { z } from 'zod'

import { DASHBOARD_MODAL_GRADES } from '@/components/dashboard/dashboard-modal/dashboard-modal.data'

export const interviewStartSchema = z.object({
	grade: z.enum(
		DASHBOARD_MODAL_GRADES,
		'выберите один из предложенных грейдов!',
	),
	topic: z.string().min(2, 'тема должна быть размером как минимум в 2 символа'),
})

export type TypeInterviewStartSchema = z.infer<typeof interviewStartSchema>
