import { Route, Routes } from 'react-router'

import { Providers } from './Providers'
import { PAGES_CONFIG } from './configs/pages-url.config'
import './index.scss'
import { RoomPage } from './pages/(logged-in)/RoomPage'
import { GeneralPage } from './pages/GeneralPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

export function App() {
	return (
		<Providers>
			<Routes>
				<Route path={PAGES_CONFIG.GENERAL} element={<GeneralPage />} />
				<Route
					path={PAGES_CONFIG.ROOM + '/:interviewId'}
					element={<RoomPage />}
				/>
				<Route path={PAGES_CONFIG.REGISTER} element={<RegisterPage />} />
				<Route path={PAGES_CONFIG.LOGIN} element={<LoginPage />} />
			</Routes>
		</Providers>
	)
}
