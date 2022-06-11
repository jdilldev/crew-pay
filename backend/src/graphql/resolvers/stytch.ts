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

type LoginOrCreateResponse = {
	phone_id?: string;
	email_id?: string;
	user_id: string;
};

type AuthenticateArgs = {
	methodId: string;
	code: string;
};

type AuthenticateResponse = {
	status_code: number;
	error_message?: string;
	error_type?: string;
};

export const resolvers = {
	Query: {
		loginOrCreateSMS: async (
			_: undefined,
			args: LoginOrCreateArgs
		): Promise<LoginOrCreateResponse> => {
			console.log(args);
			const { phone_id, user_id } = await stytch_client.otps.sms.loginOrCreate({
				phone_number: "+10000000000",
			});
			return { phone_id, user_id };
		},
		loginOrCreateEmail: async (
			_: undefined,
			{ email }: LoginOrCreateArgs
		): Promise<LoginOrCreateResponse> => {
			const { email_id, user_id } =
				await stytch_client.otps.email.loginOrCreate({
					email: email || "",
				});
			return { email_id, user_id };
		},
		authenticateOTP: async (
			_: undefined,
			{ methodId, code }: AuthenticateArgs
		): Promise<AuthenticateResponse> => {
			try {
				const { user, status_code } = await stytch_client.otps.authenticate({
					method_id: "phone-number-test-98cfbe19-6c8f-4b8b-b62a-e78a5a7bdff3",
					code: "000000",
				});

				return { status_code };
			} catch (err) {
				const { error_message, error_type, status_code } = err as StytchError;
				return { error_message, error_type, status_code };
			}
		},
	},
	AuthenticateResponse: {
		__resolveType: (obj: { status_code: number }): string => {
			if (obj.status_code === 200) {
				return "StatusCode";
			} else {
				return "StytchError";
			}
		},
	},
};
