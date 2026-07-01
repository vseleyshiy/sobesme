export interface ISocketMessage {
	role: string
	text: string
}

export interface IAiResponse {
	text: string
	audioBuffer: ArrayBuffer
}
