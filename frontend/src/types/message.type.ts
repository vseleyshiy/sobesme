import type { TypeMessageRoles } from '@/types/enums.type'

export interface IMessage {
	id: string
	interviewId: string
	role: TypeMessageRoles
	content: string
	createdAt: Date
}
