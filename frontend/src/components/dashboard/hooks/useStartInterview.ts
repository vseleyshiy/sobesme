import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import type { TypeInterviewStartSchema } from '@/components/dashboard/dashboard-modal/schemas/interview-start.schema'
import { PAGES_CONFIG } from '@/configs/pages-url.config'
import { queryClient } from '@/configs/tanstack-query-client.config'
import { interviewService } from '@/services/interview.service'
import type { IAuthError } from '@/types/auth.type'
import type { IInterview } from '@/types/interview.type'
import { toastMessageHandler } from '@/utils/toast-message-handler.util'

export function useStartInterview() {
	const navigate = useNavigate()

	const { mutate, isPending } = useMutation<
		IInterview,
		AxiosError<IAuthError>,
		TypeInterviewStartSchema
	>({
		mutationKey: ['interview start'],
		mutationFn: (data: TypeInterviewStartSchema) =>
			interviewService.startInterview(data),
		onSuccess: async (data: IInterview) => {
			toast.success('Вы успешно создали новое интервью!')
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['profile'] }),
				queryClient.invalidateQueries({ queryKey: ['interviews'] }),
			])
			navigate(PAGES_CONFIG.ROOM + `/${data.id}`)
		},
		onError(error) {
			toastMessageHandler(error.response.data.message)
		},
	})

	return { mutate, isPending }
}
