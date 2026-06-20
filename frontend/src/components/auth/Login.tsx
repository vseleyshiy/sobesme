import { zodResolver } from '@hookform/resolvers/zod'

import styles from './Auth.module.scss'
import { AuthWrapper } from './auth-wrapper/AuthWrapper'
import { LOGIN_FIELDS } from './auth.data'
import { loginSchema, type TypeLoginSchema } from './schemas/login.schema'

const resolver = zodResolver(loginSchema)

export function Login() {
	return (
		<div className={styles.auth}>
			<AuthWrapper<TypeLoginSchema>
				header='Вход'
				fields={LOGIN_FIELDS}
				resolver={resolver}
			/>
		</div>
	)
}
