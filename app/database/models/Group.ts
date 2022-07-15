import { useUser } from "@realm/react";
import "react-native-get-random-values";
import Card from "./Card";

type NewGroup = {
	name: string;
	description: string;
	usageType: string;
	initialUser: string;
	invitees: string[];
};
export default class Group extends Realm.Object {
	_id!: Realm.BSON.ObjectId;
	name!: string;
	owner!: string;
	description!: string;
	usageType!: string;
	card?: Card;
	invitees!: string[];
	members?: string[];
	groupLogo?: ArrayBuffer;
	accountID?: string;

	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static generate({
		name,
		description,
		initialUser,
		invitees,
		usageType,
	}: NewGroup) {
		return {
			_id: new Realm.BSON.ObjectId(),
			name,
			owner: initialUser,
			description,
			usageType,
			invitees,
			members: [],
			//card: new Card(),
			createdAt: new Date(),
		};
	}

	static schema = {
		name: "Group",
		primaryKey: "_id",
		properties: {
			_id: { type: "objectId", indexed: true },
			name: "string",
			owner: "string", //User ID
			description: "string",
			usageType: "string",
			invitees: "string[]",
			members: "string[]",
			accountID: "string?",
			card: "Card?",
			//	currentcy: "string",
			//	balance:"\"
			//available:""
			groupLogo: "data?",
			createdAt: "date",
		},
	};
}
