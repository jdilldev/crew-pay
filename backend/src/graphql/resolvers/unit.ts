import {
	Unit,
	UnitError,
	CreateIndividualApplicationRequest,
	CreateApplicationFormResponse,
	CreateApplicationFormRequest,
	ApplicationDocument,
	extractUnitError,
} from "@unit-finance/unit-node-sdk";
import dotenv from "dotenv";
import environment from "../../environment";
//load environment variables
dotenv.config();

const unit = new Unit(environment.UNIT_TOKEN, environment.UNIT_API_URL);

type ApplicationArgs = {
	firstName: string;
	lastName: string;
	countryCallingCode: string;
	phoneNumber: string;
	email: string;
	dob: string;
	idType: string;
	idNumber: string;
	street1: string;
	street2: string;
	city: string;
	postalCode: string;
	nationality: string;
};

export const resolvers = {
	Query: {
		createApplication: async (
			_: undefined,
			{
				firstName,
				lastName,
				countryCallingCode,
				phoneNumber,
				email,
				dob,
				idType,
				idNumber,
				street1,
				street2,
				city,
				postalCode,
				nationality,
			}: ApplicationArgs
		) => {
			const individalApplicationRequest: CreateIndividualApplicationRequest = {
				type: "individualApplication",
				attributes: {
					...(idType === "ssn" && { ssn: idNumber }),
					...(idType === "passport" && { passport: idNumber }),
					fullName: unit.helpers.createFullName(firstName, lastName),
					dateOfBirth: dob,
					address: unit.helpers.createAddress(
						street1,
						street2,
						city,
						"MD",
						postalCode,
						nationality
					),
					email: email,
					phone: unit.helpers.createPhone(countryCallingCode, phoneNumber),
				},
			};

			try {
				const { data, included } = await unit.applications.create(
					individalApplicationRequest
				);

				if (data) {
					const {
						id,
						attributes: { createdAt, status },
					} = data;

					const documents = included.map((document: ApplicationDocument) => {
						const {
							type,
							attributes: { documentType, status, description },
						} = document;
						//potentially match on documentType and reference doc info (i.e. address or DOB)
						if (type === "document")
							return { documentType, status, description };
					});
					//waiting for message to be added to Interface
					return { id, userStatus: status, documents, createdAt };
				}
			} catch (err) {
				if (err.isUnitError) {
					const e = extractUnitError(err.underlying);
					return { error: e.message };
				}
				return { error: err };
			}
		},
		createApplicationForm: async () => {
			try {
				const applicationFormRequest: CreateApplicationFormRequest = {
					type: "applicationForm",
					attributes: {
						allowedApplicationTypes: ["Individual"],
					},
				};
				const { data } = await unit.applicationForms.create(
					applicationFormRequest
				);
				const {
					id,
					attributes: { url }, //stage is not in sdk yet
				} = data;

				return { id, url };
			} catch (err) {
				console.log(err);
			}
		},
		createDepositAccount: () => "ZoeLandon",
		createCard: () => 1000000000,
	},
	CreateApplicationResponse: {
		__resolveType: (obj: { error?: string }) => {
			return obj.error ? "UnitError" : "ApplicationResponse";
		},
	},
};
