import { useQuery } from "react-query";
import axios from "axios";
import { request, gql } from "graphql-request";
import { useStore } from "../GlobalUserSettingsContext";
import { StytchError } from "stytch";
import { ApplicationInput } from "../types";

const endpoint = "http://localhost:3000/dev/graphql";

//TODO destructure fields
const createIndividualApplication = (fields: ApplicationInput) => {
	return request(
		endpoint,
		gql`
			query (
				$firstName: String
				$lastName: String
				$countryCallingCode: String
				$phoneNumber: String
				$email: String
				$dob: String
				$idType: String
				$idNumber: String
				$street1: String
				$street2: String
				$city: String
				$postalCode: String
				$nationality: String
			) {
				createApplication(
					firstName: $firstName
					lastName: $lastName
					countryCallingCode: $countryCallingCode
					phoneNumber: $phoneNumber
					email: $email
					dob: $dob
					idType: $idType
					idNumber: $idNumber
					street1: $street1
					street2: $street2
					city: $city
					postalCode: $postalCode
					nationality: $nationality
				) {
					... on ApplicationResponse {
						id
						userStatus
						documents {
							type
							documentType
							status
							description
						}
						createdAt
					}
					... on UnitError {
						error
					}
				}
			}
		`,
		{
			firstName: fields.firstName,
			lastName: fields.lastName,
			countryCallingCode: fields.countryCallingCode,
			phoneNumber: fields.phoneNumber,
			email: fields.email,
			dob: fields.dob,
			idType: fields.idType,
			idNumber: fields.idNumber,
			street1: fields.street1,
			street2: fields.street2,
			city: fields.city,
			postalCode: fields.postalCode,
			nationality: fields.nationality,
		}
	);
};

export const useCreateApplication = (fields: ApplicationInput) => {
	const createApplication = async () => {
		const res = await createIndividualApplication(fields);

		return res;
	};
	return createApplication();
};

const getApplicationStatusByID = (id: string) => {
	return request(
		endpoint,
		gql`
			query ($applicationId: String) {
				getApplicationStatus(applicationId: $applicationId)
			}
		`,
		{ applicationId: id }
	);
};

export const useGetApplicationByID = (id: string) => {
	return useQuery("getApplicationStatus", async () => {
		const { getApplicationStatus } = await getApplicationStatusByID(id);

		return getApplicationStatus;
	});
};
