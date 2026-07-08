import type { IInterview } from '@/types/interview.type'

export interface IFinalContentProps {
	interview: IInterview
	handleCopy: (text: string) => void
}
