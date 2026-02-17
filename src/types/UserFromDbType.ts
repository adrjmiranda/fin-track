export type UserFromDbType = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
};
