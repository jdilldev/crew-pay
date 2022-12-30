import { createRealmContext } from "@realm/react";
import Group from "./models/Group";
import User from "./models/User";
import Card from "./models/Card";
import Transaction from "./models/Transaction";
import SharedUserInfo from "./models/SharedUserinfo";

export { Group, User, SharedUserInfo, Card, Transaction };
export const APP_ID = "application-0-rardp";

export default createRealmContext({
	schema: [Group, User, SharedUserInfo, Card, Transaction],
	deleteRealmIfMigrationNeeded: true,
});
