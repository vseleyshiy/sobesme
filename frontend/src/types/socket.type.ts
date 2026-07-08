import type { TypeEmotions, TypeInterviewStatus } from '@/types/enums.type'

export interface ISocketMessage {
	role: string
	text: string
}

export interface IAiResponse {
	text: string
	emotion?: TypeEmotions
	impact?: number
	status: TypeInterviewStatus
	audioBuffer?: ArrayBuffer
}
