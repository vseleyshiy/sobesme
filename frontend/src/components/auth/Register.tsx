import styles from './Auth.module.scss'
import { AuthWrapper } from './auth-wrapper/AuthWrapper'
import { REGISTER_FIELDS } from './auth.data'

export function Register() {
	return (
		<div className={styles.auth}>
			<AuthWrapper header='Регистрация' fields={REGISTER_FIELDS} />
		</div>
	)
}
