import cn from 'clsx'
import { motion } from 'motion/react'

import type { IFinalContentStatisticProps } from '@/components/final/final-content/final-content-statistic/final-content-statistic.type'
import { RoomHp } from '@/components/room/room-head/room-hp/RoomHp'
import { Star } from '@/components/star/Star'
import { Button } from '@/components/ui/button'
import { getScoreColor } from '@/utils/colors.util'

import styles from '../FinalContent.module.scss'

const nums = Array.from({ length: 5 })

export function FinalContentStatistic(props: IFinalContentStatisticProps) {
	const { handleCopy, score, stressScore, hp } = props

	return (
		<div className={cn(styles.col, styles.statistic)}>
			<div className={styles.title}>итоговые показатели</div>
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				exit={{
					opacity: 0,
				}}
				className={styles.stars}
			>
				{nums.map((_, index) => {
					const fillPercentage = Math.max(0, Math.min(1, score - index))
					return (
						<Star
							key={index}
							fillPercentage={fillPercentage}
							delay={index * 0.75}
						/>
					)
				})}
			</motion.div>
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				exit={{
					opacity: 0,
				}}
				transition={{
					ease: 'easeInOut',
					duration: 3,
				}}
				className={styles.row}
			>
				<span className={styles.rowTitle}>ваш уровень стресса:</span>
				<div className={styles.stress}>
					{nums.map((_, index) => (
						<div
							key={index}
							style={{
								backgroundColor:
									index + 1 <= stressScore
										? getScoreColor(stressScore)
										: 'var(--bg-secondary)',
							}}
						/>
					))}
				</div>
			</motion.div>
			<div className={styles.row}>
				<span className={styles.rowTitle}>hp, которые у вас остались:</span>
				<RoomHp isComponent={true} currentHp={hp} />
			</div>

			<Button
				classNames={[styles.share]}
				args={{
					onClick: () => {
						handleCopy(window.location.href)
					},
				}}
			>
				поделиться с друзьями!!!
			</Button>
		</div>
	)
}
