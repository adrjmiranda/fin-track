import { protectedApi } from '@/config/api';
import type { TransactionType } from '@/types/TransactionType';

export const TransactionService = {
	async create(data: TransactionType) {
		const response = await protectedApi.post(`/transactions/me`, data);
		return response.data;
	},

	async getTransactions({ from, to }: { from: string; to: string }) {
		const response = await protectedApi.get(
			`/transactions/me/?from=${from}&to=${to}`,
		);
		return response.data;
	},

	async update(id: string, data: TransactionType) {
		const response = await protectedApi.patch(`/transactions/me/${id}`, data);
		return response.data;
	},
};
