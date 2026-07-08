import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

import type { TypeInterviewStartSchema } from '@/components/dashboard/dashboard-modal/schemas/interview-start.schema'

export interface IDashboardModalFieldsProps {
	register: UseFormRegister<TypeInterviewStartSchema>
	control: Control<TypeInterviewStartSchema>
	errors: FieldErrors<TypeInterviewStartSchema>
}
