import { useParams } from 'react-router'

import { useQuery } from '@tanstack/react-query'

import { interviewService } from '@/services/interview.service'

export function useGetInterview() {
	const { interviewId } = useParams<{ interviewId: string }>()

	const { data: interview, isLoading } = useQuery({
		queryKey: ['interview', interviewId],
		queryFn: () => interviewService.getInterviewById(interviewId),
		staleTime: 60 * 60 * 1000,
		retry: false,
	})

	return { interview, isLoading }
}
