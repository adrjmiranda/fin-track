import type { ISOStringFormat } from 'date-fns';

export type TransactionFromDbType = {
	id: string;
	user_id: string;
	date: ISOStringFormat;
	name: string;
	type: 'EARNING' | 'EXPENSE' | 'INVESTMENT';
	amount: string;
};
