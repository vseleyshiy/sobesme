import { axiosClassic } from '../api/interceptors'
import type { IVerificationRequest } from '../types/verification.type'

class VerificationService {
	private BASE_URL = '/auth'

	public async newVerification(data: IVerificationRequest) {
		const response = await axiosClassic.post(
			`${this.BASE_URL}/email-confirmation`,
			data,
		)

		return response.data
	}
}

export const verificationService = new VerificationService()
