import type { IInterview } from '@/types/interview.type'
import type { IPythonAnalyzeInterviewData } from '@/types/python.type'

import { axiosWithAuth } from '../api/interceptors'

class PythonService {
	private BASE_URL = '/python'

	async analyzeInterview(data: IPythonAnalyzeInterviewData) {
		const response = await axiosWithAuth.post<IInterview>(
			`${this.BASE_URL}/ai/analyze-interview`,
			data,
		)

		return response.data
	}
}

export const pythonService = new PythonService()
