import * as z from 'zod';

export const createTransactionSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório'),
	amount: z.number().positive('Valor deve ser maior que 0'),
	date: z.date(),
	type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT']),
});
