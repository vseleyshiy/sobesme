import type { CSSProperties, PropsWithChildren, RefObject } from 'react'
import type { SubmitHandler } from 'react-hook-form'

export interface IModalProps<T = unknown> extends PropsWithChildren {
	cardStyles?: CSSProperties
	ref: RefObject<HTMLFormElement>
	isShow: boolean
	onSubmit?: SubmitHandler<T>
}
