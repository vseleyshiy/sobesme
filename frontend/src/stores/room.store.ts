import { atom } from 'jotai'

export const aiTextResponseAtom = atom<string>('initial')
export const currentHpAtom = atom<number>(10)
export const seniorAvatarAtom = atom<string>('/iori/hi.jpg')

export const isAnimationAppearancedAtom = atom<boolean>(false)
