import { typeDefs as stytchTypeDefs } from "./stytch";
import { typeDefs as customTypeDefs } from "./shared";

/* const baseTypeDef = gql`
	type Query {
		_empty: String
	}
`; */

export default [stytchTypeDefs, customTypeDefs];
