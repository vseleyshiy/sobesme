import { useState } from 'react'
import { Link } from 'react-router'

import { PAGES_CONFIG } from '../../../configs/pages-url.config'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import styles from './AuthWrapper.module.scss'
import type { IAuthWrapperProps } from './auth-wrapper.types'

export function AuthWrapper(props: IAuthWrapperProps) {
	const { header, fields } = props

	const [isHideFirst, setIsHideFirst] = useState(true)
	const [isHideSecond, setIsHideSecond] = useState(true)

	return (
		<div className={styles.wrap}>
			<h2 className={styles.header}>{header}</h2>
			<div className={styles.rows}>
				{fields.map(field => (
					<Input
						title={field.title}
						args={{
							placeholder: field.placeholder,
						}}
						isHidePassword={
							field.isPassword == 'first' ? isHideFirst : isHideSecond
						}
						setIsHidePassword={
							field.isPassword === 'first' ? setIsHideFirst : setIsHideSecond
						}
						isPassword={field.isPassword}
					/>
				))}
			</div>
			<div className={styles.footer}>
				<Button
					classNames={[styles.submit]}
					text={header === 'Вход' ? 'войти' : 'зарегистрироваться'}
				/>
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
		</div>
	)
}
