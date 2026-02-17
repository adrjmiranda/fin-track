import { useQuery } from '@tanstack/react-query';

import { ACCESS_TOKEN } from '@/constants/AuthStorage';
import { USER_ME } from '@/constants/UseQueriesKeys';
import { UserService } from '@/services/UserService';

export const useUserQueries = () => {
	const userQuery = useQuery({
		queryKey: [USER_ME],
		queryFn: UserService.getMe,
		staleTime: 1000 * 60 * 5,
		enabled: !!localStorage.getItem(ACCESS_TOKEN),
	});

	return {
		user: userQuery.data ?? null,
		isPending: userQuery.isPending,
	};
};
