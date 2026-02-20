import type React from 'react';

import { UserContext } from '@/contexts/UserContext';
import { useUserQueries } from '@/hooks/queries/useUserQueries';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const { user, isPending, balance, balanceIsPending } = useUserQueries();

	return (
		<UserContext.Provider
			value={{ user, isPending, balance, balanceIsPending }}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
