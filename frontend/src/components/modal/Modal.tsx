import { useEffect } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import type { IModalProps } from '@/components/modal/modal.type'

import styles from './Modal.module.scss'

export function Modal(props: IModalProps) {
	const { cardStyles, ref, children, isShow, onSubmit } = props

	useEffect(() => {
		if (isShow) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}
	}, [isShow])

	return (
		<AnimatePresence>
			{isShow && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={styles.modal}
				>
					<form
						style={cardStyles}
						ref={ref}
						className={styles.card}
						onSubmit={onSubmit}
					>
						{children}
					</form>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
