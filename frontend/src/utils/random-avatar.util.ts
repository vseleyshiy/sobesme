import type { EMOTIONS, TypeEmotions } from '@/types/enums.type'

type IRandomAvatar = {
	[key in keyof typeof EMOTIONS]: string[]
}

const AVATARS: IRandomAvatar = {
	COOL: ['cool.jpeg', 'happy.jpeg', 'master.jpeg', 'sigma.jpeg'],
	NEUTRAL: ['calm.jpeg', 'looks_down.jpeg', 'rotate_calm.jpeg'],
	FACEPALM: ['clarifying.jpeg', 'hope.jpeg', 'lost.jpeg', 'puffed_up.jpeg'],
	SMIRK: ['adds_fuel_to_fire.jpg', 'came_up_something.jpeg'],
	ANGRY: ['scared.jpeg', 'shoked.jpg', 'so_angry.jpg'],
	FURIOUS: [
		'disgusting.jpeg',
		'psyco.jpeg',
		'sad_and_rage.jpg',
		'surprised_and_shoked.jpeg',
		'unconscious.jpeg',
	],
}

export function randomAvatarUrl(emotion: TypeEmotions) {
	const array = AVATARS[emotion]

	const randomIndex = Math.floor(Math.random() * array.length)
	return `/iori/${emotion}/${array[randomIndex]}`
}
