import { Realm } from "@realm/react";

export default class User extends Realm.Object {
	_id!: string;
	firstName: string | undefined;
	middleName: string | undefined;
	lastName: string | undefined;
	address: string | undefined;
	phone: string | undefined;
	email: string | undefined;
	nationality!: string;
	uniqueVerificationNumber?: string | undefined;
	verificationType?: "ssn" | "passport" | undefined;
	isActive!: boolean;
	createdAt!: Date;

	static generate(
		_id: string,
		nationality: string,
		isActive = false,
		createdAt = new Date()
	) {
		return { _id, nationality, isActive, createdAt, firstName: undefined };
	}

	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static schema = {
		name: "User",
		primaryKey: "_id",
		properties: {
			_id: "string",
			//_partition: "string",
			first_name: { type: "string?", mapTo: "firstName" },
			middle_name: { type: "string?", mapTo: "middleName" },
			last_name: { type: "string?", mapTo: "lastName" },
			dob: "string?",
			address: "string?",
			phone: "string?",
			email: "string?",
			nationality: "string",
			unique_verification_number: {
				type: "string?",
				mapTo: "uniqueVerificationNumber",
			},
			verification_type: { type: "string?", mapTo: "verificationType" },
			is_active: { type: "bool?", default: false, mapTo: "isActive" },
			created_at: "date?",
		},
	};

	get userId() {
		return this._id;
	}
}
