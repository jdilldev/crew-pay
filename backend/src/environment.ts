type Environment = {
	STYTCH_PROJECT_ID: string;
	STYTCH_SECRET: string;
	REALM_APP_ID: string;
};

export default {
	STYTCH_PROJECT_ID: String(process.env.STYTCH_PROJECT_ID),
	STYTCH_SECRET: String(process.env.STYTCH_SECRET),
	REALM_APP_ID: String(process.env.REALM_APP_ID),
} as Environment;
