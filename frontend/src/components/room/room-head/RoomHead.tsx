import { useAtomValue } from 'jotai'

import type { IRoomHeadProps } from '@/components/room/room-head/room-head.type'
import { RoomHp } from '@/components/room/room-head/room-hp/RoomHp'
import { currentHpAtom, isAnimationAppearancedAtom } from '@/stores/room.store'

import styles from './RoomHead.module.scss'

export function RoomHead(props: IRoomHeadProps) {
	const { topic } = props

	const currentHp = useAtomValue(currentHpAtom)
	const isAnimationAppearanced = useAtomValue(isAnimationAppearancedAtom)

	return (
		<div className={styles.head}>
			<div className={styles.title}>
				{topic.slice(0, 40) + (topic.length > 40 ? '...' : '')}
			</div>
			<RoomHp
				currentHp={currentHp}
				isAnimationAppearanced={isAnimationAppearanced}
			/>
		</div>
	)
}
