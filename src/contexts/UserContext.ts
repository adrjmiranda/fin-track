import { createContext } from 'react';

import type { AutenticatedUserFromDbType } from '@/types/AutenticatedAutenticatedUserFromDbType';

type UserContextData = {
	user: AutenticatedUserFromDbType | null;
	isPending: boolean;
};

export const UserContext = createContext<UserContextData | null>(null);
