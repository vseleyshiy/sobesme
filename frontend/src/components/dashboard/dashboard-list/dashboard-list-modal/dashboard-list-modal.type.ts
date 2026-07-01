import type { Dispatch, RefObject, SetStateAction } from 'react'

import type { IInterview } from '@/types/interview.type'

export interface IDashboardListModal {
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
	ref: RefObject<HTMLFormElement>
	interview: IInterview | null
}
