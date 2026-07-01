import type { IModalProps } from '@/components/modal/modal.type'

import styles from './Modal.module.scss'

export function Modal(props: IModalProps) {
	const { cardStyles, ref, children, isShow, onSubmit } = props

	return (
		isShow && (
			<div className={styles.modal}>
				<form
					style={cardStyles}
					ref={ref}
					className={styles.card}
					onSubmit={onSubmit}
				>
					{children}
				</form>
			</div>
		)
	)
}
