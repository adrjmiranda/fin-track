import { useMutation } from '@tanstack/react-query';

import { USE_TRANSACTION_CREATE } from '@/constants/TransactionMutationKeys';
import { TransactionService } from '@/services/TransactionService';
import type { TransactionType } from '@/types/TransactionType';

export const useTransactionMutations = () => {
	const createTransactionMutation = useMutation({
		mutationKey: [USE_TRANSACTION_CREATE],
		mutationFn: (data: TransactionType) => TransactionService.create(data),
	});

	return { createTransactionMutation };
};
