import { useQuery } from '@tanstack/react-query'

import { userService } from '../services/user.service'

export function useProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		staleTime: 60 * 60 * 1000,
		retry: false,
	})

	return { user, isLoading }
}
