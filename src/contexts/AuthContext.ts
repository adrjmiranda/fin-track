import { createContext } from 'react';

import type { UserLoginType } from '@/types/UserLoginType';
import type { UserRegisterType } from '@/types/UserRegisterType';

type AuthContextData = {
	registerUser: (data: UserRegisterType) => Promise<void>;
	loginUser: (data: UserLoginType) => Promise<void>;
	logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextData | null>(null);
