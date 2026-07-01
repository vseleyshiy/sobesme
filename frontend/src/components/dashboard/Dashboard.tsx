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

	// тут будет создаваться interview (будет выбираться тема например, grade и прочее) и потом, как только оно создалось, меня будет перенавлять с помощью navigate на /room/:interviewId, который только что создался

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
// делал красивый вывод интервьюшек в dashboard. После этого иди по логике ниже
// доделываешь сейчас модалку для создания (react-hook-form + tanstack, чтобы прямо отсюда можно было создавать interview и заходить в него в /room). Дальше, когда доделаешь модалку со всем функционалом-фаршем, просматриваешь весь цикл audio и поправляешь его. Как только ты всё доделаешь тут, запускаешь все сервера, выводишь все ответы ИИ + голосовые ответы и пытаешься разговаривать с ним
