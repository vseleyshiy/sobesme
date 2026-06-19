import { atom } from 'jotai'

import type { ISocketMessage } from '../types/socket.type'

export const isConnectedAtom = atom<boolean>(false)

export const messagesAtom = atom<ISocketMessage[]>([])
