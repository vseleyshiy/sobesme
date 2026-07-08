import type { Dispatch, SetStateAction } from 'react'

export interface IDashboardModalButtonsProps {
	isPending: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}
