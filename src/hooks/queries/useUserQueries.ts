import { useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { ACCESS_TOKEN } from '@/constants/AuthStorageKeys';
import { USER_BALANCE, USER_ME } from '@/constants/UseQueriesKeys';
import { UserService } from '@/services/UserService';

export const useUserQueries = () => {
	const [searchParams] = useSearchParams();

	const from = searchParams.get('from') ?? '';
	const to = searchParams.get('to') ?? '';

	const userQuery = useQuery({
		queryKey: [USER_ME],
		queryFn: UserService.getMe,
		staleTime: 1000 * 60 * 5,
		enabled: !!localStorage.getItem(ACCESS_TOKEN),
	});

	const balanceQuery = useQuery({
		queryKey: [USER_BALANCE, userQuery.data?.id, from, to],
		queryFn: () => UserService.getBalance({ from, to }),
		staleTime: 1000 * 60 * 5,
		enabled: !!localStorage.getItem(ACCESS_TOKEN),
	});

	return {
		user: userQuery.data ?? null,
		isPending: userQuery.isPending,
		balance: balanceQuery.data ?? null,
		balanceIsPending: balanceQuery.isPending,
	};
};
