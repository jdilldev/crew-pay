import "react-native-get-random-values";
import Card from "./Card";

export default class Group extends Realm.Object {
	_id!: Realm.BSON.ObjectId;
	name!: string;
	description!: string;
	card?: Card;
	members?: string[];
	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static generate(name: string, description: string, initialUser: string) {
		return {
			_id: new Realm.BSON.ObjectId(),
			name,
			members: [initialUser],
			description,
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
			card: "Card?",
			members: "string[]",
			//	currentcy: "string",
			//	balance:"\"
			//available:""
			description: "string",
			createdAt: "date",
		},
	};
}
