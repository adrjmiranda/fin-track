import { useMutation } from '@tanstack/react-query';

import { USE_AUTH_SIGN_UP } from '@/constants/AuthMutationsKeys';
import { UserService } from '@/services/UserService';
import type { UserRegisterType } from '@/types/UserRegisterType';

export const useAuthMutations = () => {
	const signUpMutation = useMutation({
		mutationKey: [USE_AUTH_SIGN_UP],
		mutationFn: (data: UserRegisterType) => UserService.create(data),
	});

	return {
		signUpMutation,
	};
};
