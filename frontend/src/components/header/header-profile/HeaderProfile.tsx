import { Loader } from '@/components/ui/loader'
import { useProfile } from '@/hooks/useProfile'

import styles from './HeaderProfile.module.scss'

export function HeaderProfile() {
	const { user, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className={styles.profile}>
			<div className={styles.email}>{user.email}</div>
			<div className={styles.avatar}>
				{user.picture ? (
					<img src={user.picture} className={styles.icon} />
				) : (
					<div className={styles.icon}>
						{user.email.charAt(0).toUpperCase()}
					</div>
				)}
			</div>
		</div>
	)
}
