import { useMutation } from '@tanstack/react-query';

import {
	USE_TRANSACTION_CREATE,
	USE_TRANSACTION_UPDATE,
} from '@/constants/TransactionMutationKeys';
import { TransactionService } from '@/services/TransactionService';
import type { TransactionType } from '@/types/TransactionType';

export const useTransactionMutations = () => {
	const createTransactionMutation = useMutation({
		mutationKey: [USE_TRANSACTION_CREATE],
		mutationFn: (data: TransactionType) => TransactionService.create(data),
	});

	const updateTransactionMutation = useMutation({
		mutationKey: [USE_TRANSACTION_UPDATE],
		mutationFn: ({ id, data }: { id: string; data: TransactionType }) =>
			TransactionService.update(id, data),
	});

	return { createTransactionMutation, updateTransactionMutation };
};
