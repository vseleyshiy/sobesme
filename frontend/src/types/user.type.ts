import type { TypeMethod, TypeRoles } from './enums.type'

export interface IUser {
	id: string
	email: string
	interviewsBalance: number
	role: TypeRoles
	picture: string
	isVerified: boolean
	method: TypeMethod
	createdAt: string
	accounts?: string[]
}
