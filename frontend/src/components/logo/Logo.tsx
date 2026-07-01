import type { ILogoProps } from '@/components/logo/logo.type'

import styles from './Logo.module.scss'

export function Logo(props: ILogoProps) {
	const { style, fontSize } = props

	return (
		<a className={styles.wrap} href='https://sobesme.ru' target='_blank'>
			<div className={styles.logo} style={style}>
				<img src='/logo.svg' alt='sobesme logo' />
			</div>
			<div
				className={styles.title}
				style={{
					fontSize,
				}}
			>
				SOBESME
			</div>
		</a>
	)
}
