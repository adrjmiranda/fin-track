import type React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import LoadingScreen from '@/components/common/LoadingScreen';
import { ACCESS_TOKEN } from '@/constants/AuthStorageKeys';
import { useUser } from '@/hooks/commom/useUser';

type Props = {
	children?: React.ReactNode;
};

const GuestGuard = ({ children }: Props) => {
	const { user, isPending } = useUser();
	const hasAccessToken = !!localStorage.getItem(ACCESS_TOKEN);

	if (isPending && hasAccessToken) return <LoadingScreen />;

	if (user && hasAccessToken)
		return (
			<Navigate
				to='/'
				replace
			/>
		);

	return children ? <>{children}</> : <Outlet />;
};

export default GuestGuard;
