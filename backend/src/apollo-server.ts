import { ApolloServer } from "apollo-server-lambda";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { App as RealmApp } from "realm";
import environment from "./environment";
import { UserSchema } from "../database/schemas";

export const app = new RealmApp({ id: environment.REALM_APP_ID });
RealmApp.Sync.setLogLevel(app, "error");

const handleLogin = async () => {
	const credentials = Realm.Credentials.anonymous();
	// You can log in with any set of credentials using `app.logIn()`
	const user = await app.logIn(credentials);
	console.log(`Logged in with the user id: ${user.id}`);
};

let realm: any;
const openRealm = async () => {
	try {
		const config = {
			schema: [UserSchema],
			sync: {
				user: app.currentUser!,
				partitionValue: "My Project",
			},
			path: "stackDB/users",
		};
		realm = Realm.open(config);
	} catch (e) {
		//output.error(e);
	}
};

async function getRealm() {
	if (realm == undefined) {
		await openRealm();
	}
	return realm;
}

handleLogin().catch((err) => {
	console.error("Failed to log in:", err);
});

openRealm().catch((err) => {
	console.error("Failed to open realm:", err);
});

const apolloServer = new ApolloServer({
	resolvers,
	typeDefs,
});

export const graphqlHandler = apolloServer.createHandler();
