import { Button } from '../../../ui/button'
import { useAuthSocial } from '../../hooks/useAuthSocial'
import styles from './AuthSocial.module.scss'

export function AuthSocial() {
	const { onClick } = useAuthSocial()

	return (
		<div className={styles.social}>
			<div className={styles.buttons}>
				<Button
					args={{
						onClick: () => onClick('yandex'),
					}}
				>
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
