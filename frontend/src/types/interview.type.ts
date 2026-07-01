import type { TypeGrade, TypeInterviewStatus } from '@/types/enums.type'
import type { IMessage } from '@/types/message.type'

export interface IInterview {
	id: string
	userId: string
	grade: TypeGrade
	topic: string
	status: TypeInterviewStatus
	score?: number
	feedback?: string

	messages?: IMessage[]

	createdAt: Date
	updatedAt: Date
}
