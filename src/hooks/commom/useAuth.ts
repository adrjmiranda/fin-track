import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) throw new Error('authUser must be used within a AuthProvider');

	return context;
};
