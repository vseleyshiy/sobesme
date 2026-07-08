import type { IInterviewFeedback } from '@/types/interview.type'

export interface IFinalFeedbackProps {
	feedback: IInterviewFeedback
	handleCopy: (text: string) => void
}
