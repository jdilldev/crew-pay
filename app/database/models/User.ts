import { Realm } from "@realm/react";
import Group from "./Group";

export default class User extends Realm.Object {
	_id!: string;
	_stytchID!: string;
	_firstName?: string;
	_lastName?: string;
	_dob?: string | undefined;
	_address?: string | undefined;
	_phone?: string | undefined;
	_email?: string | undefined;
	_nationality!: string;
	_uniqueVerificationNumber?: string | undefined;
	_verificationType?: "ssn" | "passport" | undefined;
	photo?: ArrayBuffer;
	_isActive?: boolean;
	_createdAt?: Date;
	_applicationID?: string;
	_customerID?: string;
	groups?: string[];

	static generate(
		_id: string,
		stytchID: string,
		nationality: string,
		phone?: string,
		email?: string
	) {
		return {
			_id,
			stytchID,
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
			stytchID: "string",
			applicationID: "string?",
			customerID: "string?",
			first_name: { type: "string?", mapTo: "firstName" },
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
			photo: "data?",
			isActive: { type: "bool", default: false },
			createdAt: { type: "date", default: new Date() },
			groups: "string[]", //"Group{}"
		},
	};

	addGroup(groupID: string) {
		this.groups = this.groups ? [...this.groups, groupID] : [groupID];
	}

	get id() {
		return this._id;
	}

	set stytchID(stytchID: string) {
		this.applicationID = stytchID;
	}

	set applicationID(applicationID: string) {
		this.applicationID = applicationID;
	}

	set customerID(customerID: string) {
		this.applicationID = customerID;
	}

	set firstName(name: string) {
		this._firstName = name;
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
