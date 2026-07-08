import { Logo } from '@/components/logo/Logo'

import styles from './Loader.module.scss'

export function GlobalLoader() {
	return (
		<div className={styles.global}>
			<div className={styles.content}>
				<Logo />
				<div className={styles.title}>Загрузка страницы...</div>
			</div>
		</div>
	)
}
