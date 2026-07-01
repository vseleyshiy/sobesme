import { zodResolver } from '@hookform/resolvers/zod'

import type { IAuthUserReturnResponse } from '../../types/auth.type'
import styles from './Auth.module.scss'
import { AuthWrapper } from './auth-wrapper/AuthWrapper'
import { LOGIN_FIELDS } from './auth.data'
import { useLogin } from './hooks/useLogin'
import { loginSchema, type TypeLoginSchema } from './schemas/login.schema'

const resolver = zodResolver(loginSchema)

export function Login() {
	const { mutate, isPending } = useLogin()

	return (
		<div className={styles.auth}>
			<AuthWrapper<TypeLoginSchema, IAuthUserReturnResponse>
				header='Вход'
				fields={LOGIN_FIELDS}
				resolver={resolver}
				mutate={mutate}
				isPending={isPending}
				isLogin={true}
			/>
		</div>
	)
}
