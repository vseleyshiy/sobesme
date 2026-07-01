import { Link } from 'react-router'

import type { IAuthFieldsProps } from '@/components/auth/auth-wrapper/auth-fields/auth-fields.types'
import { Input, PasswordInput } from '@/components/ui/input'
import type { IInputProps } from '@/components/ui/input/input.types'
import { PAGES_CONFIG } from '@/configs/pages-url.config'

import styles from './AuthFields.module.scss'

export function AuthFields<T>(props: IAuthFieldsProps<T>) {
	const { fields, register, errors, isLogin } = props

	return (
		<div className={styles.fields}>
			{fields.map(field => {
				const inputProps: IInputProps<T> = {
					name: field.name,
					register,
					title: field.title,
					args: {
						placeholder: field.placeholder,
					},
					error: errors[field.name]?.message as string,
				}
				if (field.isPassword) {
					return <PasswordInput<T> key={field.name} {...inputProps} />
				} else {
					return <Input<T> key={field.name} {...inputProps} />
				}
			})}
			{isLogin && (
				<Link className={styles.forgotLabel} to={PAGES_CONFIG.PASSWORD_RESET}>
					Забыли пароль?
				</Link>
			)}
		</div>
	)
}
