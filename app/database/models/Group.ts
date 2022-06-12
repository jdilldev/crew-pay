export default class Group extends Realm.Object {
	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static schema = {
		name: "Group",
		primaryKey: "_id",
		properties: {
			_id: "objectId",
			name: "string",
			description: "string",
			isComplete: { type: "bool", default: false },
			// createdAt: "date",
		},
	};
}
