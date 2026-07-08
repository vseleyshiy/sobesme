import { useCallback } from 'react'

import { Mic, MicOff, Phone } from 'lucide-react'

import type { IRoomToolsProps } from '@/components/room/room-tools/room-tools.type'
import { Button } from '@/components/ui/button'

import styles from './RoomTools.module.scss'

export function RoomTools(props: IRoomToolsProps) {
	const { setIsShow, isRecording, onMicro } = props

	const leaveCall = useCallback(() => {
		setIsShow(true)
	}, [setIsShow])

	return (
		<div className={styles.tools}>
			<Button
				style={{
					backgroundColor: isRecording && 'var(--accent-blue-normal)',
				}}
				classNames={[styles.button]}
				args={{
					onClick: onMicro,
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
	)
}
