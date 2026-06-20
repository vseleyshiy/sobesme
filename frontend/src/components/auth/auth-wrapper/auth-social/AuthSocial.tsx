import { Button } from '../../../ui/button'
import styles from './AuthSocial.module.scss'

export function AuthSocial() {
	return (
		<div className={styles.social}>
			<div className={styles.buttons}>
				<Button>
					<div className={styles.img}>
						<img src='/yandex.svg' alt='yandex logo' />
					</div>
					Яндекс
				</Button>
			</div>
			<div className={styles.or}>
				<span />
				ИЛИ
				<span />
			</div>
		</div>
	)
}
