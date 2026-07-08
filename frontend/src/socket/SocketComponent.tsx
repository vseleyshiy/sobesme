import { useEffect, type PropsWithChildren } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useStore } from 'jotai'

import { PAGES_CONFIG } from '@/configs/pages-url.config'
import {
	aiTextResponseAtom,
	currentHpAtom,
	seniorAvatarAtom,
} from '@/stores/room.store'
import type { IAiResponse } from '@/types/socket.type'
import { randomAvatarUrl } from '@/utils/random-avatar.util'

import { socket } from '.'
import { isConnectedAtom } from '../stores/socket.store'

export const SocketComponent = (props: PropsWithChildren) => {
	const { children } = props

	const navigate = useNavigate()

	const store = useStore()
	const { interviewId } = useParams<{ interviewId: string }>()

	useEffect(() => {
		if (!interviewId) return

		socket.io.opts.query = { interviewId }

		socket.connect()

		function onConnect() {
			store.set(isConnectedAtom, true)
		}

		function onDisconnect() {
			store.set(isConnectedAtom, false)
		}

		function aiResponse(data: IAiResponse) {
			const { text, emotion, impact, status, audioBuffer } = data

			if (!audioBuffer || !emotion || !impact || !status) return

			const currentHp = store.get(currentHpAtom)
			const newHp = currentHp + impact

			if (newHp <= 0 || status === 'COMPLETED') {
				navigate(PAGES_CONFIG.FINAL + `/${interviewId}`)
				return
			}

			store.set(aiTextResponseAtom, text)
			store.set(currentHpAtom, prev => prev + impact)
			store.set(seniorAvatarAtom, randomAvatarUrl(emotion))

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

			socket.disconnect()
		}
	}, [interviewId, store, navigate])

	return <>{children}</>
}
