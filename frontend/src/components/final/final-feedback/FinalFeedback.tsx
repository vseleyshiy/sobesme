import cn from 'clsx'

import type { IFinalFeedbackProps } from '@/components/final/final-feedback/final-feedback.type'

import styles from '../Final.module.scss'

export function FinalFeedback(props: IFinalFeedbackProps) {
	const { feedback, handleCopy } = props

	return (
		<div className={styles.section}>
			<div className={styles.title}>фидбек от сеньора</div>
			<div className={styles.description}>{feedback.text}</div>
			<div className={styles.list}>
				{feedback.details.map(detail => (
					<div key={detail.topic} className={styles.item}>
						<div className={styles.topic}>ВОПРОС НА ТЕМУ: "{detail.topic}"</div>
						<div className={styles.info}>
							<span className={styles.infoStart}>вы сказали:</span>
							<span className={styles.infoEnd}>{detail.userAnswer}</span>
						</div>
						<div className={styles.info}>
							<span className={styles.infoStart}>поправка от сеньора:</span>
							<span className={styles.infoEnd}>{detail.correction}</span>
						</div>
						<div className={styles.info}>
							<span className={styles.infoStart}>
								запрос в браузер для самостоятельного изучения:
							</span>
							<span
								className={cn(styles.infoEnd, styles.copy)}
								onClick={() => handleCopy(detail.searchQuery)}
							>
								{detail.searchQuery}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
