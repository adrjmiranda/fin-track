import type React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ACCESS_TOKEN } from '@/constants/AuthStorage';
import { useUser } from '@/hooks/useUser';

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

	if (isPending) return <>Loading...</>;

	if (!user) return <Navigate to='/login' />;

	return children ? <>{children}</> : <Outlet />;
};

export default AuthGuard;
