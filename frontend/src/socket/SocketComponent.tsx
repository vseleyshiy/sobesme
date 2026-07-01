import { useEffect, type PropsWithChildren } from 'react'
import { useParams } from 'react-router'

import { useStore } from 'jotai'

import { aiTextResponseAtom } from '@/stores/room.store'
import type { IAiResponse } from '@/types/socket.type'

import { socket } from '.'
import { isConnectedAtom } from '../stores/socket.store'

export const SocketComponent = (props: PropsWithChildren) => {
	const { children } = props

	const store = useStore()
	const { interviewId } = useParams<{ interviewId: string }>()

	useEffect(() => {
		if (!interviewId) return

		socket.io.opts.query = { interviewId }

		function onConnect() {
			store.set(isConnectedAtom, true)

			console.log(socket.io.opts.query)
		}

		function onDisconnect() {
			store.set(isConnectedAtom, false)
		}

		function aiResponse(data: IAiResponse) {
			const { text, audioBuffer } = data

			store.set(aiTextResponseAtom, text)

			const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' })

			const audioUrl = URL.createObjectURL(audioBlob)

			const audioPlayer = new Audio(audioUrl)

			audioPlayer.onended = () => {
				console.log('ИИ закончил говорить. Твоя очередь!')
				// Включаем запись микрофона
			}

			audioPlayer.play().catch(err => {
				console.error('Ошибка автовоспроизведения:', err)
			})

			return () => {
				URL.revokeObjectURL(audioUrl)
			}
		}

		socket.on('connect', onConnect)
		socket.on('exception', error => {
			console.error('NestJS выбросил скрытую ошибку:', error)
		})
		socket.on('disconnect', onDisconnect)
		socket.on('ai_response', data => aiResponse(data))

		return () => {
			socket.off('connect', onConnect)
			socket.off('exception')
			socket.off('disconnect', onDisconnect)
			socket.off('ai_response', data => aiResponse(data))
		}
	}, [interviewId, store])

	return <>{children}</>
}
