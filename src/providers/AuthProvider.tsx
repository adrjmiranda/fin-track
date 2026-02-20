import type React from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/AuthStorageKeys';
import { USER_ME } from '@/constants/UseQueriesKeys';
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthMutations } from '@/hooks/mutations/useAuthMutations';
import type { AutenticatedUserFromDbType } from '@/types/AutenticatedUserFromDbType';
import type { UserLoginType } from '@/types/UserLoginType';
import type { UserRegisterType } from '@/types/UserRegisterType';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { signUpMutation, signInMutation } = useAuthMutations();

	const queryClient = useQueryClient();

	const handleAuthSuccess = (response: AutenticatedUserFromDbType) => {
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
		const response = await signInMutation.mutateAsync(data);
		handleAuthSuccess(response);
	};

	const logoutUser = () => {
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFRESH_TOKEN);

		queryClient.setQueryData([USER_ME], null);
		queryClient.clear();
	};

	return (
		<AuthContext.Provider value={{ registerUser, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
