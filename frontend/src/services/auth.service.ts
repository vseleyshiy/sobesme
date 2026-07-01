import { axiosClassic, axiosWithAuth } from '../api/interceptors'
import type { TypeOAuth } from '../components/auth/auth.types'
import type { TypeLoginSchema } from '../components/auth/schemas/login.schema'
import type { TypeRegisterSchema } from '../components/auth/schemas/register.schema'
import type {
	IAuthUserReturnResponse,
	IEmailConfirmationRequest,
	IEmailConfirmationResponse,
	IOAuthResponse,
	IPasswordNewRequest,
	IPasswordResetRequest,
	IRegisterResponse,
} from '../types/auth.type'

class AuthService {
	private BASE_URL = '/auth'

	async oauthByProvider(provider: TypeOAuth) {
		const response = await axiosClassic.get<IOAuthResponse>(
			`${this.BASE_URL}/oauth/connect/${provider}`,
		)

		return response.data
	}

	async register(data: TypeRegisterSchema) {
		const response = await axiosClassic.post<IRegisterResponse>(
			`${this.BASE_URL}/register`,
			data,
		)

		return response.data
	}

	async emailConfirmation(data: IEmailConfirmationRequest) {
		const response = await axiosClassic.post<IEmailConfirmationResponse>(
			`${this.BASE_URL}/email-confirmation`,
			data,
		)

		return response.data
	}

	async login(data: TypeLoginSchema) {
		const response = await axiosClassic.post<IAuthUserReturnResponse>(
			`${this.BASE_URL}/login`,
			data,
		)

		return response.data
	}

	async passwordReset(data: IPasswordResetRequest) {
		const response = await axiosWithAuth.post<boolean>(
			`${this.BASE_URL}password-recovery/reset`,
			data,
		)

		return response.data
	}

	async passwordNew(data: IPasswordNewRequest) {
		const response = await axiosWithAuth.post<boolean>(
			`${this.BASE_URL}password-recovery/new/${data.token}`,
			{ password: data.password },
		)

		return response.data
	}

	async logout() {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/logout`)

		return response
	}
}

export const authService = new AuthService()
