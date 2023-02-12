export default class SharedUserInfo extends Realm.Object {
	_id!: string;
	status!: string;
	displayName?: string;
	firstName?: string;
	lastInitial?: string;
	photo?: ArrayBuffer;
	currency?: string;

	// To use a class as a Realm object type, define the object schema on the static property "schema".
	static schema = {
		primaryKey: "_id",
		name: "SharedUserInfo",
		properties: {
			_id: "string",
			displayName: "string?",
			firstName: "string?",
			lastInitial: "string?",
			photo: "data?",
			currency: "string?",
			status: "string",
		},
	};
}
