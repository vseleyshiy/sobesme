import type { Dispatch, RefObject, SetStateAction } from 'react'

export interface IRoomLeaveModalProps {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	ref: RefObject<HTMLFormElement>
}
