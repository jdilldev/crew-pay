import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
	type Query {
		createApplication(
			firstName: String
			lastName: String
			countryCallingCode: String
			phoneNumber: String
			email: String
			dob: String
			idType: String
			idNumber: String
			street1: String
			street2: String
			city: String
			postalCode: String
			nationality: String
		): CreateApplicationResponse
		createDepositAccount: String
		createApplicationForm: String
		createCard: Int
	}

	union CreateApplicationResponse = ApplicationResponse | UnitError

	type UnitError {
		error: String
	}

	type ApplicationResponse {
		id: String
		userStatus: String
		documents: [Document]
		createdAt: String
	}

	type ApplicationFormResponse {
		id: String
		url: String
	}

	type Document {
		type: String
		documentType: String
		status: String
		description: String
	}

	type CardResponse {
		status_code: Int
	}
`;
