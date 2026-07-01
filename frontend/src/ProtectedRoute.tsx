import { Navigate, Outlet, useLocation } from 'react-router'

import { GlobalLoader } from './components/ui/loader'
import { PAGES_CONFIG } from './configs/pages-url.config'
import { useProfile } from './hooks/useProfile'

export const ProtectedRoute = () => {
	const { user, isLoading } = useProfile()

	const location = useLocation()

	if (isLoading) return <GlobalLoader />

	const isAuthPage =
		location.pathname === PAGES_CONFIG.LOGIN ||
		location.pathname === PAGES_CONFIG.REGISTER ||
		location.pathname === PAGES_CONFIG.EMAIL_VERIFICATION ||
		location.pathname === PAGES_CONFIG.PASSWORD_RESET ||
		location.pathname === PAGES_CONFIG.PASSWORD_NEW

	if (isAuthPage) {
		if (user) {
			return <Navigate to={PAGES_CONFIG.DASHBOARD} replace />
		} else {
			return <Outlet />
		}
	}

	if (!user) {
		return <Navigate to={PAGES_CONFIG.LOGIN} replace />
	}

	return <Outlet />
}
