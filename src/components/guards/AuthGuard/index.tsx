import type React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import LoadingScreen from '@/components/common/LoadingScreen';
import { ACCESS_TOKEN } from '@/constants/AuthStorageKeys';
import { useUser } from '@/hooks/commom/useUser';

type Props = {
	children?: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
	const { user, isPending } = useUser();

	const hasAccessToken = !!localStorage.getItem(ACCESS_TOKEN);

	if (!hasAccessToken)
		return (
			<Navigate
				to='/login'
				replace
			/>
		);

	if (isPending) return <LoadingScreen />;

	if (!user) return <Navigate to='/login' />;

	return children ? <>{children}</> : <Outlet />;
};

export default AuthGuard;
