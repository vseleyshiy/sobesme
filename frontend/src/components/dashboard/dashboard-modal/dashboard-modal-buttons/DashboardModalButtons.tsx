import { useCallback, type MouseEvent } from 'react'

import type { IDashboardModalButtonsProps } from '@/components/dashboard/dashboard-modal/dashboard-modal-buttons/dashboard-modal-buttons.type'
import styles from '@/components/modal/Modal.module.scss'
import { Button } from '@/components/ui/button'

export function DashboardModalButtons(props: IDashboardModalButtonsProps) {
	const { isPending, setIsShow } = props

	const handleClose = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			setIsShow(false)
		},
		[setIsShow],
	)

	return (
		<div className={styles.buttons}>
			<Button
				args={{
					onClick: e => handleClose(e),
					disabled: isPending,
				}}
			>
				закрыть
			</Button>
			<Button
				classNames={[styles.mainBtn]}
				args={{
					disabled: isPending,
				}}
			>
				В БОЙ!
			</Button>
		</div>
	)
}
