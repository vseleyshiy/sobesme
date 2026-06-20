import { Link } from 'react-router'

import { PAGES_CONFIG } from '../../../../configs/pages-url.config'
import { Button } from '../../../ui/button'
import styles from './AuthFooter.module.scss'
import type { IAuthFooterProps } from './auth-footer.types'

export function AuthFooter(props: IAuthFooterProps) {
	const { header } = props

	return (
		<div className={styles.footer}>
			<Button classNames={[styles.submit]}>
				{header === 'Вход' ? 'войти' : 'зарегистрироваться'}
			</Button>
			<div className={styles.footerText}>
				{header === 'Вход' ? (
					<span>
						ещё не зарегистрировался?
						<Link to={PAGES_CONFIG.REGISTER}>зарегистрироваться</Link>
					</span>
				) : (
					<span>
						уже есть аккаунт? <Link to={PAGES_CONFIG.LOGIN}>войти</Link>
					</span>
				)}
			</div>
		</div>
	)
}
