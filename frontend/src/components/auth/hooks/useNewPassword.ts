import { useNavigate, useSearchParams } from 'react-router'

import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import { PAGES_CONFIG } from '../../../configs/pages-url.config'
import { passwordRecoveryService } from '../../../services/password-recovery.service'
import type { IAuthError } from '../../../types/auth.type'
import type { IUser } from '../../../types/user.type'
import { toastMessageHandler } from '../../../utils/toast-message-handler.util'
import type { TypeNewPasswordSchema } from '../schemas/new-password.schema'

export function useNewPassword() {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const token = searchParams.get('token')

	const { mutate, isPending } = useMutation<
		IUser,
		AxiosError<IAuthError>,
		TypeNewPasswordSchema
	>({
		mutationKey: ['new password'],
		mutationFn: (data: TypeNewPasswordSchema) =>
			passwordRecoveryService.new(data, token),
		onSuccess() {
			toast.success('Вы успешно изменили ваш пароль!', {
				description: 'Теперь вы можете войти в свой аккаунт.',
			})
			navigate(PAGES_CONFIG.LOGIN)
		},
		onError(error) {
			toastMessageHandler(error.response.data.message)
		},
	})

	return { mutate, isPending }
}
