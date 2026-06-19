import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { getDefaultStore } from 'jotai'

const store = getDefaultStore()

/**
 * Базовая конфигурация для Axios инстансов.
 * Устанавливает базовый URL, заголовки и разрешает передачу cookie (withCredentials).
 */
const options: CreateAxiosDefaults = {
	baseURL: import.meta.env.VITE_SERVER_URL + '/api',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
}

/**
 * Экземпляр Axios для публичных запросов (не требующих авторизации).
 */
const axiosClassic = axios.create(options)

/**
 * Экземпляр Axios для защищенных запросов (требующих авторизации).
 * Автоматически прикрепляет JWT токен к каждому запросу.
 */
const axiosWithAuth = axios.create(options)

/**
 * Интерцептор запроса (Request Interceptor) для axiosWithAuth.
 * Извлекает текущий access_token из хранилища (Jotai или localStorage) и добавляет его в заголовок Authorization.
 */
axiosWithAuth.interceptors.request.use(async config => {
	const accessToken = store.get(accessTokenAtom) || getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

let isRefreshing = false
let failedQueue: Array<{
	resolve: (value?: unknown) => void
	reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) prom.reject(error)
		else prom.resolve(token)
	})
	failedQueue = []
}

/**
 * Интерцептор ответа (Response Interceptor) для axiosWithAuth.
 * Обрабатывает ошибки 401 (Unauthorized) и пытается автоматически обновить access_token.
 * Если обновление (refresh) успешно, повторяет исходный запрос с новым токеном.
 * Если обновление не удалось (например, refresh token тоже протух), разлогинивает пользователя и перенаправляет на страницу Welcome.
 */
axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			error?.response?.status === 401 &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						return axiosWithAuth.request(originalRequest)
					})
					.catch(err => Promise.reject(err))
			}

			originalRequest._isRetry = true
			isRefreshing = true

			try {
				const response = await authService.getNewAccessTokenByRefresh()
				const newAccessToken = response.data.access_token

				if (newAccessToken) {
					store.set(accessTokenAtom, newAccessToken)
					store.set(isAuthAtom, true)
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
					processQueue(null, newAccessToken)
				}

				return axiosWithAuth.request(originalRequest)
			} catch (refreshError) {
				processQueue(refreshError, null)
				store.set(accessTokenAtom, '')
				store.set(isAuthAtom, false)
				window.location.replace(PAGES_CONFIG.WELCOME)
				throw refreshError
			} finally {
				isRefreshing = false
			}
		}

		throw error
	},
)

export { axiosClassic, axiosWithAuth }
