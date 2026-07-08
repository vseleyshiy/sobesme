import { useFinishInterview } from '@/components/final/hooks/useFinishInterview'
import { Modal } from '@/components/modal/Modal'
import styles from '@/components/modal/Modal.module.scss'
import type { IRoomLeaveModalProps } from '@/components/room/room-leave-modal/room-leave-modal.type'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'

export function RoomLeaveModal(props: IRoomLeaveModalProps) {
	const { isShow, setIsShow, ref } = props

	const { isPending, mutate } = useFinishInterview()

	return (
		<Modal
			cardStyles={{
				height: 200,
			}}
			isShow={isShow}
			ref={ref}
		>
			<div className={styles.info}>
				<div className={styles.header}>
					<div className={styles.title}>
						Вы действительно хотите завершить звонок?
					</div>
					<div className={styles.description}>
						собеседующий вас сеньор вам не перезвонит, и вы потеряете шанс на
						получение работы в этой компании...
					</div>
				</div>
			</div>
			{isPending ? (
				<Loader />
			) : (
				<div className={styles.buttons}>
					<Button
						args={{
							disabled: isPending,
							onClick: e => {
								e.preventDefault()
								setIsShow(false)
							},
						}}
					>
						закрыть
					</Button>
					<Button
						classNames={[styles.mainBtn]}
						args={{
							disabled: isPending,
							onClick: e => {
								e.preventDefault()
								mutate()
							},
						}}
					>
						завершить звонок
					</Button>
				</div>
			)}
		</Modal>
	)
}
