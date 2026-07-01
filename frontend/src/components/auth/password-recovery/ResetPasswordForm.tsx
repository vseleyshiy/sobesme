import { useForm, type SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { useResetPassword } from '../hooks/useResetPassword'
import {
	resetPasswordSchema,
	type TypeResetPasswordSchema,
} from '../schemas/reset-password.schema'
import styles from './PasswordRecovery.module.scss'

export function ResetPasswordForm() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
	})
	const { mutate, isPending } = useResetPassword()

	const onSubmit: SubmitHandler<TypeResetPasswordSchema> = data => {
		mutate(data)
	}

	return (
		<div className={styles.air}>
			<div className={styles.wrap}>
				<h2>Изменение пароля</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input<TypeResetPasswordSchema>
						name='email'
						register={register}
						title='введите почту вашего аккаунта'
						error={errors.email?.message}
						args={{
							placeholder: 'support@sobesme.ru',
						}}
					/>
					<Button
						args={{
							disabled: isPending,
						}}
					>
						Сбросить
					</Button>
				</form>
			</div>
		</div>
	)
}
