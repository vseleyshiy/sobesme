import { Route, Routes } from 'react-router'

import { FinalProtect } from '@/components/final/FinalProtect'
import { RoomProtect } from '@/components/room/RoomProtect'

import { ProtectedRoute } from './ProtectedRoute'
import { PAGES_CONFIG } from './configs/pages-url.config'
import './index.scss'
import {
	DashboardPage,
	FinalPage,
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
					<Route element={<RoomProtect />}>
						<Route
							path={PAGES_CONFIG.ROOM + '/:interviewId'}
							element={<RoomPage />}
						/>
					</Route>
					<Route element={<FinalProtect />}>
						<Route
							path={PAGES_CONFIG.FINAL + '/:interviewId'}
							element={<FinalPage />}
						/>
					</Route>
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
