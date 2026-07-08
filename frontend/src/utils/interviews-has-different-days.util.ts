import type { IInterview } from '@/types/interview.type'

export function interviewsHasDifferentDays(interviews: IInterview[]) {
	if (interviews.length < 2) return false

	const firstDateString = new Date(interviews[0].updatedAt).toDateString()

	return interviews.some(
		interview =>
			new Date(interview.updatedAt).toDateString() !== firstDateString,
	)
}
