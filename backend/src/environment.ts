type Environment = {
	STYTCH_PROJECT_ID: string;
	STYTCH_SECRET: string;
	REALM_APP_ID: string;
	UNIT_TOKEN: string;
	ENVRIONMENT: string;
	UNIT_API_URL: string;
};

export default {
	STYTCH_PROJECT_ID: String(process.env.STYTCH_PROJECT_ID),
	STYTCH_SECRET: String(process.env.STYTCH_SECRET),
	REALM_APP_ID: String(process.env.REALM_APP_ID),
	UNIT_TOKEN: String(process.env.UNIT_TOKEN),
	UNIT_API_URL:
		String(process.env.ENVIRONMENT) === "dev"
			? String(process.env.UNIT_SANDBOX_URL)
			: String(process.env.UNIT_LIVE_URL),
} as Environment;
