import type React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ACCESS_TOKEN } from '@/constants/AuthStorage';
import { useUser } from '@/hooks/useUser';

type Props = {
	children?: React.ReactNode;
};

const GuestGuard = ({ children }: Props) => {
	const { user, isPending } = useUser();
	const hasAccessToken = !!localStorage.getItem(ACCESS_TOKEN);

	if (isPending && hasAccessToken) return null;

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
