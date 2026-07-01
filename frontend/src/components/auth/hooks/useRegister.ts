import { useNavigate } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { PAGES_CONFIG } from '../../../configs/pages-url.config'
import { authService } from '../../../services/auth.service'
import type { IAuthError, IRegisterResponse } from '../../../types/auth.type'
import { toastMessageHandler } from '../../../utils/toast-message-handler.util'
import type { TypeRegisterSchema } from '../schemas/register.schema'

export function useRegister() {
	const navigate = useNavigate()

	const { mutate, isPending } = useMutation<
		IRegisterResponse,
		AxiosError<IAuthError>,
		TypeRegisterSchema
	>({
		mutationKey: ['register user'],
		mutationFn: (data: TypeRegisterSchema) => authService.register(data),
		onSuccess(data) {
			toastMessageHandler(data.message)
			navigate(PAGES_CONFIG.LOGIN)
		},
		onError(error) {
			toastMessageHandler(error.response.data.message)
		},
	})

	return { mutate, isPending }
}
