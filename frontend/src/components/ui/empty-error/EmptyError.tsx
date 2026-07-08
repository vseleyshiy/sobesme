import { CircleHelp } from 'lucide-react'

import type { IEmptyErrorProps } from '@/components/ui/empty-error/empty-error.type'

import styles from './EmptyError.module.scss'

export function EmptyError(props: IEmptyErrorProps) {
	const { Icon = CircleHelp, title, description } = props

	return (
		<div className={styles.error}>
			<Icon className={styles.icon} />
			<div className={styles.title}>{title}</div>
			<div className={styles.description}>{description}</div>
		</div>
	)
}
