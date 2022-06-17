export default class Card extends Realm.Object {
	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static schema = {
		name: "Card",
		embedded: true,
		properties: {
			group_name: {
				type: "linkingObjects",
				objectType: "Group",
				property: "card",
			},
			transactions: "Transaction[]",
			description: "string",
			createdAt: "date",
		},
	};
}
