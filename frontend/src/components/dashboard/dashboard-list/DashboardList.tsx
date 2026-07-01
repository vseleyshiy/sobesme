import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import cn from 'clsx'
import { Star } from 'lucide-react'

import { DashboardListModal } from '@/components/dashboard/dashboard-list/dashboard-list-modal/DashboardListModal'
import { useInterviews } from '@/components/dashboard/hooks/useInterviews'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { PAGES_CONFIG } from '@/configs/pages-url.config'
import { useOutside } from '@/hooks/useOutside'
import { socket } from '@/socket'
import type { IInterview } from '@/types/interview.type'
import { getScoreColor } from '@/utils/score-color.util'

import styles from './DashboardList.module.scss'

export function DashboardList() {
	const { interviews, isLoading } = useInterviews()

	const navigate = useNavigate()

	const [interview, setInterview] = useState<IInterview | null>()

	const { ref, isShow, setIsShow } = useOutside<HTMLFormElement>(false)

	const onClick = useCallback(
		(interview: IInterview) => {
			if (interview.status === 'COMPLETED') {
				setInterview(interview)
				setIsShow(true)
			}
		},
		[setIsShow],
	)

	const joinCall = useCallback(
		(interviewId: string) => {
			navigate(PAGES_CONFIG.ROOM + '/' + interviewId)
			socket.connect()
		},
		[navigate],
	)

	return (
		<>
			<DashboardListModal
				ref={ref}
				interview={interview}
				isShow={isShow}
				setIsShow={setIsShow}
			/>
			<div className={styles.content}>
				<h2 className={styles.title}>история ваших собеседований:</h2>
				<ul className={styles.list}>
					{isLoading ? (
						<Loader />
					) : (
						interviews.map(interview => (
							<li
								className={styles.item}
								key={interview.id}
								onClick={() => onClick(interview)}
							>
								<div className={styles.info}>
									<div className={styles.topic}>
										{interview.topic.slice(0, 40) +
											(interview.topic.length > 40 ? '...' : '')}
									</div>
									<div className={styles.grade}>{interview.grade}</div>
								</div>
								<div className={styles.final}>
									{interview.status === 'IN_PROGRESS' && (
										<Button
											style={{
												backgroundColor: 'var(--accent-blue-normal)',
											}}
											args={{
												onClick: () => joinCall(interview.id),
											}}
										>
											присоединиться к звонку
										</Button>
									)}
									<div
										className={styles.score}
										style={{
											color: getScoreColor(interview.score),
										}}
									>
										{interview.score && (
											<Star
												style={{
													fill: getScoreColor(interview.score),
												}}
											/>
										)}
										{interview.score}
									</div>
									<div
										className={cn(styles.status, {
											[styles.progress]: interview.status === 'IN_PROGRESS',
											[styles.completed]: interview.status === 'COMPLETED',
										})}
									/>
								</div>
							</li>
						))
					)}
				</ul>
			</div>
		</>
	)
}
