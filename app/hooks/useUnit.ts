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
			query (fields) {
				createApplication(fields) {
					... on UnitError {
						error
					}
					... on ApplicationResponse {
						id
						userStatus
						message
						documents {
							type
							documentType
							status
							description
						}
						createdAt
						error
					}
				}
			}
		`,
		fields
	);
};

export const useCreateApplication = (fields: ApplicationInput) => {
	return useQuery("createApplication", async () => {
		const { createApplication } = await createIndividualApplication(fields);

		return createApplication;
	});
};
