import { Link } from 'react-router'

import cn from 'clsx'

import type { IHeaderItemProps } from '@/components/header/header-item/header-item.type'

import styles from './HeaderItem.module.scss'

export function HeaderItem(props: IHeaderItemProps) {
	const { data, active } = props

	return (
		<Link
			className={cn(styles.link, {
				[styles.active]: active,
			})}
			to={data.link}
		>
			{data.text}
		</Link>
	)
}
