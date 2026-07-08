import type { TypeInterviewStartSchema } from '@/components/dashboard/dashboard-modal/schemas/interview-start.schema'
import type { IInterview, IInterviewFinish } from '@/types/interview.type'

import { axiosWithAuth } from '../api/interceptors'

class InterviewService {
	private BASE_URL = '/interviews'

	async getInterviewById(interviewId: string) {
		const response = await axiosWithAuth.get<IInterview>(
			`${this.BASE_URL}/${interviewId}`,
		)

		return response.data
	}

	async getInterviews() {
		const response = await axiosWithAuth.get<IInterview[]>(this.BASE_URL)

		return response.data
	}

	async startInterview(data: TypeInterviewStartSchema) {
		const response = await axiosWithAuth.post<IInterview>(
			`${this.BASE_URL}/start`,
			data,
		)

		return response.data
	}

	async finish(data: IInterviewFinish) {
		const response = await axiosWithAuth.post<IInterview>(
			`${this.BASE_URL}/finish`,
			data,
		)

		return response.data
	}
}

export const interviewService = new InterviewService()
