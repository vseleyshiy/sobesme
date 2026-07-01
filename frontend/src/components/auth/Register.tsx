import { zodResolver } from '@hookform/resolvers/zod'

import type { IRegisterResponse } from '../../types/auth.type'
import styles from './Auth.module.scss'
import { AuthWrapper } from './auth-wrapper/AuthWrapper'
import { REGISTER_FIELDS } from './auth.data'
import { useRegister } from './hooks/useRegister'
import {
	registerSchema,
	type TypeRegisterSchema,
} from './schemas/register.schema'

const resolver = zodResolver(registerSchema)

export function Register() {
	const { mutate, isPending } = useRegister()

	return (
		<div className={styles.auth}>
			<AuthWrapper<TypeRegisterSchema, IRegisterResponse>
				header='Регистрация'
				fields={REGISTER_FIELDS}
				resolver={resolver}
				mutate={mutate}
				isPending={isPending}
			/>
		</div>
	)
}
