import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
	type Query {
		loginOrCreateSMS(phoneNumber: String): OTPResponse
		loginOrCreateEmail(email: String): OTPResponse
		authenticateOTP(methodId: String, code: String): AuthenticateResponse
	}

	enum AuthType {
		PHONE
		EMAIL
	}

	union AuthenticateResponse = StatusCode | StytchError
	union OTPResponse = LoginOrCreateResponse | StytchError

	type LoginOrCreateResponse {
		status_code: Int
		phone_id: String
		email_id: String
		user_id: String!
	}

	type StatusCode {
		status_code: Int
		session_token: String
	}

	type StytchError {
		status_code: Int
		error_type: String
		error_message: String
	}

	type StytchUser {
		user_id: String!
		authType: AuthType!
		phone_numbers: [StytchPhoneNumber]
		email: StytchEmail
		providers: [StytchOAuth]
	}

	type StytchEmail {
		email_id: String
		email: String
		verified: Boolean
	}

	type StytchPhoneNumber {
		phone_id: String
		phone_number: String
		verified: Boolean
	}

	type StytchOAuth {
		provider_subject: String
		proivider_type: String
		profile_picture_url: String
		locale: String
	}
`;
