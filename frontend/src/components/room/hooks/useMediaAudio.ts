import { useCallback, useEffect, useRef, useState } from 'react'

import { toast } from 'sonner'

import { socket } from '../../../socket'

export function useMediaAudio() {
	const [isRecording, setIsRecording] = useState(false)

	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const streamRef = useRef<MediaStream | null>(null)

	const isPressingRef = useRef(false)

	const startRecording = useCallback(async () => {
		if (isPressingRef.current) return

		isPressingRef.current = true

		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			})

			if (!isPressingRef.current) {
				stream.getTracks().forEach(track => track.stop())
				return
			}

			streamRef.current = stream

			const mediaRecorder = new MediaRecorder(stream)
			mediaRecorderRef.current = mediaRecorder

			mediaRecorder.ondataavailable = e => {
				if (e.data && e.data.size > 0) {
					console.log('RECORD')
					socket.emit('audio_chunk', e.data)
				}
			}

			mediaRecorder.start(1000)
			setIsRecording(true)
		} catch {
			isPressingRef.current = false
			toast.error('Пожалуйста, разрешите доступ к микрофону!')
		}
	}, [])

	const stopRecording = useCallback(() => {
		isPressingRef.current = false

		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== 'inactive'
		) {
			mediaRecorderRef.current.stop()
		}

		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop())
		}

		setIsRecording(false)

		socket.emit('audio_end')
	}, [])

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.code === 'Space') {
				e.preventDefault()
				startRecording()
			}
		},
		[startRecording],
	)

	const handleKeyUp = useCallback(
		(e: KeyboardEvent) => {
			if (e.code === 'Space') {
				e.preventDefault()
				stopRecording()
			}
		},
		[stopRecording],
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keyup', handleKeyUp)
			if (streamRef.current) {
				streamRef.current.getTracks().forEach(track => track.stop())
			}
		}
	}, [handleKeyDown, handleKeyUp])

	return {
		isRecording,
		startRecording,
		stopRecording,
	}
}
