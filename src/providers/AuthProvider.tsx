import type React from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/AuthStorage';
import { USER_ME } from '@/constants/UseQueriesKeys';
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthMutations } from '@/hooks/useAuthMutations';
import type { UserFromDbType } from '@/types/UserFromDbType';
import type { UserLoginType } from '@/types/UserLoginType';
import type { UserRegisterType } from '@/types/UserRegisterType';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { signUpMutation, loginMutation } = useAuthMutations();

	const queryClient = useQueryClient();

	const handleAuthSuccess = (response: UserFromDbType) => {
		const accessToken = response?.tokens?.accessToken;
		const refreshToken = response?.tokens?.refreshToken;

		if (accessToken && refreshToken) {
			localStorage.setItem(ACCESS_TOKEN, accessToken);
			localStorage.setItem(REFRESH_TOKEN, refreshToken);

			queryClient.invalidateQueries({ queryKey: [USER_ME] });
		}
	};

	const registerUser = async (data: UserRegisterType) => {
		const response = await signUpMutation.mutateAsync(data);
		handleAuthSuccess(response);
	};

	const loginUser = async (data: UserLoginType) => {
		const response = await loginMutation.mutateAsync(data);
		handleAuthSuccess(response);
	};

	return (
		<AuthContext.Provider value={{ registerUser, loginUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
