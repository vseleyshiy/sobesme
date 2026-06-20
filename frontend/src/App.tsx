import { Route, Routes } from 'react-router'

import { PAGES_CONFIG } from './configs/pages-url.config'
import './index.scss'
import { GeneralPage, LoginPage, RegisterPage, RoomPage } from './pages'
import { MainProvider } from './providers'

export function App() {
	return (
		<MainProvider>
			<Routes>
				<Route path={PAGES_CONFIG.GENERAL} element={<GeneralPage />} />
				<Route
					path={PAGES_CONFIG.ROOM + '/:interviewId'}
					element={<RoomPage />}
				/>
				<Route path={PAGES_CONFIG.REGISTER} element={<RegisterPage />} />
				<Route path={PAGES_CONFIG.LOGIN} element={<LoginPage />} />
			</Routes>
		</MainProvider>
	)
}
