import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import cn from 'clsx'
import { Star } from 'lucide-react'

import type { IInterviewProps } from '@/components/dashboard/interview/interview.type'
import { Button } from '@/components/ui/button'
import { PAGES_CONFIG } from '@/configs/pages-url.config'
import { getScoreColor } from '@/utils/colors.util'

import styles from './Interview.module.scss'

export function Interview(props: IInterviewProps) {
	const { interview, onClick } = props

	const navigate = useNavigate()

	const joinCall = useCallback(
		(interviewId: string) => {
			navigate(PAGES_CONFIG.ROOM + '/' + interviewId)
		},
		[navigate],
	)

	return (
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
				<div className={styles.grade}>
					{interview.grade} ({interview.difficulty})
				</div>
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
						color: getScoreColor(interview.feedback?.score),
					}}
				>
					{interview.feedback?.score && (
						<Star
							style={{
								fill: getScoreColor(interview.feedback.score),
							}}
						/>
					)}
					{interview.feedback?.score}
				</div>
				<div
					className={cn(styles.status, {
						[styles.progress]: interview.status === 'IN_PROGRESS',
						[styles.completed]: interview.status === 'COMPLETED',
					})}
				/>
			</div>
		</li>
	)
}
