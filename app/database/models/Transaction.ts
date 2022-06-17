export default class Transaction extends Realm.Object {
	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static schema = {
		name: "Transaction",
		embedded: true,
		properties: {
			card: {
				type: "linkingObjects",
				objectType: "Card",
				property: "transactions",
			},
			merchant: "string",
			amount: "double",
			transaction_date: "date",
		},
	};
}
