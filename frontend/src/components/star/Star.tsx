import { StarIcon } from 'lucide-react'
import { motion } from 'motion/react'

import type { IStarProps } from '@/components/star/star.type'

import styles from './Star.module.scss'

export function Star(props: IStarProps) {
	const { fillPercentage, delay = 0 } = props

	return (
		<div className={styles.starWrapper}>
			<StarIcon
				className={styles.lucideIcon}
				stroke='var(--accent-blue-normal)'
				fill='var(--accent-blue-light)'
				strokeWidth={1.5}
			/>
			<motion.div
				className={styles.starFilledContainer}
				initial={{ width: '0%' }}
				animate={{ width: `${fillPercentage * 100}%` }}
				transition={{ duration: 2, delay, ease: 'easeInOut' }}
			>
				<StarIcon
					className={styles.lucideIcon}
					stroke='var(--accent-blue-normal)'
					fill='var(--accent-blue-normal)'
					strokeWidth={1.5}
				/>
			</motion.div>
		</div>
	)
}
