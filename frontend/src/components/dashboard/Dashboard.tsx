import { DashboardList } from '@/components/dashboard/dashboard-list/DashboardList'
import { DashboardModal } from '@/components/dashboard/dashboard-modal/DashboardModal'
import { GlobalLoader } from '@/components/ui/loader'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import { Button } from '../ui/button'
import styles from './Dashboard.module.scss'

export function Dashboard() {
	const { isLoading: isUserLoading, user } = useProfile()

	const { ref, isShow, setIsShow } = useOutside<HTMLFormElement>(false)

	return isUserLoading ? (
		<GlobalLoader />
	) : (
		<>
			<div className='container'>
				<div className={styles.content}>
					<div className={styles.balance}>
						<div className={styles.title}>
							<span className={styles.text}>в данный момент у вас</span>
							<span className={styles.count}>{user.interviewsBalance}</span>
							<span className={styles.text}>интервью</span>
						</div>
						<Button
							args={{
								onClick: () => setIsShow(true),
							}}
						>
							настроить собеседование
						</Button>
					</div>
					<DashboardList />
				</div>
			</div>
			<DashboardModal isShow={isShow} setIsShow={setIsShow} ref={ref} />
		</>
	)
}
