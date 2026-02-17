import type React from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/AuthStorage';
import { USER_ME } from '@/constants/UseQueriesKeys';
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthMutations } from '@/hooks/useAuthMutations';
import type { UserRegisterType } from '@/types/UserRegisterType';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { signUpMutation } = useAuthMutations();

	const queryClient = useQueryClient();

	const registerUser = async (data: UserRegisterType) => {
		const response = await signUpMutation.mutateAsync(data);

		if (response?.tokens?.accessToken && response?.tokens?.refreshToken) {
			localStorage.setItem(ACCESS_TOKEN, response.tokens.accessToken);
			localStorage.setItem(REFRESH_TOKEN, response.tokens.refreshToken);

			queryClient.invalidateQueries({ queryKey: [USER_ME] });
		}
	};

	return (
		<AuthContext.Provider value={{ registerUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
