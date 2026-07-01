import { useLocation } from 'react-router'

import { HeaderItem } from '@/components/header/header-item/HeaderItem'
import { HeaderProfile } from '@/components/header/header-profile/HeaderProfile'
import { HEADER_NAV } from '@/components/header/header.data'
import { Logo } from '@/components/logo/Logo'

import styles from './Header.module.scss'

export function Header() {
	const location = useLocation()

	return (
		<header className={styles.header}>
			<Logo />
			<nav>
				{HEADER_NAV.map(item => (
					<HeaderItem data={item} active={item.link === location.pathname} />
				))}
			</nav>
			<HeaderProfile />
		</header>
	)
}
