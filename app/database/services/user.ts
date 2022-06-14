import { useStore } from "../../GlobalUserSettingsContext";
import RealmContext from "../index";

const { useRealm } = RealmContext;

export const addUser = ({
	_id,
	nationality,
	phone,
	email,
}: {
	_id: string;
	nationality: string;
	phone?: string;
	email?: string;
}) => {
	const realm = useRealm();

	try {
		realm.write(() => {
			realm.create("User", { _id, nationality, phone, email });
		});
	} catch (err) {
		console.log("Error creating User: " + err);
	}
};

export const getUser = (_id: string) => {
	const user = 'objectForPrimaryKey("User", _id)?.toJSON()';
	console.log(user);

	return user;
};
