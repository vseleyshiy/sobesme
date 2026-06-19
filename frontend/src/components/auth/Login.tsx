import styles from './Auth.module.scss'
import { AuthWrapper } from './auth-wrapper/AuthWrapper'
import { LOGIN_FIELDS } from './auth.data'

export function Login() {
	return (
		<div className={styles.auth}>
			<AuthWrapper header='Вход' fields={LOGIN_FIELDS} />
		</div>
	)
}
