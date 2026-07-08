import type { TooltipContentProps } from 'recharts'

import styles from './DashboardChartTooltip.module.scss'

export function DashboardChartTooltip(props: TooltipContentProps) {
	const { active, label, payload } = props

	console.log(payload)

	return (
		active &&
		payload &&
		payload.length && (
			<div className={styles.tooltip}>
				<div className={styles.label}>
					<strong>Дата: </strong>
					{label}
				</div>
				Среднее SCORE за день: {payload[0].value}
			</div>
		)
	)
}
