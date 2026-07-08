import { useMemo } from 'react'

import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

import { DashboardChartTooltip } from '@/components/dashboard/dashboard-chart/dashboard-chart-tooltip/DashboardChartTooltip'
import { DIFFICULTY_CONFIG } from '@/components/dashboard/dashboard-chart/dashboard-chart.data'
import { useInterviews } from '@/components/dashboard/hooks/useInterviews'
import { EmptyError } from '@/components/ui/empty-error'
import { Loader } from '@/components/ui/loader'
import { getScoresByDateAndDifficulty } from '@/utils/get-scores-by-date-and-difficulty.util'
import { interviewsHasDifferentDays } from '@/utils/interviews-has-different-days.util'

import styles from './DashboardChart.module.scss'

export function DashboardChart() {
	const { interviews, isLoading } = useInterviews()

	// 1. Безопасно вычисляем данные для графика
	const chartData = useMemo(() => {
		if (isLoading || !interviews) return []

		return getScoresByDateAndDifficulty(interviews)
	}, [interviews, isLoading])

	const activeDifficulties = useMemo(() => {
		const set = new Set<string>()

		chartData.forEach(day => {
			if (day.PUPPY !== undefined) set.add('PUPPY')
			if (day.STRICT !== undefined) set.add('STRICT')
			if (day.HARD !== undefined) set.add('HARD')
		})

		return set
	}, [chartData])

	return (
		<div className={styles.chart}>
			<div className={styles.title}>график активности по сложности</div>
			{isLoading ? (
				<Loader />
			) : !interviewsHasDifferentDays(interviews) ? (
				<EmptyError
					title='недостаточно данных'
					description='пройдите больше собеседований, чтобы получить график активности по сложности'
				/>
			) : (
				<ResponsiveContainer width='100%' height={400}>
					<BarChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
					>
						<CartesianGrid strokeDasharray='3 3' vertical={false} />
						<XAxis dataKey='date' />
						<YAxis type='number' domain={[0, 5]} allowDataOverflow={true} />

						<Tooltip
							cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
							content={content => <DashboardChartTooltip {...content} />}
						/>

						<Legend wrapperStyle={{ paddingTop: '20px' }} />

						{DIFFICULTY_CONFIG.map(({ key, name, fill }) => {
							if (!activeDifficulties.has(key)) return null

							return (
								<Bar
									key={key}
									dataKey={key}
									name={name}
									fill={fill}
									radius={[4, 4, 0, 0]}
								/>
							)
						})}
					</BarChart>
				</ResponsiveContainer>
			)}
		</div>
	)
}
