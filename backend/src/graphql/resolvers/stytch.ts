import * as stytch from "stytch";
import dotenv from "dotenv";
import { SendOTPBySMSResponse } from "stytch/types/lib/otps";
import { StytchError } from "stytch";
import environment from "../../environment";
//load environment variables
dotenv.config();

const stytch_client = new stytch.Client({
	project_id: environment.STYTCH_PROJECT_ID,
	secret: environment.STYTCH_SECRET,
	env: stytch.envs.test,
});

type LoginOrCreateArgs = {
	phoneNumber?: string;
	email?: string;
};

type AuthenticateArgs = {
	methodId: string;
	code: string;
	sessionToken?: string;
};

export const resolvers = {
	Query: {
		loginOrCreateSMS: async (
			_: undefined,
			{ phoneNumber }: LoginOrCreateArgs
		) => {
			try {
				const { phone_id, user_id, status_code } =
					await stytch_client.otps.sms.loginOrCreate({
						phone_number: phoneNumber,
						create_user_as_pending: true,
					});

				return { phone_id, user_id, status_code };
			} catch (err) {
				const { error_message, error_type, status_code } = err as StytchError;
				return { error_message, error_type, status_code };
			}
		},
		loginOrCreateEmail: async (_: undefined, { email }: LoginOrCreateArgs) => {
			try {
				const { email_id, user_id, status_code } =
					await stytch_client.otps.email.loginOrCreate({
						email: email,
						create_user_as_pending: true,
					});

				return { email_id, user_id, status_code };
			} catch (err) {
				const { error_message, error_type, status_code } = err as StytchError;
				return { error_message, error_type, status_code };
			}
		},
		authenticateOTP: async (
			_: undefined,
			{ methodId, code, sessionToken }: AuthenticateArgs
		) => {
			try {
				const { status_code, session_token, session } = sessionToken
					? await stytch_client.otps.authenticate({
							method_id: methodId,
							code: code,
							session_duration_minutes: 43200,
							session_token: sessionToken,
					  })
					: await stytch_client.otps.authenticate({
							method_id: methodId,
							code: code,
							session_duration_minutes: 43200,
					  });

				return { status_code, session_token }; //todo: add session
			} catch (err) {
				const { error_message, error_type, status_code } = err as StytchError;
				return { error_message, error_type, status_code };
			}
		},
	},
	AuthenticateResponse: {
		__resolveType: (obj: { status_code: number }) => {
			if (obj.status_code === 200) {
				return "StatusCode";
			} else {
				return "StytchError";
			}
		},
	},
	OTPResponse: {
		__resolveType: (obj: { status_code: number }) => {
			if (obj.status_code === 200) {
				return "LoginOrCreateResponse";
			} else {
				return "StytchError";
			}
		},
	},
};
