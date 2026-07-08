import type {
	TypeDifficulty,
	TypeGrade,
	TypeInterviewStatus,
} from '@/types/enums.type'
import type { IMessage } from '@/types/message.type'

export interface IInterview {
	id: string
	userId: string
	grade: TypeGrade
	topic: string
	status: TypeInterviewStatus
	difficulty: TypeDifficulty
	hp: number
	feedback?: IInterviewFeedback

	messages?: IMessage[]

	createdAt: Date
	updatedAt: Date
}

export interface IInterviewFeedback {
	score: number
	stressScore: number
	text: string
	details: IInterviewFeedbackDetail[]
}

interface IInterviewFeedbackDetail {
	topic: string
	userAnswer: string
	correction: string
	searchQuery: string
}

export interface IInterviewFinish {
	interviewId: string
	feedback?: IInterviewFeedback
}
