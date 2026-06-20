import { useForm, type SubmitHandler } from 'react-hook-form'

import styles from './AuthWrapper.module.scss'
import { AuthFields } from './auth-fields/AuthFields'
import { AuthFooter } from './auth-footer/AuthFooter'
import { AuthSocial } from './auth-social/AuthSocial'
import type { IAuthWrapperProps } from './auth-wrapper.types'

export function AuthWrapper<T>(props: IAuthWrapperProps<T>) {
	const { header, fields, resolver } = props

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<T>({
		resolver,
	})

	const onSubmit: SubmitHandler<T> = data => {
		console.log(data)
	}

	return (
		<div className={styles.wrap}>
			<h2 className={styles.header}>{header}</h2>
			<AuthSocial />
			<form onSubmit={handleSubmit(onSubmit)}>
				<AuthFields fields={fields} register={register} errors={errors} />
				<AuthFooter header={header} />
			</form>
		</div>
	)
}
