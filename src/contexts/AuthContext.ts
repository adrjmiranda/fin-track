import { createContext } from 'react';

import type { UserRegisterType } from '@/types/UserRegisterType';

type AuthContextData = {
	registerUser: (data: UserRegisterType) => Promise<void>;
};

export const AuthContext = createContext<AuthContextData | null>(null);
