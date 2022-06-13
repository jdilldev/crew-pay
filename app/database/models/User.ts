import { Realm } from "@realm/react";

export default class User extends Realm.Object {
	_id!: string;
	_firstName: string | undefined;
	_middleName: string | undefined;
	_lastName: string | undefined;
	_dob: string | undefined;
	_address: string | undefined;
	_phone: string | undefined;
	_email: string | undefined;
	_nationality!: string;
	_uniqueVerificationNumber?: string | undefined;
	_verificationType?: "ssn" | "passport" | undefined;
	_isActive?: boolean;
	_createdAt?: Date;

	static generate(
		_id: string,
		nationality: string,
		phone?: string,
		email?: string
	) {
		return {
			_id,
			nationality,
			phone,
			email,
		};
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
			isActive: { type: "bool", default: false },
			createdAt: { type: "date", default: new Date() },
		},
	};

	get id() {
		return this._id;
	}

	set firstName(name: string) {
		this._firstName = name;
	}

	set middleName(name: string) {
		this._middleName = name;
	}

	set lastName(name: string) {
		this._lastName = name;
	}

	set dob(dob: string) {
		this._dob = dob;
	}

	set address(address: string) {
		this._address = address;
	}
}
