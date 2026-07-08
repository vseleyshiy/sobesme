import { AnimatePresence, motion } from 'motion/react'

import type { IRoomHpProps } from '@/components/room/room-head/room-hp/room-hp.type'
import { getHpColor } from '@/utils/colors.util'

import styles from './RoomHp.module.scss'

export function RoomHp(props: IRoomHpProps) {
	const { isComponent = false, isAnimationAppearanced, currentHp } = props

	return (
		<AnimatePresence>
			{(isAnimationAppearanced || isComponent) && (
				<motion.div
					initial={{
						opacity: 0,
					}}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						ease: 'easeInOut',
						duration: 3,
					}}
					className={styles.hp}
				>
					<motion.div
						initial={{
							width: 0,
						}}
						animate={{
							width: `${currentHp}%`,
						}}
						transition={{
							ease: 'easeInOut',
							duration: 3,
						}}
						style={{
							width: `${currentHp}%`,
							borderTopRightRadius: currentHp < 100 ? '10px' : 0,
							borderBottomRightRadius: currentHp < 100 ? '10px' : 0,
						}}
						className={styles.progress}
					>
						<span style={{ color: getHpColor(currentHp) }}>{currentHp}</span>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
