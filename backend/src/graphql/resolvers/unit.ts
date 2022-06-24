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

export const resolvers = {
	Query: {
		createApplication: async () => {
			const individalApplicationRequest: CreateIndividualApplicationRequest = {
				type: "individualApplication",
				attributes: {
					ssn: "000000000",
					fullName: unit.helpers.createFullName("Zoe", "Landon"),
					dateOfBirth: "2001-08-10",
					address: unit.helpers.createAddress(
						"123 Best Kids St",
						null,
						"Nottingham",
						"MD",
						"21236",
						"US"
					),
					email: "tester@testing.com",
					phone: unit.helpers.createPhone("1", "5555555555"),
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
