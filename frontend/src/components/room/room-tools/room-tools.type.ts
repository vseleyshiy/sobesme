import type { Dispatch, SetStateAction } from 'react'

export interface IRoomToolsProps {
	isRecording: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	onMicro: () => void
}
