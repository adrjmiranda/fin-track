import { createContext } from 'react';

import type { UserFromDbType } from '@/types/UserFromDbType';

type UserContextData = {
	user: UserFromDbType | null;
	isPending: boolean;
};

export const UserContext = createContext<UserContextData | null>(null);
