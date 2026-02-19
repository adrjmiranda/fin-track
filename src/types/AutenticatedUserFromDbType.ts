export type AutenticatedUserFromDbType = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
};
