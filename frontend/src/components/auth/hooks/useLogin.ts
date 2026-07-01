import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import type { TypeLoginSchema } from '@/components/auth/schemas/login.schema'
import { PAGES_CONFIG } from '@/configs/pages-url.config'
import { queryClient } from '@/configs/tanstack-query-client.config'
import { authService } from '@/services/auth.service'
import type { IAuthError, IAuthUserReturnResponse } from '@/types/auth.type'
import { toastMessageHandler } from '@/utils/toast-message-handler.util'

export function useLogin() {
	const navigate = useNavigate()

	const { mutate, isPending } = useMutation<
		IAuthUserReturnResponse,
		AxiosError<IAuthError>,
		TypeLoginSchema
	>({
		mutationKey: ['login user'],
		mutationFn: (data: TypeLoginSchema) => authService.login(data),
		onSuccess() {
			toast.success('Вы успешно авторизовались на сайте!')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			navigate(PAGES_CONFIG.DASHBOARD)
		},
		onError(error) {
			toastMessageHandler(error.response.data.message)
		},
	})

	return { mutate, isPending }
}
