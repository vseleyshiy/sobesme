import { useNavigate, useSearchParams } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import { PAGES_CONFIG } from '../../../configs/pages-url.config'
import { verificationService } from '../../../services/verification.service'
import type {
	IAuthError,
	IAuthUserReturnResponse,
} from '../../../types/auth.type'
import { toastMessageHandler } from '../../../utils/toast-message-handler.util'

export function useVerification() {
	const navigate = useNavigate()

	const [searchParams] = useSearchParams()

	const { mutate, isPending } = useMutation<
		IAuthUserReturnResponse,
		AxiosError<IAuthError>
	>({
		mutationKey: ['email verification'],
		mutationFn: () =>
			verificationService.newVerification({ token: searchParams.get('token') }),
		onSuccess() {
			toast.success('Верификация почты успешно пройдена!')
			navigate(PAGES_CONFIG.DASHBOARD)
		},
		onError(error) {
			toastMessageHandler(error.response.data.message)
			navigate(PAGES_CONFIG.LOGIN)
		},
	})

	return { mutate, isPending }
}
