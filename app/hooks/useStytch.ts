import { useQuery } from "react-query";
import axios from "axios";
import { request, gql } from "graphql-request";
import { useStore } from "../GlobalUserSettingsContext";
import { StytchError } from "stytch";

const endpoint = "http://localhost:3000/dev/graphql";
const ERROR_FIELDS = gql`
	fragment ErrorFields on StytchError {
		status_code
		error_type
		error_message
	}
`;

const otpSMS = (phone: string) => {
	return request(
		endpoint,
		gql`
			query ($phoneNumber: String) {
				loginOrCreateSMS(phoneNumber: $phoneNumber) {
					... on LoginOrCreateResponse {
						status_code
						phone_id
						email_id
						user_id
					}
					... on StytchError {
						status_code
						error_type
						error_message
					}
				}
			}
		`,
		{ phoneNumber: phone }
	);
};

export const useStytchSMS = (phone: string, enabled = true) => {
	return useQuery(
		"loginOrCreateSMS",
		async () => {
			const { loginOrCreateSMS } = await otpSMS(phone);

			//could add back button and letter user change info or be agressive and auto propel them to next screen

			return loginOrCreateSMS;
		},
		{ refetchOnWindowFocus: false, enabled }
	);
};

const otpEmail = (email: string) =>
	request(
		endpoint,
		gql`
			query ($email: String) {
				loginOrCreateEmail(email: $email) {
					... on LoginOrCreateResponse {
						status_code
						email_id
						user_id
					}
					... on StytchError {
						status_code
						error_type
						error_message
					}
				}
			}
		`,
		{ email }
	);

export const useStytchEmail = (email: string, enabled = true) => {
	return useQuery(
		"loginOrCreateEmail",
		async () => {
			const { loginOrCreateEmail } = await otpEmail(email);

			return loginOrCreateEmail;
		},
		{ refetchOnWindowFocus: false, enabled }
	);
};

const authOTP = (methodId: string, code: string) => {
	return request(
		endpoint,
		gql`
			query ($methodId: String, $code: String) {
				authenticateOTP(methodId: $methodId, code: $code) {
					... on StatusCode {
						status_code
					}
					... on StytchError {
						status_code
						error_type
						error_message
					}
				}
			}
		`,
		{ methodId, code }
	);
};

export const useAuthOTP = (
	methodId: string,
	passcode: string,
	enablingCondition: boolean
) => {
	return useQuery(
		"authenticateOTP",
		async () => {
			const { authenticateOTP } = await authOTP(methodId, passcode);

			return authenticateOTP;
		},
		{ refetchOnWindowFocus: false, enabled: enablingCondition }
	);
};
