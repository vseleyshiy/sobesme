export const ROLES = {
	REGULAR: 'REGULAR',
	ADMIN: 'ADMIN',
} as const

export type TypeRoles = (typeof ROLES)[keyof typeof ROLES]

export const METHOD = {
	CREDENTIALS: 'CREDENTIALS',
	YANDEX: 'YANDEX',
} as const

export type TypeMethod = (typeof METHOD)[keyof typeof METHOD]

export const MESSAGE_ROLES = {
	USER: 'user',
	ASSISTANT: 'assistant',
} as const

export type TypeMessageRoles =
	(typeof MESSAGE_ROLES)[keyof typeof MESSAGE_ROLES]

export const GRADE = {
	TRAINEE: 'TRAINEE',
	JUNIOR: 'JUNIOR',
	MIDDLE: 'MIDDLE',
	SENIOR: 'SENIOR',
} as const

export type TypeGrade = (typeof GRADE)[keyof typeof GRADE]

export const INTERVIEW_STATUS = {
	IN_PROGRESS: 'IN_PROGRESS',
	COMPLETED: 'COMPLETED',
} as const

export type TypeInterviewStatus =
	(typeof INTERVIEW_STATUS)[keyof typeof INTERVIEW_STATUS]

export const DIFFICULTY = {
	PUPPY: 'PUPPY',
	STRICT: 'STRICT',
	HARD: 'HARD',
} as const

export type TypeDifficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY]

export const EMOTIONS = {
	COOL: 'COOL',
	NEUTRAL: 'NEUTRAL',
	SMIRK: 'SMIRK',
	FACEPALM: 'FACEPALM',
	ANGRY: 'ANGRY',
	FURIOUS: 'FURIOUS',
} as const

export type TypeEmotions = (typeof EMOTIONS)[keyof typeof EMOTIONS]
