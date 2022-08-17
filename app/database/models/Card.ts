type NewCard = {
	id: string;
	last4Digits: string;
	expirationDate: string;
	createdAt: Date;
};

export default class Card extends Realm.Object {
	_id!: string;
	isActive!: boolean;
	last4Digits!: string;
	expirationDate!: string;
	createdAt!: Date;

	static generate({ id, last4Digits, expirationDate, createdAt }: NewCard) {
		return {
			_id: id,
			last4Digits,
			expirationDate,
			createdAt,
		};
	}

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
