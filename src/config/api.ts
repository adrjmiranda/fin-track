import axios from 'axios';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/AuthStorageKeys';

const protectedApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

const publicApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

protectedApi.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN);

		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

protectedApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status !== 401 || originalRequest._retry) {
			return Promise.reject(error);
		}

		const refreshToken = localStorage.getItem(REFRESH_TOKEN);

		if (!refreshToken) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			const response = await publicApi.post('/users/refresh-token', {
				refreshToken,
			});

			const { accessToken, refreshToken: newRefreshToken } = response.data;

			localStorage.setItem(ACCESS_TOKEN, accessToken);
			localStorage.setItem(REFRESH_TOKEN, newRefreshToken);

			originalRequest.headers.Authorization = `Bearer ${accessToken}`;

			return protectedApi(originalRequest);
		} catch (refreshError) {
			localStorage.removeItem(ACCESS_TOKEN);
			localStorage.removeItem(REFRESH_TOKEN);

			window.location.href = '/login';

			return Promise.reject(refreshError);
		}
	},
);

export { protectedApi, publicApi };
