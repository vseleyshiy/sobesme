import { useNavigate } from 'react-router'

import type { IDashboardListModal } from '@/components/dashboard/dashboard-list/dashboard-list-modal/dashboard-list-modal.type'
import { Modal } from '@/components/modal/Modal'
import styles from '@/components/modal/Modal.module.scss'
import { Button } from '@/components/ui/button'
import { PAGES_CONFIG } from '@/configs/pages-url.config'

export function DashboardListModal(props: IDashboardListModal) {
	const { interview, ref, isShow, setIsShow } = props

	const navigate = useNavigate()

	return (
		interview && (
			<Modal ref={ref} isShow={isShow}>
				<div className={styles.info}>
					<div className={styles.header}>
						<div className={styles.title}>
							{interview.topic}
							<div className={styles.subtitle}>{interview.grade}</div>
						</div>
						<div className={styles.description}>
							{interview.feedback?.text
								? interview.feedback.text
								: 'к сожалению, вы по собсвенной инициативе сами принудительно завершили собеседование, поэтому мне вам нечего сказать...'}
						</div>
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
				</div>
				<div className={styles.buttons}>
					<Button
						args={{
							onClick: e => {
								e.preventDefault()
								setIsShow(false)
							},
						}}
					>
						закрыть
					</Button>
					{interview.feedback ? (
						<Button
							classNames={[styles.mainBtn]}
							args={{
								onClick: e => {
									e.preventDefault()
									navigate(PAGES_CONFIG.FINAL + `/${interview.id}`)
								},
							}}
						>
							Полный результат
						</Button>
					) : null}
				</div>
			</Modal>
		)
	)
}
