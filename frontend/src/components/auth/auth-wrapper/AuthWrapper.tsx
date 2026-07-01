import { useForm, type SubmitHandler } from 'react-hook-form'

import styles from './AuthWrapper.module.scss'
import { AuthFields } from './auth-fields/AuthFields'
import { AuthFooter } from './auth-footer/AuthFooter'
import { AuthSocial } from './auth-social/AuthSocial'
import type { IAuthWrapperProps } from './auth-wrapper.types'

export function AuthWrapper<T, R>(props: IAuthWrapperProps<T, R>) {
	const { header, fields, resolver, mutate, isPending, isLogin } = props

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<T>({
		resolver,
	})

	const onSubmit: SubmitHandler<T> = data => {
		mutate(data)
	}

	return (
		<div className={styles.wrap}>
			<h2>{header}</h2>
			<AuthSocial />
			<form onSubmit={handleSubmit(onSubmit)}>
				<AuthFields
					isLogin={isLogin}
					fields={fields}
					register={register}
					errors={errors}
				/>
				<AuthFooter header={header} isPending={isPending} />
			</form>
		</div>
	)
}
