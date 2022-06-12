import RealmContext from "../index";
import User from "../models/User";

const { useRealm } = RealmContext;

export const addUser = ({
	_id,
	nationality,
}: {
	_id: string;
	nationality: string;
}) => {
	const realm = useRealm();

	realm.write(() => {
		realm.create("User", User.generate(_id, nationality));
	});
};

export const getUser = (_id: string) => {
	const user = 'objectForPrimaryKey("User", _id)?.toJSON()';
	console.log(user);

	return user;
};
