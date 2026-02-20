import { protectedApi } from '@/config/api';
import type { TransactionType } from '@/types/TransactionType';

export const TransactionService = {
	async create(data: TransactionType) {
		const response = await protectedApi.post(`/transactions/me`, data);
		return response.data;
	},
};
