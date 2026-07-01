import { axiosClassic, axiosWithAuth } from '../api/interceptors'
import type { TypeNewPasswordSchema } from '../components/auth/schemas/new-password.schema'
import type { TypeResetPasswordSchema } from '../components/auth/schemas/reset-password.schema'
import type { IUser } from '../types/user.type'

class PasswordRecoveryService {
	private BASE_URL = '/auth/password-recovery'

	public async reset(data: TypeResetPasswordSchema) {
		const response = await axiosClassic.post<IUser>(
			`${this.BASE_URL}/reset`,
			data,
		)

		return response.data
	}

	public async new(data: TypeNewPasswordSchema, token: string | null) {
		const response = await axiosWithAuth.post<IUser>(
			`${this.BASE_URL}/new/${token}`,
			data,
		)

		return response.data
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
