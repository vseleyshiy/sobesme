import type { IDashboardListModal } from '@/components/dashboard/dashboard-list/dashboard-list-modal/dashboard-list-modal.type'
import { Modal } from '@/components/modal/Modal'
import styles from '@/components/modal/Modal.module.scss'
import { Button } from '@/components/ui/button'

export function DashboardListModal(props: IDashboardListModal) {
	const { interview, ref, isShow, setIsShow } = props

	return (
		interview && (
			<Modal ref={ref} isShow={isShow}>
				<div className={styles.info}>
					<div className={styles.header}>
						<div className={styles.title}>
							{interview.topic}
							<div className={styles.subtitle}>{interview.grade}</div>
						</div>
						<div className={styles.description}>{interview.feedback}</div>
					</div>
					<div className={styles.details}>
						<div className={styles.date}>
							<span>начало:</span>
							{new Date(interview.createdAt).toLocaleString('ru-RU')}
						</div>
						<div className={styles.date}>
							<span>конец:</span>
							{new Date(interview.updatedAt).toLocaleString('ru-RU')}
						</div>
					</div>
					{/* TODO детальный просмотр всех сообщений от пользователя и от ИИ */}
				</div>
				<div className={styles.buttons}>
					<Button
						args={{
							onClick: () => setIsShow(false),
						}}
					>
						закрыть
					</Button>
				</div>
			</Modal>
		)
	)
}
