import "react-native-get-random-values";
import { createRealmContext } from "@realm/react";
import Group from "./models/Group";
import User from "./models/User";

export { Group, User };

export default createRealmContext({
	schema: [Group, User],
	/*   sync: {
      user: app.currentUser?,
      partitionValue: "myPartition",
  }, */
	deleteRealmIfMigrationNeeded: true,
});
