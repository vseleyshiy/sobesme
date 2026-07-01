import { useCallback } from 'react'

import { useMutation } from '@tanstack/react-query'

import { authService } from '../../../services/auth.service'
import type { TypeOAuth } from '../auth.types'

export function useAuthSocial() {
	const { mutateAsync } = useMutation({
		mutationKey: ['oauth by provider'],
		mutationFn: async (provider: TypeOAuth) =>
			await authService.oauthByProvider(provider),
	})

	const onClick = useCallback(
		async (provider: TypeOAuth) => {
			const response = await mutateAsync(provider)

			if (response) {
				location.href = response.url
			}
		},
		[mutateAsync],
	)

	return { onClick }
}
