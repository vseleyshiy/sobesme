import type { IUser } from './user.type'

export interface IEmailConfirmationRequest {
	token: string
}

export interface IEmailConfirmationResponse {
	user: IUser
}

export interface IPasswordResetRequest {
	email: string
}

export interface IPasswordNewRequest extends IEmailConfirmationRequest {
	password: string
}

export interface IRegisterResponse {
	message: string
}

export interface IAuthUserReturnResponse {
	user: IUser
}

export interface IOAuthResponse {
	url: string
}

export interface IAuthError {
	message: string
	error: string
	statusCode: number
}
