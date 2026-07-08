import cn from 'clsx'

import { Message } from '@/components/final/message/Message'
import { useGetInterview } from '@/components/room/hooks/useGetInterview'
import { RoomHp } from '@/components/room/room-head/room-hp/RoomHp'
import { Star } from '@/components/star/Star'
import { Button } from '@/components/ui/button'
import { GlobalLoader } from '@/components/ui/loader'

import styles from './Final.module.scss'

export function Final() {
	const { interview, isLoading } = useGetInterview()

	return isLoading || !interview.feedback ? (
		<GlobalLoader />
	) : (
		<div className={styles.final}>
			<div className='container'>
				<div className={styles.wrap}>
					<div className={styles.status}>
						{interview.hp <= 0 ? 'вы проиграли' : 'вы хорошо держались'}
					</div>
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
						</div>
						<div className={cn(styles.col, styles.statistic)}>
							<div className={styles.title}>итоговые показатели</div>
							<div className={styles.stars}>
								{[0, 1, 2, 3, 4].map(index => {
									const fillPercentage = Math.max(
										0,
										Math.min(1, interview.feedback.score - index),
									)
									return (
										<Star
											key={index}
											fillPercentage={fillPercentage}
											delay={index * 0.15}
										/>
									)
								})}
							</div>
							<div className={styles.hp}>
								<span className={styles.hpTitle}>
									hp, которые у вас остались:
								</span>
								<RoomHp isComponent={true} currentHp={interview.hp} />
							</div>
							<Button classNames={[styles.share]}>
								поделиться с друзьями!!!
							</Button>
						</div>
					</div>
					<div className={styles.line} />
					<div className={styles.section}>
						<div className={styles.title}>фидбек от сеньора</div>
						<div className={styles.list}>{interview.feedback.text}</div>
						{/* сначала просмотри всё, что было сделано. Было сделано так много, что ты запутался. Это отталкивает тебя от работы.  */}
						{/* Делаешь мутацию с завершением собеседования (тестишь на новом собесе, но предварительно в него пушишь messages, чтобы было с чем работать). Потом добавляешь загрузочки там ляляля, прорабатываешь handleLeave из Room, то есть принудительное завершение. Делаешь красивый лендинг для фидбэка (дорабатываешь то, что есть сейчас): для всех details обязательно */}
						{/* потом уже, когда это будет сделано - приступаешь в Recharts как на dashboard, так и на final */}
					</div>
					<div className={styles.section}>
						<div className={styles.title}>итоговый диалог</div>
						<div className={styles.list}>
							{interview.messages.map(message => (
								<Message message={message} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
