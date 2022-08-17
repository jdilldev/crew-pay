import { useUser } from "@realm/react";
import "react-native-get-random-values";
import Card from "./Card";

type NewGroup = {
	name: string;
	description: string;
	usageType: string;
	initialUser: string;
	initialMembers: string[];
};
export default class Group extends Realm.Object {
	_id!: Realm.BSON.ObjectId;
	isActive!: boolean;
	name!: string;
	owner!: string;
	description!: string;
	usageType!: string;
	members!: string[];
	card?: Card;
	groupLogo?: ArrayBuffer;
	depositAccountId?: string;
	accountNumber?: string;
	routingNumber?: string;
	balance?: number;
	hold?: number;
	available?: number;

	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static generate({
		name,
		description,
		initialUser,
		initialMembers,
		usageType,
	}: NewGroup) {
		return {
			_id: new Realm.BSON.ObjectId(),
			isActive: false,
			name,
			owner: initialUser,
			description,
			usageType,
			members: [...initialMembers, initialUser],
			//card: new Card(),
			createdAt: new Date(),
		};
	}

	static schema = {
		name: "Group",
		primaryKey: "_id",
		properties: {
			_id: { type: "objectId", indexed: true },
			isActive: "bool",
			name: "string",
			owner: "string", //User ID
			description: "string",
			usageType: "string",
			members: "string[]",
			depositAccountId: "string?",
			accountNumber: "string?",
			routingNumber: "string?",
			balance: "int?",
			hold: "int?",
			available: "int?",
			card: "Card?",
			//	currency: "string",
			groupLogo: "data?",
			createdAt: "date",
		},
	};
}
