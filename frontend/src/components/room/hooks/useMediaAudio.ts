import { useCallback, useEffect, useRef, useState } from 'react'

import { useStore } from 'jotai'
import { toast } from 'sonner'

import { socket } from '@/socket'
import {
	aiTextResponseAtom,
	isAnimationAppearancedAtom,
} from '@/stores/room.store'

export function useMediaAudio() {
	const store = useStore()

	const [isRecording, setIsRecording] = useState(false)

	const mediaRecorderRef = useRef<MediaRecorder | null>(null)
	const streamRef = useRef<MediaStream | null>(null)

	const isPressingRef = useRef(false)
	const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const isAnimationAppearancedRef = useRef(false)

	const startRecording = useCallback(async () => {
		if (isPressingRef.current) return

		isPressingRef.current = true

		if (silenceTimeoutRef.current) {
			clearTimeout(silenceTimeoutRef.current)
			silenceTimeoutRef.current = null
		}

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
					socket.emit('audio_chunk', e.data)
					console.log('CHUNK!')
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

		if (silenceTimeoutRef.current) {
			clearTimeout(silenceTimeoutRef.current)
		}

		silenceTimeoutRef.current = setTimeout(() => {
			socket.emit('audio_end')
			console.log('AUDIO_END')
			silenceTimeoutRef.current = null

			store.set(aiTextResponseAtom, '')

			if (!isAnimationAppearancedRef.current) {
				isAnimationAppearancedRef.current = true
				store.set(isAnimationAppearancedAtom, true)
			}
		}, 5000)
	}, [store])

	const onMicro = useCallback(() => {
		const response = store.get(aiTextResponseAtom)

		if (!response) return

		if (isRecording) {
			stopRecording()
		} else {
			startRecording()
		}
	}, [store, isRecording, startRecording, stopRecording])

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

			if (silenceTimeoutRef.current) {
				clearTimeout(silenceTimeoutRef.current)
			}
		}
	}, [handleKeyDown, handleKeyUp])

	return {
		isRecording,
		onMicro,
	}
}
