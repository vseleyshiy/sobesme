import { useForm, type SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../ui/button'
import { PasswordInput } from '../../ui/input'
import { useNewPassword } from '../hooks/useNewPassword'
import {
	newPasswordSchema,
	type TypeNewPasswordSchema,
} from '../schemas/new-password.schema'
import styles from './PasswordRecovery.module.scss'

export function NewPassword() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(newPasswordSchema),
	})
	const { mutate, isPending } = useNewPassword()

	const onSubmit: SubmitHandler<TypeNewPasswordSchema> = data => {
		mutate(data)
	}

	return (
		<div className={styles.air}>
			<div className={styles.wrap}>
				<h2>Новый пароль</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<PasswordInput<TypeNewPasswordSchema>
						name='password'
						register={register}
						title='введите новый пароль'
						error={errors.password?.message}
						args={{
							placeholder: '******',
						}}
					/>
					<Button
						args={{
							disabled: isPending,
						}}
					>
						Продолжить
					</Button>
				</form>
			</div>
		</div>
	)
}
