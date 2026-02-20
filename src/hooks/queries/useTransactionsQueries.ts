import { useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { USER_TRANSACTIONS } from '@/constants/TransactionsQueriesKeys';
import { TransactionService } from '@/services/TransactionService';

import { useUser } from '../commom/useUser';

export const useTransactionsQueries = () => {
	const { user } = useUser();

	const [searchParams] = useSearchParams();

	const from = searchParams.get('from') ?? '';
	const to = searchParams.get('to') ?? '';

	const transactionsQuery = useQuery({
		queryKey: [USER_TRANSACTIONS, user?.id, from, to],
		queryFn: () => TransactionService.getTransactions({ from, to }),
		enabled: !!user?.id && !!from && !!to,
	});

	return {
		transactions: transactionsQuery.data,
		isTransactionsLoading: transactionsQuery.isLoading,
	};
};
