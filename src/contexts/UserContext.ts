import { createContext } from 'react';

import type { AutenticatedUserFromDbType } from '@/types/AutenticatedUserFromDbType';
import type { BalanceType } from '@/types/BalanceType';

type UserContextData = {
	user: AutenticatedUserFromDbType | null;
	isPending: boolean;
	balance: BalanceType | null;
	balanceIsPending: boolean;
};

export const UserContext = createContext<UserContextData | null>(null);
