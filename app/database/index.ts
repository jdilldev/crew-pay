import "react-native-get-random-values";
import { createRealmContext } from "@realm/react";
import Group from "./models/Group";
import User from "./models/User";
import Card from "./models/Card";
import Transaction from "./models/Transaction";

export { Group, User, Card, Transaction };
export const APP_ID = "application-0-rardp";

export default createRealmContext({
	schema: [Group, User, Card, Transaction],
});
