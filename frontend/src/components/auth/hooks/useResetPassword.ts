import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { toast } from 'sonner'

import { passwordRecoveryService } from '../../../services/password-recovery.service'
import type { IAuthError } from '../../../types/auth.type'
import type { IUser } from '../../../types/user.type'
import { toastMessageHandler } from '../../../utils/toast-message-handler.util'
import type { TypeResetPasswordSchema } from '../schemas/reset-password.schema'

export function useResetPassword() {
	const { mutate, isPending } = useMutation<
		IUser,
		AxiosError<IAuthError>,
		TypeResetPasswordSchema
	>({
		mutationKey: ['reset password'],
		mutationFn: (data: TypeResetPasswordSchema) =>
			passwordRecoveryService.reset(data),
		onSuccess() {
			toast.info('Проверьте почту.', {
				description: 'На вашу почту была отправлена ссылка для подтверждения.',
			})
		},
		onError(error) {
			toastMessageHandler(error.response.data.message)
		},
	})

	return { mutate, isPending }
}
