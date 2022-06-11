import { ObjectID } from "bson";

type User = {
	_id: ObjectID;
	_partition?: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dob: Date;
	status: "pending" | "denied" | "active";
};

export const UserSchema = {
	name: "User",
	properties: {
		_id: "objectId",
		_partition: "string?",
		firstName: "string",
		middleName: "string",
		lastName: "string",
		dob: "Date",
		status: "string",
	},
	primaryKey: "_id",
};
