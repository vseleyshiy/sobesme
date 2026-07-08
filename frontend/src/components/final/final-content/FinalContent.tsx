import { FinalContentStatistic } from '@/components/final/final-content/final-content-statistic/FinalContentStatistic'
import type { IFinalContentProps } from '@/components/final/final-content/final-content.type'

import styles from './FinalContent.module.scss'

export function FinalContent(props: IFinalContentProps) {
	const { interview, handleCopy } = props

	return (
		<div className={styles.content}>
			<div className={styles.col}>
				<div className={styles.title}>
					{interview.topic}
					<div className={styles.details}>
						<div className={styles.detail}>
							<span>ГРЕЙД:</span> {interview.grade}
						</div>
						<div className={styles.detail}>
							<span>СЛОЖНОСТЬ:</span> {interview.difficulty}
						</div>
						<div className={styles.detail}>
							<span>НАЧАЛОСЬ:</span>

							{new Date(interview.createdAt).toLocaleString('ru-RU')}
						</div>
						<div className={styles.detail}>
							<span>ЗАКОНЧИЛОСЬ:</span>
							{new Date(interview.updatedAt).toLocaleString('ru-RU')}
						</div>
					</div>
				</div>
				<div className={styles.status}>
					{interview.hp <= 0 ? 'вы проиграли' : 'вы хорошо держались'}
				</div>
			</div>
			<FinalContentStatistic
				handleCopy={handleCopy}
				score={interview.feedback.score}
				stressScore={interview.feedback.stressScore}
				hp={interview.hp}
			/>
		</div>
	)
}
