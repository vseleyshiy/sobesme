import { useEffect, type PropsWithChildren } from 'react'
import { useParams } from 'react-router'

import { useStore } from 'jotai'

import { socket } from '.'
import { isConnectedAtom } from '../stores/socket.store'

export const SocketComponent = (props: PropsWithChildren) => {
	const { children } = props

	const store = useStore()
	const { interviewId } = useParams<{ interviewId: string }>()

	useEffect(() => {
		if (!interviewId) return

		function onConnect() {
			store.set(isConnectedAtom, true)

			socket.io.opts.query = { interviewId }
		}

		function onDisconnect() {
			store.set(isConnectedAtom, false)
		}

		socket.on('connect', onConnect)
		socket.on('disconnect', onDisconnect)

		return () => {
			socket.off('connect', onConnect)
			socket.off('disconnect', onDisconnect)
		}
	}, [interviewId, store])

	return <>{children}</>
}
