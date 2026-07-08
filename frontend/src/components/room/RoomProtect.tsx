import { Navigate, Outlet } from 'react-router'

import { useGetInterview } from '@/components/room/hooks/useGetInterview'
import { GlobalLoader } from '@/components/ui/loader'
import { PAGES_CONFIG } from '@/configs/pages-url.config'

export function RoomProtect() {
	const { interview, isLoading } = useGetInterview()

	if (isLoading) return <GlobalLoader />

	if (interview.status === 'COMPLETED') {
		return <Navigate to={PAGES_CONFIG.DASHBOARD} replace />
	}

	return <Outlet />
}
