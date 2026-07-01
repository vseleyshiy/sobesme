import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'

import { queryClient } from '@/configs/tanstack-query-client.config'

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
 */
const axiosWithAuth = axios.create(options)

/**
 * Интерцептор ответа (Response Interceptor) для axiosWithAuth.
 * Если сессия истекла, разлогинивает пользователя и перенаправляет на страницу Welcome.
 */
axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		if (error?.response?.status === 401) {
			queryClient.setQueriesData(
				{
					queryKey: ['profile'],
				},
				null,
			)
		}

		return Promise.reject(error)
	},
)

export { axiosClassic, axiosWithAuth }
