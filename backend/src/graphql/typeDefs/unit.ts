import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
	type Query {
		createApplication: CreateApplicationResponse
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
		message: String
		documents: [Document]
		createdAt: String
		error: String
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
