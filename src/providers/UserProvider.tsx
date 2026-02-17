import type React from 'react';

import { UserContext } from '@/contexts/UserContext';
import { useUserQueries } from '@/hooks/useUserQueries';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const { user, isPending } = useUserQueries();

	return (
		<UserContext.Provider value={{ user, isPending }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
