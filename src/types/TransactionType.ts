export type TransactionType = {
	name: string;
	type: 'EARNING' | 'EXPENSE' | 'INVESTMENT';
	date: string;
	amount: number;
};
