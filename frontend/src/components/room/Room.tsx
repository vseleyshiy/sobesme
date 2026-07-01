import { useCallback, useState } from 'react'

import cn from 'clsx'
import { useAtomValue } from 'jotai'
import { Mic, MicOff, Phone } from 'lucide-react'

import { useGetInterview } from '@/components/room/hooks/useGetInterview'
import { RoomLeaveModal } from '@/components/room/room-leave-modal/RoomLeaveModal'
import { Button } from '@/components/ui/button'
import { GlobalLoader } from '@/components/ui/loader'
import { useOutside } from '@/hooks/useOutside'
import { aiTextResponseAtom } from '@/stores/room.store'

import styles from './Room.module.scss'

export function Room() {
	// const { isRecording, startRecording, stopRecording } = useMediaAudio()

	const { interview, isLoading } = useGetInterview()

	const aiTextResponse = useAtomValue(aiTextResponseAtom)

	const [isRecording, setIsRecording] = useState(false)

	const { isShow, setIsShow, ref } = useOutside<HTMLFormElement>(false)

	const onMicro = useCallback(() => {
		setIsRecording(prev => !prev)
	}, [])

	const leaveCall = useCallback(() => {
		setIsShow(true)
	}, [setIsShow])

	return isLoading ? (
		<GlobalLoader />
	) : (
		<>
			<RoomLeaveModal isShow={isShow} setIsShow={setIsShow} ref={ref} />
			<div className={styles.room}>
				<div className={styles.title}>
					{interview.topic.slice(0, 40) +
						(interview.topic.length > 40 && '...')}
				</div>
				{aiTextResponse ? (
					<div className={styles.response}>{aiTextResponse}</div>
				) : (
					<div className={styles.main}>
						<div
							className={cn(styles.avatar, {
								[styles.active]: isRecording,
							})}
						>
							<img src='/onizuka/womanizer.jpeg' alt='avatar' />
						</div>
						<div className={styles.status}>
							{isRecording ? 'говорите' : 'вас не слышно'}
						</div>
					</div>
				)}
				<div className={styles.tools}>
					<Button
						style={{
							backgroundColor: isRecording && 'var(--accent-blue-normal)',
						}}
						classNames={[styles.button]}
						args={{
							onClick: onMicro,
							// 	onTouchStart: startRecording,
							// onTouchEnd: stopRecording,
						}}
					>
						{isRecording ? <Mic /> : <MicOff />}
					</Button>
					<Button
						classNames={[styles.button]}
						args={{
							onClick: leaveCall,
						}}
						style={{
							backgroundColor: 'var(--accent-red)',
							color: 'var(--bg-main)',
						}}
					>
						<Phone />
					</Button>
				</div>
			</div>
		</>
	)
}
