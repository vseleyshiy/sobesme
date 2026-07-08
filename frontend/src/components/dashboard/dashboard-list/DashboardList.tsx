import { useCallback, useState } from 'react'

import { DashboardListModal } from '@/components/dashboard/dashboard-list/dashboard-list-modal/DashboardListModal'
import { useInterviews } from '@/components/dashboard/hooks/useInterviews'
import { Interview } from '@/components/dashboard/interview/Interview'
import { EmptyError } from '@/components/ui/empty-error'
import { Loader } from '@/components/ui/loader'
import { useOutside } from '@/hooks/useOutside'
import type { IInterview } from '@/types/interview.type'

import styles from './DashboardList.module.scss'

export function DashboardList() {
	const { interviews, isLoading } = useInterviews()

	const [interview, setInterview] = useState<IInterview | null>()

	const { ref, isShow, setIsShow } = useOutside<HTMLFormElement>(false)

	const onClick = useCallback(
		(interview: IInterview) => {
			if (interview.status === 'COMPLETED') {
				setInterview(interview)
				setIsShow(true)
			}
		},
		[setIsShow],
	)

	return (
		<>
			<DashboardListModal
				ref={ref}
				interview={interview}
				isShow={isShow}
				setIsShow={setIsShow}
			/>
			<div className={styles.content}>
				<h2 className={styles.title}>история ваших собеседований</h2>
				<ul className={styles.list}>
					{isLoading ? (
						<Loader />
					) : interviews.length === 0 ? (
						<EmptyError
							title='пока что тут пусто'
							description='вы ещё ни разу не собеседовались'
						/>
					) : (
						interviews.map(interview => (
							<Interview
								key={interview.id}
								interview={interview}
								onClick={onClick}
							/>
						))
					)}
				</ul>
			</div>
		</>
	)
}
