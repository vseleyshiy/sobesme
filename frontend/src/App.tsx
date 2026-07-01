import { Route, Routes } from 'react-router'

import { ProtectedRoute } from './ProtectedRoute'
import { PAGES_CONFIG } from './configs/pages-url.config'
import './index.scss'
import {
	DashboardPage,
	LoginPage,
	NewPasswordPage,
	RegisterPage,
	ResetPasswordPage,
	RoomPage,
	VerificationPage,
} from './pages'
import { MainProvider } from './providers'

export function App() {
	return (
		<MainProvider>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path={PAGES_CONFIG.DASHBOARD} element={<DashboardPage />} />
					<Route
						path={PAGES_CONFIG.ROOM + '/:interviewId'}
						element={<RoomPage />}
					/>
					<Route path={PAGES_CONFIG.REGISTER} element={<RegisterPage />} />
					<Route path={PAGES_CONFIG.LOGIN} element={<LoginPage />} />
					<Route
						path={PAGES_CONFIG.EMAIL_VERIFICATION}
						element={<VerificationPage />}
					/>
					<Route
						path={PAGES_CONFIG.PASSWORD_RESET}
						element={<ResetPasswordPage />}
					/>
					<Route
						path={PAGES_CONFIG.PASSWORD_NEW}
						element={<NewPasswordPage />}
					/>
				</Route>
			</Routes>
		</MainProvider>
	)
}
