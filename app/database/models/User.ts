import { Realm } from "@realm/react";
import { CountryCode } from "libphonenumber-js";
import { FullName, Address } from "@unit-finance/unit-node-sdk";

export default class User extends Realm.Object {
	_id!: string;
	stytchID!: string;
	firstName?: string;
	lastName?: string;
	displayName?: string;
	dob?: string | undefined;
	address?: string | undefined;
	phone?: string;
	email?: string;
	nationality!: CountryCode;
	uniqueVerificationNumber?: string | undefined;
	verificationType?: "ssn" | "passport" | undefined;
	photo?: ArrayBuffer;
	isActive?: boolean;
	applicationID?: string | undefined;
	customerID?: string | undefined;
	groups!: string[];
	pendingGroups!: string[];

	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static schema = {
		name: "User",
		primaryKey: "_id",
		properties: {
			_id: "string",
			stytchID: { type: "string", mapTo: "stytchID" },
			applicationID: { type: "string?", mapTo: "applicationID" },
			customerID: { type: "string?", mapTo: "customerID" },
			firstName: { type: "string?", mapTo: "firstName" },
			lastName: { type: "string?", mapTo: "lastName" },
			displayName: "string",
			dob: "string?",
			address: "string?",
			phone: "string?",
			email: "string?",
			nationality: "string",
			uniqueVerificationNumber: {
				type: "string?",
				mapTo: "uniqueVerificationNumber",
			},
			verificationType: { type: "string?", mapTo: "verificationType" },
			photo: "data?",
			isActive: { type: "bool", default: false },
			createdAt: { type: "date", default: new Date() },
			groups: "string[]", //"Group{}"
			pendingGroups: "string[]",
		},
	};

	addGroup(groupID: string) {
		this.groups?.push(groupID);
	}
}
