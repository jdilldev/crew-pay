import { useQuery } from "react-query";
import axios from "axios";
import { request, gql } from "graphql-request";

const endpoint =
	"https://jrci7wx41l.execute-api.us-east-1.amazonaws.com/dev/graphql";
const otpSMS = (phone: string) => {
	return request(
		endpoint,
		gql`
			query ($phoneNumber: String) {
				loginOrCreateSMS(phoneNumber: $phoneNumber) {
					phone_id
					email_id
					user_id
				}
			}
		`,
		{ phoneNumber: phone }
	);
};

export const useStytchSMS = (phone: string) => {
	return useQuery("loginOrCreateSMS", async () => {
		const { loginOrCreateSMS } = await otpSMS(phone);

		return loginOrCreateSMS;
	});
};

const otpEmail = () =>
	request(
		endpoint,
		gql`
			query {
				loginOrCreateEmail(email: $email) {
					phone_id
					email_id
					user_id
				}
			}
		`
	);
