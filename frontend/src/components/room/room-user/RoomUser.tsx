import cn from 'clsx'
import { useAtomValue } from 'jotai'
import { motion } from 'motion/react'

import type { IRoomUserProps } from '@/components/room/room-user/room-user.type'
import { isAnimationAppearancedAtom } from '@/stores/room.store'

import styles from './RoomUser.module.scss'

export function RoomUser(props: IRoomUserProps) {
	const { isRecording } = props

	const isAnimationAppearanced = useAtomValue(isAnimationAppearancedAtom)

	return (
		<motion.div
			animate={{
				width: isAnimationAppearanced ? '30%' : '100%',
			}}
			exit={{
				scale: 1,
				width: '100%',
			}}
			transition={{
				ease: 'easeInOut',
			}}
			className={styles.user}
		>
			<div
				className={cn(styles.avatar, {
					[styles.active]: isRecording,
				})}
			>
				<img src='/onizuka/laugh.png' alt='avatar' />
			</div>
			<div className={styles.status}>
				{isRecording ? 'говорите' : 'вас не слышно'}
			</div>
		</motion.div>
	)
}
