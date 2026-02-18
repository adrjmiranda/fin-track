import { useMutation } from '@tanstack/react-query';

import {
	USE_AUTH_LOGIN,
	USE_AUTH_SIGN_UP,
} from '@/constants/AuthMutationsKeys';
import { UserService } from '@/services/UserService';
import type { UserLoginType } from '@/types/UserLoginType';
import type { UserRegisterType } from '@/types/UserRegisterType';

export const useAuthMutations = () => {
	const signUpMutation = useMutation({
		mutationKey: [USE_AUTH_SIGN_UP],
		mutationFn: (data: UserRegisterType) => UserService.create(data),
	});

	const loginMutation = useMutation({
		mutationKey: [USE_AUTH_LOGIN],
		mutationFn: (data: UserLoginType) => UserService.login(data),
	});

	return {
		signUpMutation,
		loginMutation,
	};
};
