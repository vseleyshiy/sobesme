import { axiosWithAuth } from '../api/interceptors'
import type { IUser } from '../types/user.type'

class UserService {
	private BASE_URL = '/users'

	async getProfile() {
		const response = await axiosWithAuth.get<IUser>(`${this.BASE_URL}/profile`)

		return response.data
	}
}

export const userService = new UserService()
