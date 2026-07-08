import { useAtomValue } from 'jotai'
import { AnimatePresence, motion } from 'motion/react'

import { ThinkingLoader } from '@/components/ui/loader'
import { Typewriter } from '@/components/ui/typewriter'
import {
	aiTextResponseAtom,
	isAnimationAppearancedAtom,
	seniorAvatarAtom,
} from '@/stores/room.store'

import styles from './RoomAi.module.scss'

export function RoomAi() {
	const isAnimationAppearanced = useAtomValue(isAnimationAppearancedAtom)
	const seniorAvatar = useAtomValue(seniorAvatarAtom)
	const aiTextResponse = useAtomValue(aiTextResponseAtom)

	return (
		<AnimatePresence>
			{isAnimationAppearanced && (
				<motion.div
					initial={{ opacity: 0, width: '0' }}
					animate={{ opacity: 1, width: '70%' }}
					exit={{ opacity: 0, width: '0' }}
					transition={{
						ease: 'easeInOut',
						duration: 0.7,
					}}
					className={styles.response}
				>
					<div className={styles.header}>
						<div className={styles.avatar}>
							<img src={seniorAvatar} alt='senior avatar' />
						</div>
						<div className={styles.username}>СЕНЬОР</div>
					</div>
					{aiTextResponse === 'initial' || !aiTextResponse ? (
						<ThinkingLoader />
					) : (
						<Typewriter
							classNames={[styles.message]}
							key={aiTextResponse}
							text={aiTextResponse}
							speed={40}
						/>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
