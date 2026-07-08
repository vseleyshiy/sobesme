import type { IInterview } from '@/types/interview.type'

export interface IInterviewProps {
	interview: IInterview
	onClick: (interview: IInterview) => void
}
