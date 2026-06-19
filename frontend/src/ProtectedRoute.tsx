import { PAGES_CONFIG } from './configs/pages-url.config'

export const ProtectedRoute = () => {
	const isAuth = useAtomValue(isAuthAtom)
	const location = useLocation()

	if (!isAuth) {
		return <Navigate to={PAGES_CONFIG.WELCOME} replace />
	}
	if (!isAuth && location.pathname.startsWith(PAGES_CONFIG.ADMIN)) {
		return <NotFoundPage />
	}

	return <Outlet />
}
