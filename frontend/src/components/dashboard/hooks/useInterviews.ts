import { useQuery } from '@tanstack/react-query'

import { interviewService } from '@/services/interview.service'

export function useInterviews() {
	const { data: interviews, isLoading } = useQuery({
		queryKey: ['interviews'],
		queryFn: () => interviewService.getInterviews(),
		staleTime: 60 * 60 * 1000,
		retry: false,
	})

	return { interviews, isLoading }
}
