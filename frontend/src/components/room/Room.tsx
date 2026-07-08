import { useEffect } from 'react'

import { useAtomValue, useSetAtom } from 'jotai'

import { useGetInterview } from '@/components/room/hooks/useGetInterview'
import { useMediaAudio } from '@/components/room/hooks/useMediaAudio'
import { RoomAi } from '@/components/room/room-ai/RoomAi'
import { RoomHead } from '@/components/room/room-head/RoomHead'
import { RoomLeaveModal } from '@/components/room/room-leave-modal/RoomLeaveModal'
import { RoomNotice } from '@/components/room/room-notice/RoomNotice'
import { RoomTools } from '@/components/room/room-tools/RoomTools'
import { RoomUser } from '@/components/room/room-user/RoomUser'
import { GlobalLoader } from '@/components/ui/loader'
import { useOutside } from '@/hooks/useOutside'
import { currentHpAtom, isAnimationAppearancedAtom } from '@/stores/room.store'

import styles from './Room.module.scss'

export function Room() {
	const isAnimationAppearanced = useAtomValue(isAnimationAppearancedAtom)

	const setCurrentHp = useSetAtom(currentHpAtom)

	const { isRecording, onMicro } = useMediaAudio()

	const { interview, isLoading } = useGetInterview()

	useEffect(() => {
		if (isLoading || !interview) return

		setCurrentHp(interview.hp)
	}, [isLoading, interview, setCurrentHp])

	const { isShow, setIsShow, ref } = useOutside<HTMLFormElement>(false)

	return isLoading ? (
		<GlobalLoader />
	) : (
		<>
			<RoomLeaveModal isShow={isShow} setIsShow={setIsShow} ref={ref} />
			<RoomNotice />
			<div className={styles.room}>
				<RoomHead topic={interview.topic} />
				<div
					className={styles.main}
					style={{
						justifyContent: isAnimationAppearanced ? 'space-between' : 'center',
					}}
				>
					<RoomAi />
					<RoomUser isRecording={isRecording} />
				</div>
				<RoomTools
					setIsShow={setIsShow}
					isRecording={isRecording}
					onMicro={onMicro}
				/>
			</div>
		</>
	)
}
