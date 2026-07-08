import { useNavigate, useParams } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { PAGES_CONFIG } from '@/configs/pages-url.config'
import { queryClient } from '@/configs/tanstack-query-client.config'
import { interviewService } from '@/services/interview.service'
import type { IAuthError } from '@/types/auth.type'
import type { IInterview } from '@/types/interview.type'
import { toastMessageHandler } from '@/utils/toast-message-handler.util'

export function useFinishInterview() {
	const navigate = useNavigate()

	const { interviewId } = useParams<{ interviewId: string }>()

	const { mutate, isPending } = useMutation<
		IInterview,
		AxiosError<IAuthError>,
		void
	>({
		mutationKey: ['finish interview'],
		mutationFn: () => interviewService.finish({ interviewId }),
		onSuccess() {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ['interviews'] }),
				queryClient.invalidateQueries({
					queryKey: ['interview', interviewId],
				}),
			])
			navigate(PAGES_CONFIG.DASHBOARD)
		},
		onError(error) {
			toastMessageHandler(error.response.data.message)
		},
	})

	return { mutate, isPending }
}
