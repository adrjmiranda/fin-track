import api from '@/config/api';
import type { UserRegisterType } from '@/types/UserRegisterType';

export const UserService = {
	async create({ firstName, lastName, email, password }: UserRegisterType) {
		const response = await api.post('/users', {
			first_name: firstName,
			last_name: lastName,
			email,
			password,
		});

		return response.data;
	},

	async getMe() {
		const response = await api.get('/users/me');
		return response.data;
	},
};
