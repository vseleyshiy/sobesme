import { zodResolver } from '@hookform/resolvers/zod'

import styles from './Auth.module.scss'
import { AuthWrapper } from './auth-wrapper/AuthWrapper'
import { REGISTER_FIELDS } from './auth.data'
import {
	registerSchema,
	type TypeRegisterSchema,
} from './schemas/register.schema'

const resolver = zodResolver(registerSchema)

export function Register() {
	return (
		<div className={styles.auth}>
			<AuthWrapper<TypeRegisterSchema>
				header='Регистрация'
				fields={REGISTER_FIELDS}
				resolver={resolver}
			/>
		</div>
	)
}
