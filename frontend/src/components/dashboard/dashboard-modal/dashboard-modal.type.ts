import type { Dispatch, RefObject, SetStateAction } from 'react'

export interface IDashboardModalProps {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	ref: RefObject<HTMLFormElement>
}
