/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apollo-server.ts":
/*!******************************!*\
  !*** ./src/apollo-server.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.graphqlHandler = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const resolvers_1 = __importDefault(__webpack_require__(/*! ./graphql/resolvers */ "./src/graphql/resolvers/index.ts"));
const typeDefs_1 = __importDefault(__webpack_require__(/*! ./graphql/typeDefs */ "./src/graphql/typeDefs/index.ts"));
const apolloServer = new apollo_server_lambda_1.ApolloServer({
    resolvers: resolvers_1.default,
    typeDefs: typeDefs_1.default,
});
exports.graphqlHandler = apolloServer.createHandler();


/***/ }),

/***/ "./src/environment.ts":
/*!****************************!*\
  !*** ./src/environment.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    STYTCH_PROJECT_ID: String(process.env.STYTCH_PROJECT_ID),
    STYTCH_SECRET: String(process.env.STYTCH_SECRET),
};


/***/ }),

/***/ "./src/graphql/resolvers/index.ts":
/*!****************************************!*\
  !*** ./src/graphql/resolvers/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stytch_1 = __webpack_require__(/*! ./stytch */ "./src/graphql/resolvers/stytch.ts");
const unit_1 = __webpack_require__(/*! ./unit */ "./src/graphql/resolvers/unit.ts");
exports["default"] = [unit_1.resolvers, stytch_1.resolvers];


/***/ }),

/***/ "./src/graphql/resolvers/stytch.ts":
/*!*****************************************!*\
  !*** ./src/graphql/resolvers/stytch.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvers = void 0;
const stytch = __importStar(__webpack_require__(/*! stytch */ "../../node_modules/stytch/dist/index.js"));
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
const environment_1 = __importDefault(__webpack_require__(/*! ../../environment */ "./src/environment.ts"));
dotenv_1.default.config();
const stytch_client = new stytch.Client({
    project_id: environment_1.default.STYTCH_PROJECT_ID,
    secret: environment_1.default.STYTCH_SECRET,
    env: stytch.envs.test,
});
exports.resolvers = {
    Query: {
        loginOrCreateSMS: (_, { phoneNumber }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(phoneNumber);
            const { phone_id, user_id } = yield stytch_client.otps.sms.loginOrCreate({
                phone_number: "+10000000000",
            });
            return { phone_id, user_id };
        }),
        loginOrCreateEmail: (_, { email }) => __awaiter(void 0, void 0, void 0, function* () {
            const { email_id, user_id } = yield stytch_client.otps.email.loginOrCreate({
                email: email || "",
            });
            return { email_id, user_id };
        }),
        authenticateOTP: (_, { methodId, code }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { user, status_code } = yield stytch_client.otps.authenticate({
                    method_id: "phone-number-test-98cfbe19-6c8f-4b8b-b62a-e78a5a7bdff3",
                    code: "000000",
                });
                return { status_code };
            }
            catch (err) {
                const { error_message, error_type, status_code } = err;
                return { error_message, error_type, status_code };
            }
        }),
    },
    AuthenticateResponse: {
        __resolveType: (obj) => {
            if (obj.status_code === 200) {
                return "StatusCode";
            }
            else {
                return "StytchError";
            }
        },
    },
};


/***/ }),

/***/ "./src/graphql/resolvers/unit.ts":
/*!***************************************!*\
  !*** ./src/graphql/resolvers/unit.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        getZoe: () => "zoe",
        getLandon: () => "Landon",
        getMoney: () => 1000000000,
    },
};


/***/ }),

/***/ "./src/graphql/typeDefs/index.ts":
/*!***************************************!*\
  !*** ./src/graphql/typeDefs/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stytch_1 = __webpack_require__(/*! ./stytch */ "./src/graphql/typeDefs/stytch.ts");
const shared_1 = __webpack_require__(/*! ./shared */ "./src/graphql/typeDefs/shared.ts");
exports["default"] = [stytch_1.typeDefs, shared_1.typeDefs];


/***/ }),

/***/ "./src/graphql/typeDefs/shared.ts":
/*!****************************************!*\
  !*** ./src/graphql/typeDefs/shared.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeDefs = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const graphql_1 = __webpack_require__(/*! graphql */ "graphql");
exports.typeDefs = (0, apollo_server_lambda_1.gql) `
	type Query {
		getLandon: String
		getZoe: String
		getMoney: Int
	}

	scalar Date
`;
const dateScalar = new graphql_1.GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
        return value.getTime();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return new Date(parseInt(ast.value, 10));
        }
        return null;
    },
});
const resolvers = {
    Date: dateScalar,
};


/***/ }),

/***/ "./src/graphql/typeDefs/stytch.ts":
/*!****************************************!*\
  !*** ./src/graphql/typeDefs/stytch.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeDefs = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.typeDefs = (0, apollo_server_lambda_1.gql) `
	type Query {
		loginOrCreateSMS(phoneNumber: String): LoginOrCreateResponse
		loginOrCreateEmail(email: String): LoginOrCreateResponse
		authenticateOTP(methodId: String, code: String): AuthenticateResponse
	}

	enum AuthType {
		PHONE
		EMAIL
	}

	union AuthenticateResponse = StatusCode | StytchError

	type LoginOrCreateResponse {
		phone_id: String
		email_id: String
		user_id: String!
	}

	type StatusCode {
		status_code: Int
	}

	type StytchError {
		status_code: Int
		error_type: String
		error_message: String
	}

	type StytchUser {
		user_id: String!
		authType: AuthType!
		phone_numbers: [StytchPhoneNumber]
		email: StytchEmail
		providers: [StytchOAuth]
	}

	type StytchEmail {
		email_id: String
		email: String
		verified: Boolean
	}

	type StytchPhoneNumber {
		phone_id: String
		phone_number: String
		verified: Boolean
	}

	type StytchOAuth {
		provider_subject: String
		proivider_type: String
		profile_picture_url: String
		locale: String
	}
`;


/***/ }),

/***/ "../../node_modules/isomorphic-base64/index.js":
/*!*****************************************************!*\
  !*** ../../node_modules/isomorphic-base64/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.atob = function atob(val) {
  return new Buffer(val, 'base64').toString();
};

exports.btoa = function btoa(val) {
  return new Buffer(val).toString('base64');
};


/***/ }),

/***/ "../../node_modules/isomorphic-unfetch/index.js":
/*!******************************************************!*\
  !*** ../../node_modules/isomorphic-unfetch/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function r(m){return m && m.default || m;}
module.exports = global.fetch = global.fetch || (
	typeof process=='undefined' ? r(__webpack_require__(/*! unfetch */ "../../node_modules/unfetch/dist/unfetch.module.js")) : (function(url, opts) {
		return r(__webpack_require__(/*! node-fetch */ "node-fetch"))(String(url).replace(/^\/\//g,'https://'), opts);
	})
);


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/index.js":
/*!******************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.base64url = exports.generateSecret = exports.generateKeyPair = exports.errors = exports.decodeJwt = exports.decodeProtectedHeader = exports.importJWK = exports.importX509 = exports.importPKCS8 = exports.importSPKI = exports.exportJWK = exports.exportSPKI = exports.exportPKCS8 = exports.UnsecuredJWT = exports.createRemoteJWKSet = exports.createLocalJWKSet = exports.EmbeddedJWK = exports.calculateJwkThumbprint = exports.EncryptJWT = exports.SignJWT = exports.GeneralSign = exports.FlattenedSign = exports.CompactSign = exports.FlattenedEncrypt = exports.CompactEncrypt = exports.jwtDecrypt = exports.jwtVerify = exports.generalVerify = exports.flattenedVerify = exports.compactVerify = exports.GeneralEncrypt = exports.generalDecrypt = exports.flattenedDecrypt = exports.compactDecrypt = void 0;
var decrypt_js_1 = __webpack_require__(/*! ./jwe/compact/decrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/compact/decrypt.js");
Object.defineProperty(exports, "compactDecrypt", ({ enumerable: true, get: function () { return decrypt_js_1.compactDecrypt; } }));
var decrypt_js_2 = __webpack_require__(/*! ./jwe/flattened/decrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js");
Object.defineProperty(exports, "flattenedDecrypt", ({ enumerable: true, get: function () { return decrypt_js_2.flattenedDecrypt; } }));
var decrypt_js_3 = __webpack_require__(/*! ./jwe/general/decrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/general/decrypt.js");
Object.defineProperty(exports, "generalDecrypt", ({ enumerable: true, get: function () { return decrypt_js_3.generalDecrypt; } }));
var encrypt_js_1 = __webpack_require__(/*! ./jwe/general/encrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/general/encrypt.js");
Object.defineProperty(exports, "GeneralEncrypt", ({ enumerable: true, get: function () { return encrypt_js_1.GeneralEncrypt; } }));
var verify_js_1 = __webpack_require__(/*! ./jws/compact/verify.js */ "../../node_modules/jose/dist/node/cjs/jws/compact/verify.js");
Object.defineProperty(exports, "compactVerify", ({ enumerable: true, get: function () { return verify_js_1.compactVerify; } }));
var verify_js_2 = __webpack_require__(/*! ./jws/flattened/verify.js */ "../../node_modules/jose/dist/node/cjs/jws/flattened/verify.js");
Object.defineProperty(exports, "flattenedVerify", ({ enumerable: true, get: function () { return verify_js_2.flattenedVerify; } }));
var verify_js_3 = __webpack_require__(/*! ./jws/general/verify.js */ "../../node_modules/jose/dist/node/cjs/jws/general/verify.js");
Object.defineProperty(exports, "generalVerify", ({ enumerable: true, get: function () { return verify_js_3.generalVerify; } }));
var verify_js_4 = __webpack_require__(/*! ./jwt/verify.js */ "../../node_modules/jose/dist/node/cjs/jwt/verify.js");
Object.defineProperty(exports, "jwtVerify", ({ enumerable: true, get: function () { return verify_js_4.jwtVerify; } }));
var decrypt_js_4 = __webpack_require__(/*! ./jwt/decrypt.js */ "../../node_modules/jose/dist/node/cjs/jwt/decrypt.js");
Object.defineProperty(exports, "jwtDecrypt", ({ enumerable: true, get: function () { return decrypt_js_4.jwtDecrypt; } }));
var encrypt_js_2 = __webpack_require__(/*! ./jwe/compact/encrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/compact/encrypt.js");
Object.defineProperty(exports, "CompactEncrypt", ({ enumerable: true, get: function () { return encrypt_js_2.CompactEncrypt; } }));
var encrypt_js_3 = __webpack_require__(/*! ./jwe/flattened/encrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/flattened/encrypt.js");
Object.defineProperty(exports, "FlattenedEncrypt", ({ enumerable: true, get: function () { return encrypt_js_3.FlattenedEncrypt; } }));
var sign_js_1 = __webpack_require__(/*! ./jws/compact/sign.js */ "../../node_modules/jose/dist/node/cjs/jws/compact/sign.js");
Object.defineProperty(exports, "CompactSign", ({ enumerable: true, get: function () { return sign_js_1.CompactSign; } }));
var sign_js_2 = __webpack_require__(/*! ./jws/flattened/sign.js */ "../../node_modules/jose/dist/node/cjs/jws/flattened/sign.js");
Object.defineProperty(exports, "FlattenedSign", ({ enumerable: true, get: function () { return sign_js_2.FlattenedSign; } }));
var sign_js_3 = __webpack_require__(/*! ./jws/general/sign.js */ "../../node_modules/jose/dist/node/cjs/jws/general/sign.js");
Object.defineProperty(exports, "GeneralSign", ({ enumerable: true, get: function () { return sign_js_3.GeneralSign; } }));
var sign_js_4 = __webpack_require__(/*! ./jwt/sign.js */ "../../node_modules/jose/dist/node/cjs/jwt/sign.js");
Object.defineProperty(exports, "SignJWT", ({ enumerable: true, get: function () { return sign_js_4.SignJWT; } }));
var encrypt_js_4 = __webpack_require__(/*! ./jwt/encrypt.js */ "../../node_modules/jose/dist/node/cjs/jwt/encrypt.js");
Object.defineProperty(exports, "EncryptJWT", ({ enumerable: true, get: function () { return encrypt_js_4.EncryptJWT; } }));
var thumbprint_js_1 = __webpack_require__(/*! ./jwk/thumbprint.js */ "../../node_modules/jose/dist/node/cjs/jwk/thumbprint.js");
Object.defineProperty(exports, "calculateJwkThumbprint", ({ enumerable: true, get: function () { return thumbprint_js_1.calculateJwkThumbprint; } }));
var embedded_js_1 = __webpack_require__(/*! ./jwk/embedded.js */ "../../node_modules/jose/dist/node/cjs/jwk/embedded.js");
Object.defineProperty(exports, "EmbeddedJWK", ({ enumerable: true, get: function () { return embedded_js_1.EmbeddedJWK; } }));
var local_js_1 = __webpack_require__(/*! ./jwks/local.js */ "../../node_modules/jose/dist/node/cjs/jwks/local.js");
Object.defineProperty(exports, "createLocalJWKSet", ({ enumerable: true, get: function () { return local_js_1.createLocalJWKSet; } }));
var remote_js_1 = __webpack_require__(/*! ./jwks/remote.js */ "../../node_modules/jose/dist/node/cjs/jwks/remote.js");
Object.defineProperty(exports, "createRemoteJWKSet", ({ enumerable: true, get: function () { return remote_js_1.createRemoteJWKSet; } }));
var unsecured_js_1 = __webpack_require__(/*! ./jwt/unsecured.js */ "../../node_modules/jose/dist/node/cjs/jwt/unsecured.js");
Object.defineProperty(exports, "UnsecuredJWT", ({ enumerable: true, get: function () { return unsecured_js_1.UnsecuredJWT; } }));
var export_js_1 = __webpack_require__(/*! ./key/export.js */ "../../node_modules/jose/dist/node/cjs/key/export.js");
Object.defineProperty(exports, "exportPKCS8", ({ enumerable: true, get: function () { return export_js_1.exportPKCS8; } }));
Object.defineProperty(exports, "exportSPKI", ({ enumerable: true, get: function () { return export_js_1.exportSPKI; } }));
Object.defineProperty(exports, "exportJWK", ({ enumerable: true, get: function () { return export_js_1.exportJWK; } }));
var import_js_1 = __webpack_require__(/*! ./key/import.js */ "../../node_modules/jose/dist/node/cjs/key/import.js");
Object.defineProperty(exports, "importSPKI", ({ enumerable: true, get: function () { return import_js_1.importSPKI; } }));
Object.defineProperty(exports, "importPKCS8", ({ enumerable: true, get: function () { return import_js_1.importPKCS8; } }));
Object.defineProperty(exports, "importX509", ({ enumerable: true, get: function () { return import_js_1.importX509; } }));
Object.defineProperty(exports, "importJWK", ({ enumerable: true, get: function () { return import_js_1.importJWK; } }));
var decode_protected_header_js_1 = __webpack_require__(/*! ./util/decode_protected_header.js */ "../../node_modules/jose/dist/node/cjs/util/decode_protected_header.js");
Object.defineProperty(exports, "decodeProtectedHeader", ({ enumerable: true, get: function () { return decode_protected_header_js_1.decodeProtectedHeader; } }));
var decode_jwt_js_1 = __webpack_require__(/*! ./util/decode_jwt.js */ "../../node_modules/jose/dist/node/cjs/util/decode_jwt.js");
Object.defineProperty(exports, "decodeJwt", ({ enumerable: true, get: function () { return decode_jwt_js_1.decodeJwt; } }));
exports.errors = __webpack_require__(/*! ./util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
var generate_key_pair_js_1 = __webpack_require__(/*! ./key/generate_key_pair.js */ "../../node_modules/jose/dist/node/cjs/key/generate_key_pair.js");
Object.defineProperty(exports, "generateKeyPair", ({ enumerable: true, get: function () { return generate_key_pair_js_1.generateKeyPair; } }));
var generate_secret_js_1 = __webpack_require__(/*! ./key/generate_secret.js */ "../../node_modules/jose/dist/node/cjs/key/generate_secret.js");
Object.defineProperty(exports, "generateSecret", ({ enumerable: true, get: function () { return generate_secret_js_1.generateSecret; } }));
exports.base64url = __webpack_require__(/*! ./util/base64url.js */ "../../node_modules/jose/dist/node/cjs/util/base64url.js");


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwe/compact/decrypt.js":
/*!********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwe/compact/decrypt.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compactDecrypt = void 0;
const decrypt_js_1 = __webpack_require__(/*! ../flattened/decrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
async function compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
        jwe = buffer_utils_js_1.decoder.decode(jwe);
    }
    if (typeof jwe !== 'string') {
        throw new errors_js_1.JWEInvalid('Compact JWE must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length, } = jwe.split('.');
    if (length !== 5) {
        throw new errors_js_1.JWEInvalid('Invalid Compact JWE');
    }
    const decrypted = await (0, decrypt_js_1.flattenedDecrypt)({
        ciphertext,
        iv: (iv || undefined),
        protected: protectedHeader || undefined,
        tag: (tag || undefined),
        encrypted_key: encryptedKey || undefined,
    }, key, options);
    const result = { plaintext: decrypted.plaintext, protectedHeader: decrypted.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: decrypted.key };
    }
    return result;
}
exports.compactDecrypt = compactDecrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwe/compact/encrypt.js":
/*!********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwe/compact/encrypt.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompactEncrypt = void 0;
const encrypt_js_1 = __webpack_require__(/*! ../flattened/encrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/flattened/encrypt.js");
class CompactEncrypt {
    constructor(plaintext) {
        this._flattened = new encrypt_js_1.FlattenedEncrypt(plaintext);
    }
    setContentEncryptionKey(cek) {
        this._flattened.setContentEncryptionKey(cek);
        return this;
    }
    setInitializationVector(iv) {
        this._flattened.setInitializationVector(iv);
        return this;
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    setKeyManagementParameters(parameters) {
        this._flattened.setKeyManagementParameters(parameters);
        return this;
    }
    async encrypt(key, options) {
        const jwe = await this._flattened.encrypt(key, options);
        return [jwe.protected, jwe.encrypted_key, jwe.iv, jwe.ciphertext, jwe.tag].join('.');
    }
}
exports.CompactEncrypt = CompactEncrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.flattenedDecrypt = void 0;
const base64url_js_1 = __webpack_require__(/*! ../../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const decrypt_js_1 = __webpack_require__(/*! ../../runtime/decrypt.js */ "../../node_modules/jose/dist/node/cjs/runtime/decrypt.js");
const zlib_js_1 = __webpack_require__(/*! ../../runtime/zlib.js */ "../../node_modules/jose/dist/node/cjs/runtime/zlib.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const is_disjoint_js_1 = __webpack_require__(/*! ../../lib/is_disjoint.js */ "../../node_modules/jose/dist/node/cjs/lib/is_disjoint.js");
const is_object_js_1 = __webpack_require__(/*! ../../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
const decrypt_key_management_js_1 = __webpack_require__(/*! ../../lib/decrypt_key_management.js */ "../../node_modules/jose/dist/node/cjs/lib/decrypt_key_management.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const cek_js_1 = __webpack_require__(/*! ../../lib/cek.js */ "../../node_modules/jose/dist/node/cjs/lib/cek.js");
const validate_crit_js_1 = __webpack_require__(/*! ../../lib/validate_crit.js */ "../../node_modules/jose/dist/node/cjs/lib/validate_crit.js");
const validate_algorithms_js_1 = __webpack_require__(/*! ../../lib/validate_algorithms.js */ "../../node_modules/jose/dist/node/cjs/lib/validate_algorithms.js");
async function flattenedDecrypt(jwe, key, options) {
    var _a;
    if (!(0, is_object_js_1.default)(jwe)) {
        throw new errors_js_1.JWEInvalid('Flattened JWE must be an object');
    }
    if (jwe.protected === undefined && jwe.header === undefined && jwe.unprotected === undefined) {
        throw new errors_js_1.JWEInvalid('JOSE Header missing');
    }
    if (typeof jwe.iv !== 'string') {
        throw new errors_js_1.JWEInvalid('JWE Initialization Vector missing or incorrect type');
    }
    if (typeof jwe.ciphertext !== 'string') {
        throw new errors_js_1.JWEInvalid('JWE Ciphertext missing or incorrect type');
    }
    if (typeof jwe.tag !== 'string') {
        throw new errors_js_1.JWEInvalid('JWE Authentication Tag missing or incorrect type');
    }
    if (jwe.protected !== undefined && typeof jwe.protected !== 'string') {
        throw new errors_js_1.JWEInvalid('JWE Protected Header incorrect type');
    }
    if (jwe.encrypted_key !== undefined && typeof jwe.encrypted_key !== 'string') {
        throw new errors_js_1.JWEInvalid('JWE Encrypted Key incorrect type');
    }
    if (jwe.aad !== undefined && typeof jwe.aad !== 'string') {
        throw new errors_js_1.JWEInvalid('JWE AAD incorrect type');
    }
    if (jwe.header !== undefined && !(0, is_object_js_1.default)(jwe.header)) {
        throw new errors_js_1.JWEInvalid('JWE Shared Unprotected Header incorrect type');
    }
    if (jwe.unprotected !== undefined && !(0, is_object_js_1.default)(jwe.unprotected)) {
        throw new errors_js_1.JWEInvalid('JWE Per-Recipient Unprotected Header incorrect type');
    }
    let parsedProt;
    if (jwe.protected) {
        const protectedHeader = (0, base64url_js_1.decode)(jwe.protected);
        try {
            parsedProt = JSON.parse(buffer_utils_js_1.decoder.decode(protectedHeader));
        }
        catch {
            throw new errors_js_1.JWEInvalid('JWE Protected Header is invalid');
        }
    }
    if (!(0, is_disjoint_js_1.default)(parsedProt, jwe.header, jwe.unprotected)) {
        throw new errors_js_1.JWEInvalid('JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jwe.header,
        ...jwe.unprotected,
    };
    (0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== undefined) {
        if (!parsedProt || !parsedProt.zip) {
            throw new errors_js_1.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
        }
        if (joseHeader.zip !== 'DEF') {
            throw new errors_js_1.JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
        }
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new errors_js_1.JWEInvalid('missing JWE Algorithm (alg) in JWE Header');
    }
    if (typeof enc !== 'string' || !enc) {
        throw new errors_js_1.JWEInvalid('missing JWE Encryption Algorithm (enc) in JWE Header');
    }
    const keyManagementAlgorithms = options && (0, validate_algorithms_js_1.default)('keyManagementAlgorithms', options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options &&
        (0, validate_algorithms_js_1.default)('contentEncryptionAlgorithms', options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg)) {
        throw new errors_js_1.JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
        throw new errors_js_1.JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== undefined) {
        encryptedKey = (0, base64url_js_1.decode)(jwe.encrypted_key);
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
        key = await key(parsedProt, jwe);
        resolvedKey = true;
    }
    let cek;
    try {
        cek = await (0, decrypt_key_management_js_1.default)(alg, key, encryptedKey, joseHeader);
    }
    catch (err) {
        if (err instanceof TypeError) {
            throw err;
        }
        cek = (0, cek_js_1.default)(enc);
    }
    const iv = (0, base64url_js_1.decode)(jwe.iv);
    const tag = (0, base64url_js_1.decode)(jwe.tag);
    const protectedHeader = buffer_utils_js_1.encoder.encode((_a = jwe.protected) !== null && _a !== void 0 ? _a : '');
    let additionalData;
    if (jwe.aad !== undefined) {
        additionalData = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode('.'), buffer_utils_js_1.encoder.encode(jwe.aad));
    }
    else {
        additionalData = protectedHeader;
    }
    let plaintext = await (0, decrypt_js_1.default)(enc, cek, (0, base64url_js_1.decode)(jwe.ciphertext), iv, tag, additionalData);
    if (joseHeader.zip === 'DEF') {
        plaintext = await ((options === null || options === void 0 ? void 0 : options.inflateRaw) || zlib_js_1.inflate)(plaintext);
    }
    const result = { plaintext };
    if (jwe.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== undefined) {
        result.additionalAuthenticatedData = (0, base64url_js_1.decode)(jwe.aad);
    }
    if (jwe.unprotected !== undefined) {
        result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== undefined) {
        result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
        return { ...result, key };
    }
    return result;
}
exports.flattenedDecrypt = flattenedDecrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwe/flattened/encrypt.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwe/flattened/encrypt.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlattenedEncrypt = exports.unprotected = void 0;
const base64url_js_1 = __webpack_require__(/*! ../../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const encrypt_js_1 = __webpack_require__(/*! ../../runtime/encrypt.js */ "../../node_modules/jose/dist/node/cjs/runtime/encrypt.js");
const zlib_js_1 = __webpack_require__(/*! ../../runtime/zlib.js */ "../../node_modules/jose/dist/node/cjs/runtime/zlib.js");
const iv_js_1 = __webpack_require__(/*! ../../lib/iv.js */ "../../node_modules/jose/dist/node/cjs/lib/iv.js");
const encrypt_key_management_js_1 = __webpack_require__(/*! ../../lib/encrypt_key_management.js */ "../../node_modules/jose/dist/node/cjs/lib/encrypt_key_management.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const is_disjoint_js_1 = __webpack_require__(/*! ../../lib/is_disjoint.js */ "../../node_modules/jose/dist/node/cjs/lib/is_disjoint.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const validate_crit_js_1 = __webpack_require__(/*! ../../lib/validate_crit.js */ "../../node_modules/jose/dist/node/cjs/lib/validate_crit.js");
exports.unprotected = Symbol();
class FlattenedEncrypt {
    constructor(plaintext) {
        if (!(plaintext instanceof Uint8Array)) {
            throw new TypeError('plaintext must be an instance of Uint8Array');
        }
        this._plaintext = plaintext;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError('setKeyManagementParameters can only be called once');
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._sharedUnprotectedHeader) {
            throw new TypeError('setSharedUnprotectedHeader can only be called once');
        }
        this._sharedUnprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError('setContentEncryptionKey can only be called once');
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError('setInitializationVector can only be called once');
        }
        this._iv = iv;
        return this;
    }
    async encrypt(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
            throw new errors_js_1.JWEInvalid('either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()');
        }
        if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
            throw new errors_js_1.JWEInvalid('JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint');
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...this._sharedUnprotectedHeader,
        };
        (0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        if (joseHeader.zip !== undefined) {
            if (!this._protectedHeader || !this._protectedHeader.zip) {
                throw new errors_js_1.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
            }
            if (joseHeader.zip !== 'DEF') {
                throw new errors_js_1.JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
            }
        }
        const { alg, enc } = joseHeader;
        if (typeof alg !== 'string' || !alg) {
            throw new errors_js_1.JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (typeof enc !== 'string' || !enc) {
            throw new errors_js_1.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        let encryptedKey;
        if (alg === 'dir') {
            if (this._cek) {
                throw new TypeError('setContentEncryptionKey cannot be called when using Direct Encryption');
            }
        }
        else if (alg === 'ECDH-ES') {
            if (this._cek) {
                throw new TypeError('setContentEncryptionKey cannot be called when using Direct Key Agreement');
            }
        }
        let cek;
        {
            let parameters;
            ({ cek, encryptedKey, parameters } = await (0, encrypt_key_management_js_1.default)(alg, enc, key, this._cek, this._keyManagementParameters));
            if (parameters) {
                if (options && exports.unprotected in options) {
                    if (!this._unprotectedHeader) {
                        this.setUnprotectedHeader(parameters);
                    }
                    else {
                        this._unprotectedHeader = { ...this._unprotectedHeader, ...parameters };
                    }
                }
                else {
                    if (!this._protectedHeader) {
                        this.setProtectedHeader(parameters);
                    }
                    else {
                        this._protectedHeader = { ...this._protectedHeader, ...parameters };
                    }
                }
            }
        }
        this._iv || (this._iv = (0, iv_js_1.default)(enc));
        let additionalData;
        let protectedHeader;
        let aadMember;
        if (this._protectedHeader) {
            protectedHeader = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(JSON.stringify(this._protectedHeader)));
        }
        else {
            protectedHeader = buffer_utils_js_1.encoder.encode('');
        }
        if (this._aad) {
            aadMember = (0, base64url_js_1.encode)(this._aad);
            additionalData = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode('.'), buffer_utils_js_1.encoder.encode(aadMember));
        }
        else {
            additionalData = protectedHeader;
        }
        let ciphertext;
        let tag;
        if (joseHeader.zip === 'DEF') {
            const deflated = await ((options === null || options === void 0 ? void 0 : options.deflateRaw) || zlib_js_1.deflate)(this._plaintext);
            ({ ciphertext, tag } = await (0, encrypt_js_1.default)(enc, deflated, cek, this._iv, additionalData));
        }
        else {
            ;
            ({ ciphertext, tag } = await (0, encrypt_js_1.default)(enc, this._plaintext, cek, this._iv, additionalData));
        }
        const jwe = {
            ciphertext: (0, base64url_js_1.encode)(ciphertext),
            iv: (0, base64url_js_1.encode)(this._iv),
            tag: (0, base64url_js_1.encode)(tag),
        };
        if (encryptedKey) {
            jwe.encrypted_key = (0, base64url_js_1.encode)(encryptedKey);
        }
        if (aadMember) {
            jwe.aad = aadMember;
        }
        if (this._protectedHeader) {
            jwe.protected = buffer_utils_js_1.decoder.decode(protectedHeader);
        }
        if (this._sharedUnprotectedHeader) {
            jwe.unprotected = this._sharedUnprotectedHeader;
        }
        if (this._unprotectedHeader) {
            jwe.header = this._unprotectedHeader;
        }
        return jwe;
    }
}
exports.FlattenedEncrypt = FlattenedEncrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwe/general/decrypt.js":
/*!********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwe/general/decrypt.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generalDecrypt = void 0;
const decrypt_js_1 = __webpack_require__(/*! ../flattened/decrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const is_object_js_1 = __webpack_require__(/*! ../../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
async function generalDecrypt(jwe, key, options) {
    if (!(0, is_object_js_1.default)(jwe)) {
        throw new errors_js_1.JWEInvalid('General JWE must be an object');
    }
    if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(is_object_js_1.default)) {
        throw new errors_js_1.JWEInvalid('JWE Recipients missing or incorrect type');
    }
    if (!jwe.recipients.length) {
        throw new errors_js_1.JWEInvalid('JWE Recipients has no members');
    }
    for (const recipient of jwe.recipients) {
        try {
            return await (0, decrypt_js_1.flattenedDecrypt)({
                aad: jwe.aad,
                ciphertext: jwe.ciphertext,
                encrypted_key: recipient.encrypted_key,
                header: recipient.header,
                iv: jwe.iv,
                protected: jwe.protected,
                tag: jwe.tag,
                unprotected: jwe.unprotected,
            }, key, options);
        }
        catch {
        }
    }
    throw new errors_js_1.JWEDecryptionFailed();
}
exports.generalDecrypt = generalDecrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwe/general/encrypt.js":
/*!********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwe/general/encrypt.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeneralEncrypt = void 0;
const encrypt_js_1 = __webpack_require__(/*! ../flattened/encrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/flattened/encrypt.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const cek_js_1 = __webpack_require__(/*! ../../lib/cek.js */ "../../node_modules/jose/dist/node/cjs/lib/cek.js");
const is_disjoint_js_1 = __webpack_require__(/*! ../../lib/is_disjoint.js */ "../../node_modules/jose/dist/node/cjs/lib/is_disjoint.js");
const encrypt_key_management_js_1 = __webpack_require__(/*! ../../lib/encrypt_key_management.js */ "../../node_modules/jose/dist/node/cjs/lib/encrypt_key_management.js");
const base64url_js_1 = __webpack_require__(/*! ../../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const validate_crit_js_1 = __webpack_require__(/*! ../../lib/validate_crit.js */ "../../node_modules/jose/dist/node/cjs/lib/validate_crit.js");
class IndividualRecipient {
    constructor(enc, key, options) {
        this.parent = enc;
        this.key = key;
        this.options = options;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
    }
    addRecipient(...args) {
        return this.parent.addRecipient(...args);
    }
    encrypt(...args) {
        return this.parent.encrypt(...args);
    }
    done() {
        return this.parent;
    }
}
class GeneralEncrypt {
    constructor(plaintext) {
        this._recipients = [];
        this._plaintext = plaintext;
    }
    addRecipient(key, options) {
        const recipient = new IndividualRecipient(this, key, { crit: options === null || options === void 0 ? void 0 : options.crit });
        this._recipients.push(recipient);
        return recipient;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setSharedUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    async encrypt(options) {
        var _a, _b, _c;
        if (!this._recipients.length) {
            throw new errors_js_1.JWEInvalid('at least one recipient must be added');
        }
        options = { deflateRaw: options === null || options === void 0 ? void 0 : options.deflateRaw };
        if (this._recipients.length === 1) {
            const [recipient] = this._recipients;
            const flattened = await new encrypt_js_1.FlattenedEncrypt(this._plaintext)
                .setAdditionalAuthenticatedData(this._aad)
                .setProtectedHeader(this._protectedHeader)
                .setSharedUnprotectedHeader(this._unprotectedHeader)
                .setUnprotectedHeader(recipient.unprotectedHeader)
                .encrypt(recipient.key, { ...recipient.options, ...options });
            let jwe = {
                ciphertext: flattened.ciphertext,
                iv: flattened.iv,
                recipients: [{}],
                tag: flattened.tag,
            };
            if (flattened.aad)
                jwe.aad = flattened.aad;
            if (flattened.protected)
                jwe.protected = flattened.protected;
            if (flattened.unprotected)
                jwe.unprotected = flattened.unprotected;
            if (flattened.encrypted_key)
                jwe.recipients[0].encrypted_key = flattened.encrypted_key;
            if (flattened.header)
                jwe.recipients[0].header = flattened.header;
            return jwe;
        }
        let enc;
        for (let i = 0; i < this._recipients.length; i++) {
            const recipient = this._recipients[i];
            if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader, recipient.unprotectedHeader)) {
                throw new errors_js_1.JWEInvalid('JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint');
            }
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...recipient.unprotectedHeader,
            };
            const { alg } = joseHeader;
            if (typeof alg !== 'string' || !alg) {
                throw new errors_js_1.JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
            }
            if (alg === 'dir' || alg === 'ECDH-ES') {
                throw new errors_js_1.JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
            }
            if (typeof joseHeader.enc !== 'string' || !joseHeader.enc) {
                throw new errors_js_1.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
            }
            if (!enc) {
                enc = joseHeader.enc;
            }
            else if (enc !== joseHeader.enc) {
                throw new errors_js_1.JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
            }
            (0, validate_crit_js_1.default)(errors_js_1.JWEInvalid, new Map(), recipient.options.crit, this._protectedHeader, joseHeader);
            if (joseHeader.zip !== undefined) {
                if (!this._protectedHeader || !this._protectedHeader.zip) {
                    throw new errors_js_1.JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
                }
            }
        }
        const cek = (0, cek_js_1.default)(enc);
        let jwe = {
            ciphertext: '',
            iv: '',
            recipients: [],
            tag: '',
        };
        for (let i = 0; i < this._recipients.length; i++) {
            const recipient = this._recipients[i];
            const target = {};
            jwe.recipients.push(target);
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...recipient.unprotectedHeader,
            };
            const p2c = joseHeader.alg.startsWith('PBES2') ? 2048 + i : undefined;
            if (i === 0) {
                const flattened = await new encrypt_js_1.FlattenedEncrypt(this._plaintext)
                    .setAdditionalAuthenticatedData(this._aad)
                    .setContentEncryptionKey(cek)
                    .setProtectedHeader(this._protectedHeader)
                    .setSharedUnprotectedHeader(this._unprotectedHeader)
                    .setUnprotectedHeader(recipient.unprotectedHeader)
                    .setKeyManagementParameters({ p2c })
                    .encrypt(recipient.key, {
                    ...recipient.options,
                    ...options,
                    [encrypt_js_1.unprotected]: true,
                });
                jwe.ciphertext = flattened.ciphertext;
                jwe.iv = flattened.iv;
                jwe.tag = flattened.tag;
                if (flattened.aad)
                    jwe.aad = flattened.aad;
                if (flattened.protected)
                    jwe.protected = flattened.protected;
                if (flattened.unprotected)
                    jwe.unprotected = flattened.unprotected;
                target.encrypted_key = flattened.encrypted_key;
                if (flattened.header)
                    target.header = flattened.header;
                continue;
            }
            const { encryptedKey, parameters } = await (0, encrypt_key_management_js_1.default)(((_a = recipient.unprotectedHeader) === null || _a === void 0 ? void 0 : _a.alg) ||
                ((_b = this._protectedHeader) === null || _b === void 0 ? void 0 : _b.alg) ||
                ((_c = this._unprotectedHeader) === null || _c === void 0 ? void 0 : _c.alg), enc, recipient.key, cek, { p2c });
            target.encrypted_key = (0, base64url_js_1.encode)(encryptedKey);
            if (recipient.unprotectedHeader || parameters)
                target.header = { ...recipient.unprotectedHeader, ...parameters };
        }
        return jwe;
    }
}
exports.GeneralEncrypt = GeneralEncrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwk/embedded.js":
/*!*************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwk/embedded.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmbeddedJWK = void 0;
const import_js_1 = __webpack_require__(/*! ../key/import.js */ "../../node_modules/jose/dist/node/cjs/key/import.js");
const is_object_js_1 = __webpack_require__(/*! ../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
async function EmbeddedJWK(protectedHeader, token) {
    const joseHeader = {
        ...protectedHeader,
        ...token.header,
    };
    if (!(0, is_object_js_1.default)(joseHeader.jwk)) {
        throw new errors_js_1.JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
    }
    const key = await (0, import_js_1.importJWK)({ ...joseHeader.jwk, ext: true }, joseHeader.alg, true);
    if (key instanceof Uint8Array || key.type !== 'public') {
        throw new errors_js_1.JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
    }
    return key;
}
exports.EmbeddedJWK = EmbeddedJWK;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwk/thumbprint.js":
/*!***************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwk/thumbprint.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.calculateJwkThumbprint = void 0;
const digest_js_1 = __webpack_require__(/*! ../runtime/digest.js */ "../../node_modules/jose/dist/node/cjs/runtime/digest.js");
const base64url_js_1 = __webpack_require__(/*! ../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const is_object_js_1 = __webpack_require__(/*! ../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
const check = (value, description) => {
    if (typeof value !== 'string' || !value) {
        throw new errors_js_1.JWKInvalid(`${description} missing or invalid`);
    }
};
async function calculateJwkThumbprint(jwk, digestAlgorithm = 'sha256') {
    if (!(0, is_object_js_1.default)(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    if (digestAlgorithm !== 'sha256' &&
        digestAlgorithm !== 'sha384' &&
        digestAlgorithm !== 'sha512') {
        throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch (jwk.kty) {
        case 'EC':
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
            break;
        case 'OKP':
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
            break;
        case 'RSA':
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
            break;
        case 'oct':
            check(jwk.k, '"k" (Key Value) Parameter');
            components = { k: jwk.k, kty: jwk.kty };
            break;
        default:
            throw new errors_js_1.JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = buffer_utils_js_1.encoder.encode(JSON.stringify(components));
    return (0, base64url_js_1.encode)(await (0, digest_js_1.default)(digestAlgorithm, data));
}
exports.calculateJwkThumbprint = calculateJwkThumbprint;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwks/local.js":
/*!***********************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwks/local.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createLocalJWKSet = exports.LocalJWKSet = exports.isJWKSLike = void 0;
const import_js_1 = __webpack_require__(/*! ../key/import.js */ "../../node_modules/jose/dist/node/cjs/key/import.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const is_object_js_1 = __webpack_require__(/*! ../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
function getKtyFromAlg(alg) {
    switch (typeof alg === 'string' && alg.slice(0, 2)) {
        case 'RS':
        case 'PS':
            return 'RSA';
        case 'ES':
            return 'EC';
        case 'Ed':
            return 'OKP';
        default:
            throw new errors_js_1.JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
    }
}
function isJWKSLike(jwks) {
    return (jwks &&
        typeof jwks === 'object' &&
        Array.isArray(jwks.keys) &&
        jwks.keys.every(isJWKLike));
}
exports.isJWKSLike = isJWKSLike;
function isJWKLike(key) {
    return (0, is_object_js_1.default)(key);
}
function clone(obj) {
    if (typeof structuredClone === 'function') {
        return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
}
class LocalJWKSet {
    constructor(jwks) {
        this._cached = new WeakMap();
        if (!isJWKSLike(jwks)) {
            throw new errors_js_1.JWKSInvalid('JSON Web Key Set malformed');
        }
        this._jwks = clone(jwks);
    }
    async getKey(protectedHeader, token) {
        const { alg, kid } = { ...protectedHeader, ...token.header };
        const kty = getKtyFromAlg(alg);
        const candidates = this._jwks.keys.filter((jwk) => {
            let candidate = kty === jwk.kty;
            if (candidate && typeof kid === 'string') {
                candidate = kid === jwk.kid;
            }
            if (candidate && typeof jwk.alg === 'string') {
                candidate = alg === jwk.alg;
            }
            if (candidate && typeof jwk.use === 'string') {
                candidate = jwk.use === 'sig';
            }
            if (candidate && Array.isArray(jwk.key_ops)) {
                candidate = jwk.key_ops.includes('verify');
            }
            if (candidate && alg === 'EdDSA') {
                candidate = jwk.crv === 'Ed25519' || jwk.crv === 'Ed448';
            }
            if (candidate) {
                switch (alg) {
                    case 'ES256':
                        candidate = jwk.crv === 'P-256';
                        break;
                    case 'ES256K':
                        candidate = jwk.crv === 'secp256k1';
                        break;
                    case 'ES384':
                        candidate = jwk.crv === 'P-384';
                        break;
                    case 'ES512':
                        candidate = jwk.crv === 'P-521';
                        break;
                }
            }
            return candidate;
        });
        const { 0: jwk, length } = candidates;
        if (length === 0) {
            throw new errors_js_1.JWKSNoMatchingKey();
        }
        else if (length !== 1) {
            throw new errors_js_1.JWKSMultipleMatchingKeys();
        }
        const cached = this._cached.get(jwk) || this._cached.set(jwk, {}).get(jwk);
        if (cached[alg] === undefined) {
            const keyObject = await (0, import_js_1.importJWK)({ ...jwk, ext: true }, alg);
            if (keyObject instanceof Uint8Array || keyObject.type !== 'public') {
                throw new errors_js_1.JWKSInvalid('JSON Web Key Set members must be public keys');
            }
            cached[alg] = keyObject;
        }
        return cached[alg];
    }
}
exports.LocalJWKSet = LocalJWKSet;
function createLocalJWKSet(jwks) {
    return LocalJWKSet.prototype.getKey.bind(new LocalJWKSet(jwks));
}
exports.createLocalJWKSet = createLocalJWKSet;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwks/remote.js":
/*!************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwks/remote.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRemoteJWKSet = void 0;
const fetch_jwks_js_1 = __webpack_require__(/*! ../runtime/fetch_jwks.js */ "../../node_modules/jose/dist/node/cjs/runtime/fetch_jwks.js");
const env_js_1 = __webpack_require__(/*! ../runtime/env.js */ "../../node_modules/jose/dist/node/cjs/runtime/env.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const local_js_1 = __webpack_require__(/*! ./local.js */ "../../node_modules/jose/dist/node/cjs/jwks/local.js");
class RemoteJWKSet extends local_js_1.LocalJWKSet {
    constructor(url, options) {
        super({ keys: [] });
        this._jwks = undefined;
        if (!(url instanceof URL)) {
            throw new TypeError('url must be an instance of URL');
        }
        this._url = new URL(url.href);
        this._options = { agent: options === null || options === void 0 ? void 0 : options.agent, headers: options === null || options === void 0 ? void 0 : options.headers };
        this._timeoutDuration =
            typeof (options === null || options === void 0 ? void 0 : options.timeoutDuration) === 'number' ? options === null || options === void 0 ? void 0 : options.timeoutDuration : 5000;
        this._cooldownDuration =
            typeof (options === null || options === void 0 ? void 0 : options.cooldownDuration) === 'number' ? options === null || options === void 0 ? void 0 : options.cooldownDuration : 30000;
        this._cacheMaxAge = typeof (options === null || options === void 0 ? void 0 : options.cacheMaxAge) === 'number' ? options === null || options === void 0 ? void 0 : options.cacheMaxAge : 600000;
    }
    coolingDown() {
        return typeof this._jwksTimestamp === 'number'
            ? Date.now() < this._jwksTimestamp + this._cooldownDuration
            : false;
    }
    fresh() {
        return typeof this._jwksTimestamp === 'number'
            ? Date.now() < this._jwksTimestamp + this._cacheMaxAge
            : false;
    }
    async getKey(protectedHeader, token) {
        if (!this._jwks || !this.fresh()) {
            await this.reload();
        }
        try {
            return await super.getKey(protectedHeader, token);
        }
        catch (err) {
            if (err instanceof errors_js_1.JWKSNoMatchingKey) {
                if (this.coolingDown() === false) {
                    await this.reload();
                    return super.getKey(protectedHeader, token);
                }
            }
            throw err;
        }
    }
    async reload() {
        if (this._pendingFetch && (0, env_js_1.isCloudflareWorkers)()) {
            return new Promise((resolve) => {
                const isDone = () => {
                    if (this._pendingFetch === undefined) {
                        resolve();
                    }
                    else {
                        setTimeout(isDone, 5);
                    }
                };
                isDone();
            });
        }
        if (!this._pendingFetch) {
            this._pendingFetch = (0, fetch_jwks_js_1.default)(this._url, this._timeoutDuration, this._options)
                .then((json) => {
                if (!(0, local_js_1.isJWKSLike)(json)) {
                    throw new errors_js_1.JWKSInvalid('JSON Web Key Set malformed');
                }
                this._jwks = { keys: json.keys };
                this._jwksTimestamp = Date.now();
                this._pendingFetch = undefined;
            })
                .catch((err) => {
                this._pendingFetch = undefined;
                throw err;
            });
        }
        await this._pendingFetch;
    }
}
function createRemoteJWKSet(url, options) {
    return RemoteJWKSet.prototype.getKey.bind(new RemoteJWKSet(url, options));
}
exports.createRemoteJWKSet = createRemoteJWKSet;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jws/compact/sign.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jws/compact/sign.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompactSign = void 0;
const sign_js_1 = __webpack_require__(/*! ../flattened/sign.js */ "../../node_modules/jose/dist/node/cjs/jws/flattened/sign.js");
class CompactSign {
    constructor(payload) {
        this._flattened = new sign_js_1.FlattenedSign(payload);
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    async sign(key, options) {
        const jws = await this._flattened.sign(key, options);
        if (jws.payload === undefined) {
            throw new TypeError('use the flattened module for creating JWS with b64: false');
        }
        return `${jws.protected}.${jws.payload}.${jws.signature}`;
    }
}
exports.CompactSign = CompactSign;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jws/compact/verify.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jws/compact/verify.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compactVerify = void 0;
const verify_js_1 = __webpack_require__(/*! ../flattened/verify.js */ "../../node_modules/jose/dist/node/cjs/jws/flattened/verify.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
        jws = buffer_utils_js_1.decoder.decode(jws);
    }
    if (typeof jws !== 'string') {
        throw new errors_js_1.JWSInvalid('Compact JWS must be a string or Uint8Array');
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split('.');
    if (length !== 3) {
        throw new errors_js_1.JWSInvalid('Invalid Compact JWS');
    }
    const verified = await (0, verify_js_1.flattenedVerify)({ payload, protected: protectedHeader, signature }, key, options);
    const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: verified.key };
    }
    return result;
}
exports.compactVerify = compactVerify;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jws/flattened/sign.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jws/flattened/sign.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlattenedSign = void 0;
const base64url_js_1 = __webpack_require__(/*! ../../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const sign_js_1 = __webpack_require__(/*! ../../runtime/sign.js */ "../../node_modules/jose/dist/node/cjs/runtime/sign.js");
const is_disjoint_js_1 = __webpack_require__(/*! ../../lib/is_disjoint.js */ "../../node_modules/jose/dist/node/cjs/lib/is_disjoint.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const check_key_type_js_1 = __webpack_require__(/*! ../../lib/check_key_type.js */ "../../node_modules/jose/dist/node/cjs/lib/check_key_type.js");
const validate_crit_js_1 = __webpack_require__(/*! ../../lib/validate_crit.js */ "../../node_modules/jose/dist/node/cjs/lib/validate_crit.js");
class FlattenedSign {
    constructor(payload) {
        if (!(payload instanceof Uint8Array)) {
            throw new TypeError('payload must be an instance of Uint8Array');
        }
        this._payload = payload;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    async sign(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader) {
            throw new errors_js_1.JWSInvalid('either setProtectedHeader or setUnprotectedHeader must be called before #sign()');
        }
        if (!(0, is_disjoint_js_1.default)(this._protectedHeader, this._unprotectedHeader)) {
            throw new errors_js_1.JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
        };
        const extensions = (0, validate_crit_js_1.default)(errors_js_1.JWSInvalid, new Map([['b64', true]]), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        let b64 = true;
        if (extensions.has('b64')) {
            b64 = this._protectedHeader.b64;
            if (typeof b64 !== 'boolean') {
                throw new errors_js_1.JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
            }
        }
        const { alg } = joseHeader;
        if (typeof alg !== 'string' || !alg) {
            throw new errors_js_1.JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        }
        (0, check_key_type_js_1.default)(alg, key, 'sign');
        let payload = this._payload;
        if (b64) {
            payload = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(payload));
        }
        let protectedHeader;
        if (this._protectedHeader) {
            protectedHeader = buffer_utils_js_1.encoder.encode((0, base64url_js_1.encode)(JSON.stringify(this._protectedHeader)));
        }
        else {
            protectedHeader = buffer_utils_js_1.encoder.encode('');
        }
        const data = (0, buffer_utils_js_1.concat)(protectedHeader, buffer_utils_js_1.encoder.encode('.'), payload);
        const signature = await (0, sign_js_1.default)(alg, key, data);
        const jws = {
            signature: (0, base64url_js_1.encode)(signature),
            payload: '',
        };
        if (b64) {
            jws.payload = buffer_utils_js_1.decoder.decode(payload);
        }
        if (this._unprotectedHeader) {
            jws.header = this._unprotectedHeader;
        }
        if (this._protectedHeader) {
            jws.protected = buffer_utils_js_1.decoder.decode(protectedHeader);
        }
        return jws;
    }
}
exports.FlattenedSign = FlattenedSign;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jws/flattened/verify.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jws/flattened/verify.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.flattenedVerify = void 0;
const base64url_js_1 = __webpack_require__(/*! ../../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const verify_js_1 = __webpack_require__(/*! ../../runtime/verify.js */ "../../node_modules/jose/dist/node/cjs/runtime/verify.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const is_disjoint_js_1 = __webpack_require__(/*! ../../lib/is_disjoint.js */ "../../node_modules/jose/dist/node/cjs/lib/is_disjoint.js");
const is_object_js_1 = __webpack_require__(/*! ../../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
const check_key_type_js_1 = __webpack_require__(/*! ../../lib/check_key_type.js */ "../../node_modules/jose/dist/node/cjs/lib/check_key_type.js");
const validate_crit_js_1 = __webpack_require__(/*! ../../lib/validate_crit.js */ "../../node_modules/jose/dist/node/cjs/lib/validate_crit.js");
const validate_algorithms_js_1 = __webpack_require__(/*! ../../lib/validate_algorithms.js */ "../../node_modules/jose/dist/node/cjs/lib/validate_algorithms.js");
async function flattenedVerify(jws, key, options) {
    var _a;
    if (!(0, is_object_js_1.default)(jws)) {
        throw new errors_js_1.JWSInvalid('Flattened JWS must be an object');
    }
    if (jws.protected === undefined && jws.header === undefined) {
        throw new errors_js_1.JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== undefined && typeof jws.protected !== 'string') {
        throw new errors_js_1.JWSInvalid('JWS Protected Header incorrect type');
    }
    if (jws.payload === undefined) {
        throw new errors_js_1.JWSInvalid('JWS Payload missing');
    }
    if (typeof jws.signature !== 'string') {
        throw new errors_js_1.JWSInvalid('JWS Signature missing or incorrect type');
    }
    if (jws.header !== undefined && !(0, is_object_js_1.default)(jws.header)) {
        throw new errors_js_1.JWSInvalid('JWS Unprotected Header incorrect type');
    }
    let parsedProt = {};
    if (jws.protected) {
        const protectedHeader = (0, base64url_js_1.decode)(jws.protected);
        try {
            parsedProt = JSON.parse(buffer_utils_js_1.decoder.decode(protectedHeader));
        }
        catch {
            throw new errors_js_1.JWSInvalid('JWS Protected Header is invalid');
        }
    }
    if (!(0, is_disjoint_js_1.default)(parsedProt, jws.header)) {
        throw new errors_js_1.JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
    }
    const joseHeader = {
        ...parsedProt,
        ...jws.header,
    };
    const extensions = (0, validate_crit_js_1.default)(errors_js_1.JWSInvalid, new Map([['b64', true]]), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has('b64')) {
        b64 = parsedProt.b64;
        if (typeof b64 !== 'boolean') {
            throw new errors_js_1.JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
    }
    const { alg } = joseHeader;
    if (typeof alg !== 'string' || !alg) {
        throw new errors_js_1.JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && (0, validate_algorithms_js_1.default)('algorithms', options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
        throw new errors_js_1.JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (b64) {
        if (typeof jws.payload !== 'string') {
            throw new errors_js_1.JWSInvalid('JWS Payload must be a string');
        }
    }
    else if (typeof jws.payload !== 'string' && !(jws.payload instanceof Uint8Array)) {
        throw new errors_js_1.JWSInvalid('JWS Payload must be a string or an Uint8Array instance');
    }
    let resolvedKey = false;
    if (typeof key === 'function') {
        key = await key(parsedProt, jws);
        resolvedKey = true;
    }
    (0, check_key_type_js_1.default)(alg, key, 'verify');
    const data = (0, buffer_utils_js_1.concat)(buffer_utils_js_1.encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ''), buffer_utils_js_1.encoder.encode('.'), typeof jws.payload === 'string' ? buffer_utils_js_1.encoder.encode(jws.payload) : jws.payload);
    const signature = (0, base64url_js_1.decode)(jws.signature);
    const verified = await (0, verify_js_1.default)(alg, key, signature, data);
    if (!verified) {
        throw new errors_js_1.JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
        payload = (0, base64url_js_1.decode)(jws.payload);
    }
    else if (typeof jws.payload === 'string') {
        payload = buffer_utils_js_1.encoder.encode(jws.payload);
    }
    else {
        payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jws.header !== undefined) {
        result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
        return { ...result, key };
    }
    return result;
}
exports.flattenedVerify = flattenedVerify;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jws/general/sign.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jws/general/sign.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeneralSign = void 0;
const sign_js_1 = __webpack_require__(/*! ../flattened/sign.js */ "../../node_modules/jose/dist/node/cjs/jws/flattened/sign.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
class IndividualSignature {
    constructor(sig, key, options) {
        this.parent = sig;
        this.key = key;
        this.options = options;
    }
    setProtectedHeader(protectedHeader) {
        if (this.protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this.protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
            throw new TypeError('setUnprotectedHeader can only be called once');
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
    }
    addSignature(...args) {
        return this.parent.addSignature(...args);
    }
    sign(...args) {
        return this.parent.sign(...args);
    }
    done() {
        return this.parent;
    }
}
class GeneralSign {
    constructor(payload) {
        this._signatures = [];
        this._payload = payload;
    }
    addSignature(key, options) {
        const signature = new IndividualSignature(this, key, options);
        this._signatures.push(signature);
        return signature;
    }
    async sign() {
        if (!this._signatures.length) {
            throw new errors_js_1.JWSInvalid('at least one signature must be added');
        }
        const jws = {
            signatures: [],
            payload: '',
        };
        for (let i = 0; i < this._signatures.length; i++) {
            const signature = this._signatures[i];
            const flattened = new sign_js_1.FlattenedSign(this._payload);
            flattened.setProtectedHeader(signature.protectedHeader);
            flattened.setUnprotectedHeader(signature.unprotectedHeader);
            const { payload, ...rest } = await flattened.sign(signature.key, signature.options);
            if (i === 0) {
                jws.payload = payload;
            }
            else if (jws.payload !== payload) {
                throw new errors_js_1.JWSInvalid('inconsistent use of JWS Unencoded Payload Option (RFC7797)');
            }
            jws.signatures.push(rest);
        }
        return jws;
    }
}
exports.GeneralSign = GeneralSign;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jws/general/verify.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jws/general/verify.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generalVerify = void 0;
const verify_js_1 = __webpack_require__(/*! ../flattened/verify.js */ "../../node_modules/jose/dist/node/cjs/jws/flattened/verify.js");
const errors_js_1 = __webpack_require__(/*! ../../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const is_object_js_1 = __webpack_require__(/*! ../../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
async function generalVerify(jws, key, options) {
    if (!(0, is_object_js_1.default)(jws)) {
        throw new errors_js_1.JWSInvalid('General JWS must be an object');
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(is_object_js_1.default)) {
        throw new errors_js_1.JWSInvalid('JWS Signatures missing or incorrect type');
    }
    for (const signature of jws.signatures) {
        try {
            return await (0, verify_js_1.flattenedVerify)({
                header: signature.header,
                payload: jws.payload,
                protected: signature.protected,
                signature: signature.signature,
            }, key, options);
        }
        catch {
        }
    }
    throw new errors_js_1.JWSSignatureVerificationFailed();
}
exports.generalVerify = generalVerify;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwt/decrypt.js":
/*!************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwt/decrypt.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtDecrypt = void 0;
const decrypt_js_1 = __webpack_require__(/*! ../jwe/compact/decrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/compact/decrypt.js");
const jwt_claims_set_js_1 = __webpack_require__(/*! ../lib/jwt_claims_set.js */ "../../node_modules/jose/dist/node/cjs/lib/jwt_claims_set.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
async function jwtDecrypt(jwt, key, options) {
    const decrypted = await (0, decrypt_js_1.compactDecrypt)(jwt, key, options);
    const payload = (0, jwt_claims_set_js_1.default)(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== undefined && protectedHeader.iss !== payload.iss) {
        throw new errors_js_1.JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', 'iss', 'mismatch');
    }
    if (protectedHeader.sub !== undefined && protectedHeader.sub !== payload.sub) {
        throw new errors_js_1.JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', 'sub', 'mismatch');
    }
    if (protectedHeader.aud !== undefined &&
        JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
        throw new errors_js_1.JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', 'aud', 'mismatch');
    }
    const result = { payload, protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: decrypted.key };
    }
    return result;
}
exports.jwtDecrypt = jwtDecrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwt/encrypt.js":
/*!************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwt/encrypt.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EncryptJWT = void 0;
const encrypt_js_1 = __webpack_require__(/*! ../jwe/compact/encrypt.js */ "../../node_modules/jose/dist/node/cjs/jwe/compact/encrypt.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const produce_js_1 = __webpack_require__(/*! ./produce.js */ "../../node_modules/jose/dist/node/cjs/jwt/produce.js");
class EncryptJWT extends produce_js_1.ProduceJWT {
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError('setProtectedHeader can only be called once');
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError('setKeyManagementParameters can only be called once');
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError('setContentEncryptionKey can only be called once');
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError('setInitializationVector can only be called once');
        }
        this._iv = iv;
        return this;
    }
    replicateIssuerAsHeader() {
        this._replicateIssuerAsHeader = true;
        return this;
    }
    replicateSubjectAsHeader() {
        this._replicateSubjectAsHeader = true;
        return this;
    }
    replicateAudienceAsHeader() {
        this._replicateAudienceAsHeader = true;
        return this;
    }
    async encrypt(key, options) {
        const enc = new encrypt_js_1.CompactEncrypt(buffer_utils_js_1.encoder.encode(JSON.stringify(this._payload)));
        if (this._replicateIssuerAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss };
        }
        if (this._replicateSubjectAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub };
        }
        if (this._replicateAudienceAsHeader) {
            this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud };
        }
        enc.setProtectedHeader(this._protectedHeader);
        if (this._iv) {
            enc.setInitializationVector(this._iv);
        }
        if (this._cek) {
            enc.setContentEncryptionKey(this._cek);
        }
        if (this._keyManagementParameters) {
            enc.setKeyManagementParameters(this._keyManagementParameters);
        }
        return enc.encrypt(key, options);
    }
}
exports.EncryptJWT = EncryptJWT;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwt/produce.js":
/*!************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwt/produce.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProduceJWT = void 0;
const epoch_js_1 = __webpack_require__(/*! ../lib/epoch.js */ "../../node_modules/jose/dist/node/cjs/lib/epoch.js");
const is_object_js_1 = __webpack_require__(/*! ../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
const secs_js_1 = __webpack_require__(/*! ../lib/secs.js */ "../../node_modules/jose/dist/node/cjs/lib/secs.js");
class ProduceJWT {
    constructor(payload) {
        if (!(0, is_object_js_1.default)(payload)) {
            throw new TypeError('JWT Claims Set MUST be an object');
        }
        this._payload = payload;
    }
    setIssuer(issuer) {
        this._payload = { ...this._payload, iss: issuer };
        return this;
    }
    setSubject(subject) {
        this._payload = { ...this._payload, sub: subject };
        return this;
    }
    setAudience(audience) {
        this._payload = { ...this._payload, aud: audience };
        return this;
    }
    setJti(jwtId) {
        this._payload = { ...this._payload, jti: jwtId };
        return this;
    }
    setNotBefore(input) {
        if (typeof input === 'number') {
            this._payload = { ...this._payload, nbf: input };
        }
        else {
            this._payload = { ...this._payload, nbf: (0, epoch_js_1.default)(new Date()) + (0, secs_js_1.default)(input) };
        }
        return this;
    }
    setExpirationTime(input) {
        if (typeof input === 'number') {
            this._payload = { ...this._payload, exp: input };
        }
        else {
            this._payload = { ...this._payload, exp: (0, epoch_js_1.default)(new Date()) + (0, secs_js_1.default)(input) };
        }
        return this;
    }
    setIssuedAt(input) {
        if (typeof input === 'undefined') {
            this._payload = { ...this._payload, iat: (0, epoch_js_1.default)(new Date()) };
        }
        else {
            this._payload = { ...this._payload, iat: input };
        }
        return this;
    }
}
exports.ProduceJWT = ProduceJWT;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwt/sign.js":
/*!*********************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwt/sign.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignJWT = void 0;
const sign_js_1 = __webpack_require__(/*! ../jws/compact/sign.js */ "../../node_modules/jose/dist/node/cjs/jws/compact/sign.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const produce_js_1 = __webpack_require__(/*! ./produce.js */ "../../node_modules/jose/dist/node/cjs/jwt/produce.js");
class SignJWT extends produce_js_1.ProduceJWT {
    setProtectedHeader(protectedHeader) {
        this._protectedHeader = protectedHeader;
        return this;
    }
    async sign(key, options) {
        var _a;
        const sig = new sign_js_1.CompactSign(buffer_utils_js_1.encoder.encode(JSON.stringify(this._payload)));
        sig.setProtectedHeader(this._protectedHeader);
        if (Array.isArray((_a = this._protectedHeader) === null || _a === void 0 ? void 0 : _a.crit) &&
            this._protectedHeader.crit.includes('b64') &&
            this._protectedHeader.b64 === false) {
            throw new errors_js_1.JWTInvalid('JWTs MUST NOT use unencoded payload');
        }
        return sig.sign(key, options);
    }
}
exports.SignJWT = SignJWT;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwt/unsecured.js":
/*!**************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwt/unsecured.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnsecuredJWT = void 0;
const base64url = __webpack_require__(/*! ../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const jwt_claims_set_js_1 = __webpack_require__(/*! ../lib/jwt_claims_set.js */ "../../node_modules/jose/dist/node/cjs/lib/jwt_claims_set.js");
const produce_js_1 = __webpack_require__(/*! ./produce.js */ "../../node_modules/jose/dist/node/cjs/jwt/produce.js");
class UnsecuredJWT extends produce_js_1.ProduceJWT {
    encode() {
        const header = base64url.encode(JSON.stringify({ alg: 'none' }));
        const payload = base64url.encode(JSON.stringify(this._payload));
        return `${header}.${payload}.`;
    }
    static decode(jwt, options) {
        if (typeof jwt !== 'string') {
            throw new errors_js_1.JWTInvalid('Unsecured JWT must be a string');
        }
        const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split('.');
        if (length !== 3 || signature !== '') {
            throw new errors_js_1.JWTInvalid('Invalid Unsecured JWT');
        }
        let header;
        try {
            header = JSON.parse(buffer_utils_js_1.decoder.decode(base64url.decode(encodedHeader)));
            if (header.alg !== 'none')
                throw new Error();
        }
        catch {
            throw new errors_js_1.JWTInvalid('Invalid Unsecured JWT');
        }
        const payload = (0, jwt_claims_set_js_1.default)(header, base64url.decode(encodedPayload), options);
        return { payload, header };
    }
}
exports.UnsecuredJWT = UnsecuredJWT;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/jwt/verify.js":
/*!***********************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/jwt/verify.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jwtVerify = void 0;
const verify_js_1 = __webpack_require__(/*! ../jws/compact/verify.js */ "../../node_modules/jose/dist/node/cjs/jws/compact/verify.js");
const jwt_claims_set_js_1 = __webpack_require__(/*! ../lib/jwt_claims_set.js */ "../../node_modules/jose/dist/node/cjs/lib/jwt_claims_set.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
async function jwtVerify(jwt, key, options) {
    var _a;
    const verified = await (0, verify_js_1.compactVerify)(jwt, key, options);
    if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes('b64')) && verified.protectedHeader.b64 === false) {
        throw new errors_js_1.JWTInvalid('JWTs MUST NOT use unencoded payload');
    }
    const payload = (0, jwt_claims_set_js_1.default)(verified.protectedHeader, verified.payload, options);
    const result = { payload, protectedHeader: verified.protectedHeader };
    if (typeof key === 'function') {
        return { ...result, key: verified.key };
    }
    return result;
}
exports.jwtVerify = jwtVerify;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/key/export.js":
/*!***********************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/key/export.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportJWK = exports.exportPKCS8 = exports.exportSPKI = void 0;
const asn1_js_1 = __webpack_require__(/*! ../runtime/asn1.js */ "../../node_modules/jose/dist/node/cjs/runtime/asn1.js");
const asn1_js_2 = __webpack_require__(/*! ../runtime/asn1.js */ "../../node_modules/jose/dist/node/cjs/runtime/asn1.js");
const key_to_jwk_js_1 = __webpack_require__(/*! ../runtime/key_to_jwk.js */ "../../node_modules/jose/dist/node/cjs/runtime/key_to_jwk.js");
async function exportSPKI(key) {
    return (0, asn1_js_1.toSPKI)(key);
}
exports.exportSPKI = exportSPKI;
async function exportPKCS8(key) {
    return (0, asn1_js_2.toPKCS8)(key);
}
exports.exportPKCS8 = exportPKCS8;
async function exportJWK(key) {
    return (0, key_to_jwk_js_1.default)(key);
}
exports.exportJWK = exportJWK;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/key/generate_key_pair.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/key/generate_key_pair.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateKeyPair = void 0;
const generate_js_1 = __webpack_require__(/*! ../runtime/generate.js */ "../../node_modules/jose/dist/node/cjs/runtime/generate.js");
async function generateKeyPair(alg, options) {
    return (0, generate_js_1.generateKeyPair)(alg, options);
}
exports.generateKeyPair = generateKeyPair;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/key/generate_secret.js":
/*!********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/key/generate_secret.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateSecret = void 0;
const generate_js_1 = __webpack_require__(/*! ../runtime/generate.js */ "../../node_modules/jose/dist/node/cjs/runtime/generate.js");
async function generateSecret(alg, options) {
    return (0, generate_js_1.generateSecret)(alg, options);
}
exports.generateSecret = generateSecret;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/key/import.js":
/*!***********************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/key/import.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importJWK = exports.importPKCS8 = exports.importX509 = exports.importSPKI = void 0;
const base64url_js_1 = __webpack_require__(/*! ../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const asn1_js_1 = __webpack_require__(/*! ../runtime/asn1.js */ "../../node_modules/jose/dist/node/cjs/runtime/asn1.js");
const asn1_js_2 = __webpack_require__(/*! ../runtime/asn1.js */ "../../node_modules/jose/dist/node/cjs/runtime/asn1.js");
const jwk_to_key_js_1 = __webpack_require__(/*! ../runtime/jwk_to_key.js */ "../../node_modules/jose/dist/node/cjs/runtime/jwk_to_key.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const format_pem_js_1 = __webpack_require__(/*! ../lib/format_pem.js */ "../../node_modules/jose/dist/node/cjs/lib/format_pem.js");
const is_object_js_1 = __webpack_require__(/*! ../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
function getElement(seq) {
    let result = [];
    let next = 0;
    while (next < seq.length) {
        let nextPart = parseElement(seq.subarray(next));
        result.push(nextPart);
        next += nextPart.byteLength;
    }
    return result;
}
function parseElement(bytes) {
    let position = 0;
    let tag = bytes[0] & 0x1f;
    position++;
    if (tag === 0x1f) {
        tag = 0;
        while (bytes[position] >= 0x80) {
            tag = tag * 128 + bytes[position] - 0x80;
            position++;
        }
        tag = tag * 128 + bytes[position] - 0x80;
        position++;
    }
    let length = 0;
    if (bytes[position] < 0x80) {
        length = bytes[position];
        position++;
    }
    else {
        let numberOfDigits = bytes[position] & 0x7f;
        position++;
        length = 0;
        for (let i = 0; i < numberOfDigits; i++) {
            length = length * 256 + bytes[position];
            position++;
        }
    }
    if (length === 0x80) {
        length = 0;
        while (bytes[position + length] !== 0 || bytes[position + length + 1] !== 0) {
            length++;
        }
        const byteLength = position + length + 2;
        return {
            byteLength,
            contents: bytes.subarray(position, position + length),
            raw: bytes.subarray(0, byteLength),
        };
    }
    const byteLength = position + length;
    return {
        byteLength,
        contents: bytes.subarray(position, byteLength),
        raw: bytes.subarray(0, byteLength),
    };
}
function spkiFromX509(buf) {
    const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
    return (0, base64url_js_1.encodeBase64)(tbsCertificate[tbsCertificate[0].raw[0] === 0xa0 ? 6 : 5].raw);
}
function getSPKI(x509) {
    const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '');
    const raw = (0, base64url_js_1.decodeBase64)(pem);
    return (0, format_pem_js_1.default)(spkiFromX509(raw), 'PUBLIC KEY');
}
async function importSPKI(spki, alg, options) {
    if (typeof spki !== 'string' || spki.indexOf('-----BEGIN PUBLIC KEY-----') !== 0) {
        throw new TypeError('"spki" must be SPKI formatted string');
    }
    return (0, asn1_js_1.fromSPKI)(spki, alg, options);
}
exports.importSPKI = importSPKI;
async function importX509(x509, alg, options) {
    if (typeof x509 !== 'string' || x509.indexOf('-----BEGIN CERTIFICATE-----') !== 0) {
        throw new TypeError('"x509" must be X.509 formatted string');
    }
    const spki = getSPKI(x509);
    return (0, asn1_js_1.fromSPKI)(spki, alg, options);
}
exports.importX509 = importX509;
async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== 'string' || pkcs8.indexOf('-----BEGIN PRIVATE KEY-----') !== 0) {
        throw new TypeError('"pkcs8" must be PCKS8 formatted string');
    }
    return (0, asn1_js_2.fromPKCS8)(pkcs8, alg, options);
}
exports.importPKCS8 = importPKCS8;
async function importJWK(jwk, alg, octAsKeyObject) {
    if (!(0, is_object_js_1.default)(jwk)) {
        throw new TypeError('JWK must be an object');
    }
    alg || (alg = jwk.alg);
    if (typeof alg !== 'string' || !alg) {
        throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    switch (jwk.kty) {
        case 'oct':
            if (typeof jwk.k !== 'string' || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : (octAsKeyObject = jwk.ext !== true);
            if (octAsKeyObject) {
                return (0, jwk_to_key_js_1.default)({ ...jwk, alg, ext: false });
            }
            return (0, base64url_js_1.decode)(jwk.k);
        case 'RSA':
            if (jwk.oth !== undefined) {
                throw new errors_js_1.JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case 'EC':
        case 'OKP':
            return (0, jwk_to_key_js_1.default)({ ...jwk, alg });
        default:
            throw new errors_js_1.JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
}
exports.importJWK = importJWK;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/aesgcmkw.js":
/*!*************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/aesgcmkw.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unwrap = exports.wrap = void 0;
const encrypt_js_1 = __webpack_require__(/*! ../runtime/encrypt.js */ "../../node_modules/jose/dist/node/cjs/runtime/encrypt.js");
const decrypt_js_1 = __webpack_require__(/*! ../runtime/decrypt.js */ "../../node_modules/jose/dist/node/cjs/runtime/decrypt.js");
const iv_js_1 = __webpack_require__(/*! ./iv.js */ "../../node_modules/jose/dist/node/cjs/lib/iv.js");
const base64url_js_1 = __webpack_require__(/*! ../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
async function wrap(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    iv || (iv = (0, iv_js_1.default)(jweAlgorithm));
    const { ciphertext: encryptedKey, tag } = await (0, encrypt_js_1.default)(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return { encryptedKey, iv: (0, base64url_js_1.encode)(iv), tag: (0, base64url_js_1.encode)(tag) };
}
exports.wrap = wrap;
async function unwrap(alg, key, encryptedKey, iv, tag) {
    const jweAlgorithm = alg.slice(0, 7);
    return (0, decrypt_js_1.default)(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
}
exports.unwrap = unwrap;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.concatKdf = exports.lengthAndInput = exports.uint32be = exports.uint64be = exports.p2s = exports.concat = exports.decoder = exports.encoder = void 0;
const digest_js_1 = __webpack_require__(/*! ../runtime/digest.js */ "../../node_modules/jose/dist/node/cjs/runtime/digest.js");
exports.encoder = new TextEncoder();
exports.decoder = new TextDecoder();
const MAX_INT32 = 2 ** 32;
function concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    buffers.forEach((buffer) => {
        buf.set(buffer, i);
        i += buffer.length;
    });
    return buf;
}
exports.concat = concat;
function p2s(alg, p2sInput) {
    return concat(exports.encoder.encode(alg), new Uint8Array([0]), p2sInput);
}
exports.p2s = p2s;
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([value >>> 24, value >>> 16, value >>> 8, value & 0xff], offset);
}
function uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
}
exports.uint64be = uint64be;
function uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
}
exports.uint32be = uint32be;
function lengthAndInput(input) {
    return concat(uint32be(input.length), input);
}
exports.lengthAndInput = lengthAndInput;
async function concatKdf(secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for (let iter = 0; iter < iterations; iter++) {
        const buf = new Uint8Array(4 + secret.length + value.length);
        buf.set(uint32be(iter + 1));
        buf.set(secret, 4);
        buf.set(value, 4 + secret.length);
        res.set(await (0, digest_js_1.default)('sha256', buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
}
exports.concatKdf = concatKdf;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/cek.js":
/*!********************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/cek.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bitLength = void 0;
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const random_js_1 = __webpack_require__(/*! ../runtime/random.js */ "../../node_modules/jose/dist/node/cjs/runtime/random.js");
function bitLength(alg) {
    switch (alg) {
        case 'A128GCM':
            return 128;
        case 'A192GCM':
            return 192;
        case 'A256GCM':
        case 'A128CBC-HS256':
            return 256;
        case 'A192CBC-HS384':
            return 384;
        case 'A256CBC-HS512':
            return 512;
        default:
            throw new errors_js_1.JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
exports.bitLength = bitLength;
exports["default"] = (alg) => (0, random_js_1.default)(new Uint8Array(bitLength(alg) >> 3));


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/check_iv_length.js":
/*!********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/check_iv_length.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const iv_js_1 = __webpack_require__(/*! ./iv.js */ "../../node_modules/jose/dist/node/cjs/lib/iv.js");
const checkIvLength = (enc, iv) => {
    if (iv.length << 3 !== (0, iv_js_1.bitLength)(enc)) {
        throw new errors_js_1.JWEInvalid('Invalid Initialization Vector length');
    }
};
exports["default"] = checkIvLength;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/check_key_type.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/check_key_type.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const invalid_key_input_js_1 = __webpack_require__(/*! ./invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const is_key_like_js_1 = __webpack_require__(/*! ../runtime/is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
const symmetricTypeCheck = (key) => {
    if (key instanceof Uint8Array)
        return;
    if (!(0, is_key_like_js_1.default)(key)) {
        throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, 'Uint8Array'));
    }
    if (key.type !== 'secret') {
        throw new TypeError(`${is_key_like_js_1.types.join(' or ')} instances for symmetric algorithms must be of type "secret"`);
    }
};
const asymmetricTypeCheck = (key, usage) => {
    if (!(0, is_key_like_js_1.default)(key)) {
        throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
    }
    if (key.type === 'secret') {
        throw new TypeError(`${is_key_like_js_1.types.join(' or ')} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (usage === 'sign' && key.type === 'public') {
        throw new TypeError(`${is_key_like_js_1.types.join(' or ')} instances for asymmetric algorithm signing must be of type "private"`);
    }
    if (usage === 'decrypt' && key.type === 'public') {
        throw new TypeError(`${is_key_like_js_1.types.join(' or ')} instances for asymmetric algorithm decryption must be of type "private"`);
    }
    if (key.algorithm && usage === 'verify' && key.type === 'private') {
        throw new TypeError(`${is_key_like_js_1.types.join(' or ')} instances for asymmetric algorithm verifying must be of type "public"`);
    }
    if (key.algorithm && usage === 'encrypt' && key.type === 'private') {
        throw new TypeError(`${is_key_like_js_1.types.join(' or ')} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
const checkKeyType = (alg, key, usage) => {
    const symmetric = alg.startsWith('HS') ||
        alg === 'dir' ||
        alg.startsWith('PBES2') ||
        /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
        symmetricTypeCheck(key);
    }
    else {
        asymmetricTypeCheck(key, usage);
    }
};
exports["default"] = checkKeyType;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/check_p2s.js":
/*!**************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/check_p2s.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
function checkP2s(p2s) {
    if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
        throw new errors_js_1.JWEInvalid('PBES2 Salt Input must be 8 or more octets');
    }
}
exports["default"] = checkP2s;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/crypto_key.js":
/*!***************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/crypto_key.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkEncCryptoKey = exports.checkSigCryptoKey = void 0;
const env_js_1 = __webpack_require__(/*! ../runtime/env.js */ "../../node_modules/jose/dist/node/cjs/runtime/env.js");
function unusable(name, prop = 'algorithm.name') {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
}
function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
    switch (alg) {
        case 'ES256':
            return 'P-256';
        case 'ES384':
            return 'P-384';
        case 'ES512':
            return 'P-521';
        default:
            throw new Error('unreachable');
    }
}
function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
        let msg = 'CryptoKey does not support this operation, its usages must include ';
        if (usages.length > 2) {
            const last = usages.pop();
            msg += `one of ${usages.join(', ')}, or ${last}.`;
        }
        else if (usages.length === 2) {
            msg += `one of ${usages[0]} or ${usages[1]}.`;
        }
        else {
            msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
    }
}
function checkSigCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case 'HS256':
        case 'HS384':
        case 'HS512': {
            if (!isAlgorithm(key.algorithm, 'HMAC'))
                throw unusable('HMAC');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'RS256':
        case 'RS384':
        case 'RS512': {
            if (!isAlgorithm(key.algorithm, 'RSASSA-PKCS1-v1_5'))
                throw unusable('RSASSA-PKCS1-v1_5');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case 'PS256':
        case 'PS384':
        case 'PS512': {
            if (!isAlgorithm(key.algorithm, 'RSA-PSS'))
                throw unusable('RSA-PSS');
            const expected = parseInt(alg.slice(2), 10);
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        case (0, env_js_1.isNodeJs)() && 'EdDSA': {
            if (key.algorithm.name !== 'NODE-ED25519' && key.algorithm.name !== 'NODE-ED448')
                throw unusable('NODE-ED25519 or NODE-ED448');
            break;
        }
        case (0, env_js_1.isCloudflareWorkers)() && 'EdDSA': {
            if (!isAlgorithm(key.algorithm, 'NODE-ED25519'))
                throw unusable('NODE-ED25519');
            break;
        }
        case 'ES256':
        case 'ES384':
        case 'ES512': {
            if (!isAlgorithm(key.algorithm, 'ECDSA'))
                throw unusable('ECDSA');
            const expected = getNamedCurve(alg);
            const actual = key.algorithm.namedCurve;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.namedCurve');
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}
exports.checkSigCryptoKey = checkSigCryptoKey;
function checkEncCryptoKey(key, alg, ...usages) {
    switch (alg) {
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM': {
            if (!isAlgorithm(key.algorithm, 'AES-GCM'))
                throw unusable('AES-GCM');
            const expected = parseInt(alg.slice(1, 4), 10);
            const actual = key.algorithm.length;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.length');
            break;
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            if (!isAlgorithm(key.algorithm, 'AES-KW'))
                throw unusable('AES-KW');
            const expected = parseInt(alg.slice(1, 4), 10);
            const actual = key.algorithm.length;
            if (actual !== expected)
                throw unusable(expected, 'algorithm.length');
            break;
        }
        case 'ECDH':
            if (!isAlgorithm(key.algorithm, 'ECDH'))
                throw unusable('ECDH');
            break;
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW':
            if (!isAlgorithm(key.algorithm, 'PBKDF2'))
                throw unusable('PBKDF2');
            break;
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            if (!isAlgorithm(key.algorithm, 'RSA-OAEP'))
                throw unusable('RSA-OAEP');
            const expected = parseInt(alg.slice(9), 10) || 1;
            const actual = getHashLength(key.algorithm.hash);
            if (actual !== expected)
                throw unusable(`SHA-${expected}`, 'algorithm.hash');
            break;
        }
        default:
            throw new TypeError('CryptoKey does not support this operation');
    }
    checkUsage(key, usages);
}
exports.checkEncCryptoKey = checkEncCryptoKey;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/decrypt_key_management.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/decrypt_key_management.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const aeskw_js_1 = __webpack_require__(/*! ../runtime/aeskw.js */ "../../node_modules/jose/dist/node/cjs/runtime/aeskw.js");
const ECDH = __webpack_require__(/*! ../runtime/ecdhes.js */ "../../node_modules/jose/dist/node/cjs/runtime/ecdhes.js");
const pbes2kw_js_1 = __webpack_require__(/*! ../runtime/pbes2kw.js */ "../../node_modules/jose/dist/node/cjs/runtime/pbes2kw.js");
const rsaes_js_1 = __webpack_require__(/*! ../runtime/rsaes.js */ "../../node_modules/jose/dist/node/cjs/runtime/rsaes.js");
const base64url_js_1 = __webpack_require__(/*! ../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const cek_js_1 = __webpack_require__(/*! ../lib/cek.js */ "../../node_modules/jose/dist/node/cjs/lib/cek.js");
const import_js_1 = __webpack_require__(/*! ../key/import.js */ "../../node_modules/jose/dist/node/cjs/key/import.js");
const check_key_type_js_1 = __webpack_require__(/*! ./check_key_type.js */ "../../node_modules/jose/dist/node/cjs/lib/check_key_type.js");
const is_object_js_1 = __webpack_require__(/*! ./is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
const aesgcmkw_js_1 = __webpack_require__(/*! ./aesgcmkw.js */ "../../node_modules/jose/dist/node/cjs/lib/aesgcmkw.js");
async function decryptKeyManagement(alg, key, encryptedKey, joseHeader) {
    (0, check_key_type_js_1.default)(alg, key, 'decrypt');
    switch (alg) {
        case 'dir': {
            if (encryptedKey !== undefined)
                throw new errors_js_1.JWEInvalid('Encountered unexpected JWE Encrypted Key');
            return key;
        }
        case 'ECDH-ES':
            if (encryptedKey !== undefined)
                throw new errors_js_1.JWEInvalid('Encountered unexpected JWE Encrypted Key');
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW': {
            if (!(0, is_object_js_1.default)(joseHeader.epk))
                throw new errors_js_1.JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
            if (!ECDH.ecdhAllowed(key))
                throw new errors_js_1.JOSENotSupported('ECDH with the provided key is not allowed or not supported by your javascript runtime');
            const epk = await (0, import_js_1.importJWK)(joseHeader.epk, alg);
            let partyUInfo;
            let partyVInfo;
            if (joseHeader.apu !== undefined) {
                if (typeof joseHeader.apu !== 'string')
                    throw new errors_js_1.JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
                partyUInfo = (0, base64url_js_1.decode)(joseHeader.apu);
            }
            if (joseHeader.apv !== undefined) {
                if (typeof joseHeader.apv !== 'string')
                    throw new errors_js_1.JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
                partyVInfo = (0, base64url_js_1.decode)(joseHeader.apv);
            }
            const sharedSecret = await ECDH.deriveKey(epk, key, alg === 'ECDH-ES' ? joseHeader.enc : alg, alg === 'ECDH-ES' ? (0, cek_js_1.bitLength)(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
            if (alg === 'ECDH-ES')
                return sharedSecret;
            if (encryptedKey === undefined)
                throw new errors_js_1.JWEInvalid('JWE Encrypted Key missing');
            return (0, aeskw_js_1.unwrap)(alg.slice(-6), sharedSecret, encryptedKey);
        }
        case 'RSA1_5':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            if (encryptedKey === undefined)
                throw new errors_js_1.JWEInvalid('JWE Encrypted Key missing');
            return (0, rsaes_js_1.decrypt)(alg, key, encryptedKey);
        }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW': {
            if (encryptedKey === undefined)
                throw new errors_js_1.JWEInvalid('JWE Encrypted Key missing');
            if (typeof joseHeader.p2c !== 'number')
                throw new errors_js_1.JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
            if (typeof joseHeader.p2s !== 'string')
                throw new errors_js_1.JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
            return (0, pbes2kw_js_1.decrypt)(alg, key, encryptedKey, joseHeader.p2c, (0, base64url_js_1.decode)(joseHeader.p2s));
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            if (encryptedKey === undefined)
                throw new errors_js_1.JWEInvalid('JWE Encrypted Key missing');
            return (0, aeskw_js_1.unwrap)(alg, key, encryptedKey);
        }
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW': {
            if (encryptedKey === undefined)
                throw new errors_js_1.JWEInvalid('JWE Encrypted Key missing');
            if (typeof joseHeader.iv !== 'string')
                throw new errors_js_1.JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
            if (typeof joseHeader.tag !== 'string')
                throw new errors_js_1.JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
            const iv = (0, base64url_js_1.decode)(joseHeader.iv);
            const tag = (0, base64url_js_1.decode)(joseHeader.tag);
            return (0, aesgcmkw_js_1.unwrap)(alg, key, encryptedKey, iv, tag);
        }
        default: {
            throw new errors_js_1.JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
    }
}
exports["default"] = decryptKeyManagement;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/encrypt_key_management.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/encrypt_key_management.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const aeskw_js_1 = __webpack_require__(/*! ../runtime/aeskw.js */ "../../node_modules/jose/dist/node/cjs/runtime/aeskw.js");
const ECDH = __webpack_require__(/*! ../runtime/ecdhes.js */ "../../node_modules/jose/dist/node/cjs/runtime/ecdhes.js");
const pbes2kw_js_1 = __webpack_require__(/*! ../runtime/pbes2kw.js */ "../../node_modules/jose/dist/node/cjs/runtime/pbes2kw.js");
const rsaes_js_1 = __webpack_require__(/*! ../runtime/rsaes.js */ "../../node_modules/jose/dist/node/cjs/runtime/rsaes.js");
const base64url_js_1 = __webpack_require__(/*! ../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const cek_js_1 = __webpack_require__(/*! ../lib/cek.js */ "../../node_modules/jose/dist/node/cjs/lib/cek.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const export_js_1 = __webpack_require__(/*! ../key/export.js */ "../../node_modules/jose/dist/node/cjs/key/export.js");
const check_key_type_js_1 = __webpack_require__(/*! ./check_key_type.js */ "../../node_modules/jose/dist/node/cjs/lib/check_key_type.js");
const aesgcmkw_js_1 = __webpack_require__(/*! ./aesgcmkw.js */ "../../node_modules/jose/dist/node/cjs/lib/aesgcmkw.js");
async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    (0, check_key_type_js_1.default)(alg, key, 'encrypt');
    switch (alg) {
        case 'dir': {
            cek = key;
            break;
        }
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW': {
            if (!ECDH.ecdhAllowed(key)) {
                throw new errors_js_1.JOSENotSupported('ECDH with the provided key is not allowed or not supported by your javascript runtime');
            }
            const { apu, apv } = providedParameters;
            let { epk: ephemeralKey } = providedParameters;
            ephemeralKey || (ephemeralKey = (await ECDH.generateEpk(key)).privateKey);
            const { x, y, crv, kty } = await (0, export_js_1.exportJWK)(ephemeralKey);
            const sharedSecret = await ECDH.deriveKey(key, ephemeralKey, alg === 'ECDH-ES' ? enc : alg, alg === 'ECDH-ES' ? (0, cek_js_1.bitLength)(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
            parameters = { epk: { x, crv, kty } };
            if (kty === 'EC')
                parameters.epk.y = y;
            if (apu)
                parameters.apu = (0, base64url_js_1.encode)(apu);
            if (apv)
                parameters.apv = (0, base64url_js_1.encode)(apv);
            if (alg === 'ECDH-ES') {
                cek = sharedSecret;
                break;
            }
            cek = providedCek || (0, cek_js_1.default)(enc);
            const kwAlg = alg.slice(-6);
            encryptedKey = await (0, aeskw_js_1.wrap)(kwAlg, sharedSecret, cek);
            break;
        }
        case 'RSA1_5':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512': {
            cek = providedCek || (0, cek_js_1.default)(enc);
            encryptedKey = await (0, rsaes_js_1.encrypt)(alg, key, cek);
            break;
        }
        case 'PBES2-HS256+A128KW':
        case 'PBES2-HS384+A192KW':
        case 'PBES2-HS512+A256KW': {
            cek = providedCek || (0, cek_js_1.default)(enc);
            const { p2c, p2s } = providedParameters;
            ({ encryptedKey, ...parameters } = await (0, pbes2kw_js_1.encrypt)(alg, key, cek, p2c, p2s));
            break;
        }
        case 'A128KW':
        case 'A192KW':
        case 'A256KW': {
            cek = providedCek || (0, cek_js_1.default)(enc);
            encryptedKey = await (0, aeskw_js_1.wrap)(alg, key, cek);
            break;
        }
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW': {
            cek = providedCek || (0, cek_js_1.default)(enc);
            const { iv } = providedParameters;
            ({ encryptedKey, ...parameters } = await (0, aesgcmkw_js_1.wrap)(alg, key, cek, iv));
            break;
        }
        default: {
            throw new errors_js_1.JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
        }
    }
    return { cek, encryptedKey, parameters };
}
exports["default"] = encryptKeyManagement;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/epoch.js":
/*!**********************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/epoch.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (date) => Math.floor(date.getTime() / 1000);


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/format_pem.js":
/*!***************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/format_pem.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (b64, descriptor) => {
    const newlined = (b64.match(/.{1,64}/g) || []).join('\n');
    return `-----BEGIN ${descriptor}-----\n${newlined}\n-----END ${descriptor}-----`;
};


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (actual, ...types) => {
    let msg = 'Key must be ';
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(', ')}, or ${last}.`;
    }
    else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
    }
    else {
        msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
        msg += ` Received ${actual}`;
    }
    else if (typeof actual === 'function' && actual.name) {
        msg += ` Received function ${actual.name}`;
    }
    else if (typeof actual === 'object' && actual != null) {
        if (actual.constructor && actual.constructor.name) {
            msg += ` Received an instance of ${actual.constructor.name}`;
        }
    }
    return msg;
};


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/is_disjoint.js":
/*!****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/is_disjoint.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const isDisjoint = (...headers) => {
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources) {
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters) {
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
};
exports["default"] = isDisjoint;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/is_object.js":
/*!**************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/is_object.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}
function isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}
exports["default"] = isObject;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/iv.js":
/*!*******************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/iv.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bitLength = void 0;
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const random_js_1 = __webpack_require__(/*! ../runtime/random.js */ "../../node_modules/jose/dist/node/cjs/runtime/random.js");
function bitLength(alg) {
    switch (alg) {
        case 'A128GCM':
        case 'A128GCMKW':
        case 'A192GCM':
        case 'A192GCMKW':
        case 'A256GCM':
        case 'A256GCMKW':
            return 96;
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return 128;
        default:
            throw new errors_js_1.JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
exports.bitLength = bitLength;
exports["default"] = (alg) => (0, random_js_1.default)(new Uint8Array(bitLength(alg) >> 3));


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/jwt_claims_set.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/jwt_claims_set.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ./buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const epoch_js_1 = __webpack_require__(/*! ./epoch.js */ "../../node_modules/jose/dist/node/cjs/lib/epoch.js");
const secs_js_1 = __webpack_require__(/*! ./secs.js */ "../../node_modules/jose/dist/node/cjs/lib/secs.js");
const is_object_js_1 = __webpack_require__(/*! ./is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
const normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, '');
const checkAudiencePresence = (audPayload, audOption) => {
    if (typeof audPayload === 'string') {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
exports["default"] = (protectedHeader, encodedPayload, options = {}) => {
    const { typ } = options;
    if (typ &&
        (typeof protectedHeader.typ !== 'string' ||
            normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new errors_js_1.JWTClaimValidationFailed('unexpected "typ" JWT header value', 'typ', 'check_failed');
    }
    let payload;
    try {
        payload = JSON.parse(buffer_utils_js_1.decoder.decode(encodedPayload));
    }
    catch {
    }
    if (!(0, is_object_js_1.default)(payload)) {
        throw new errors_js_1.JWTInvalid('JWT Claims Set must be a top-level JSON object');
    }
    const { issuer } = options;
    if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
        throw new errors_js_1.JWTClaimValidationFailed('unexpected "iss" claim value', 'iss', 'check_failed');
    }
    const { subject } = options;
    if (subject && payload.sub !== subject) {
        throw new errors_js_1.JWTClaimValidationFailed('unexpected "sub" claim value', 'sub', 'check_failed');
    }
    const { audience } = options;
    if (audience &&
        !checkAudiencePresence(payload.aud, typeof audience === 'string' ? [audience] : audience)) {
        throw new errors_js_1.JWTClaimValidationFailed('unexpected "aud" claim value', 'aud', 'check_failed');
    }
    let tolerance;
    switch (typeof options.clockTolerance) {
        case 'string':
            tolerance = (0, secs_js_1.default)(options.clockTolerance);
            break;
        case 'number':
            tolerance = options.clockTolerance;
            break;
        case 'undefined':
            tolerance = 0;
            break;
        default:
            throw new TypeError('Invalid clockTolerance option type');
    }
    const { currentDate } = options;
    const now = (0, epoch_js_1.default)(currentDate || new Date());
    if ((payload.iat !== undefined || options.maxTokenAge) && typeof payload.iat !== 'number') {
        throw new errors_js_1.JWTClaimValidationFailed('"iat" claim must be a number', 'iat', 'invalid');
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== 'number') {
            throw new errors_js_1.JWTClaimValidationFailed('"nbf" claim must be a number', 'nbf', 'invalid');
        }
        if (payload.nbf > now + tolerance) {
            throw new errors_js_1.JWTClaimValidationFailed('"nbf" claim timestamp check failed', 'nbf', 'check_failed');
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== 'number') {
            throw new errors_js_1.JWTClaimValidationFailed('"exp" claim must be a number', 'exp', 'invalid');
        }
        if (payload.exp <= now - tolerance) {
            throw new errors_js_1.JWTExpired('"exp" claim timestamp check failed', 'exp', 'check_failed');
        }
    }
    if (options.maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof options.maxTokenAge === 'number' ? options.maxTokenAge : (0, secs_js_1.default)(options.maxTokenAge);
        if (age - tolerance > max) {
            throw new errors_js_1.JWTExpired('"iat" claim timestamp check failed (too far in the past)', 'iat', 'check_failed');
        }
        if (age < 0 - tolerance) {
            throw new errors_js_1.JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', 'iat', 'check_failed');
        }
    }
    return payload;
};


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/secs.js":
/*!*********************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/secs.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
exports["default"] = (str) => {
    const matched = REGEX.exec(str);
    if (!matched) {
        throw new TypeError('Invalid time period format');
    }
    const value = parseFloat(matched[1]);
    const unit = matched[2].toLowerCase();
    switch (unit) {
        case 'sec':
        case 'secs':
        case 'second':
        case 'seconds':
        case 's':
            return Math.round(value);
        case 'minute':
        case 'minutes':
        case 'min':
        case 'mins':
        case 'm':
            return Math.round(value * minute);
        case 'hour':
        case 'hours':
        case 'hr':
        case 'hrs':
        case 'h':
            return Math.round(value * hour);
        case 'day':
        case 'days':
        case 'd':
            return Math.round(value * day);
        case 'week':
        case 'weeks':
        case 'w':
            return Math.round(value * week);
        default:
            return Math.round(value * year);
    }
};


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/validate_algorithms.js":
/*!************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/validate_algorithms.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validateAlgorithms = (option, algorithms) => {
    if (algorithms !== undefined &&
        (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== 'string'))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
};
exports["default"] = validateAlgorithms;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/lib/validate_crit.js":
/*!******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/lib/validate_crit.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) ||
        protectedHeader.crit.length === 0 ||
        protectedHeader.crit.some((input) => typeof input !== 'string' || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    }
    else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
        if (!recognized.has(parameter)) {
            throw new errors_js_1.JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        }
        else if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}
exports["default"] = validateCrit;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/aeskw.js":
/*!**************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/aeskw.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unwrap = exports.wrap = void 0;
const buffer_1 = __webpack_require__(/*! buffer */ "buffer");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const crypto_key_js_1 = __webpack_require__(/*! ../lib/crypto_key.js */ "../../node_modules/jose/dist/node/cjs/lib/crypto_key.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const ciphers_js_1 = __webpack_require__(/*! ./ciphers.js */ "../../node_modules/jose/dist/node/cjs/runtime/ciphers.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
function checkKeySize(key, alg) {
    if (key.symmetricKeySize << 3 !== parseInt(alg.slice(1, 4), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
}
function ensureKeyObject(key, alg, usage) {
    if ((0, is_key_object_js_1.default)(key)) {
        return key;
    }
    if (key instanceof Uint8Array) {
        return (0, crypto_1.createSecretKey)(key);
    }
    if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(key, alg, usage);
        return crypto_1.KeyObject.from(key);
    }
    throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, 'Uint8Array'));
}
const wrap = (alg, key, cek) => {
    const size = parseInt(alg.slice(1, 4), 10);
    const algorithm = `aes${size}-wrap`;
    if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
    const keyObject = ensureKeyObject(key, alg, 'wrapKey');
    checkKeySize(keyObject, alg);
    const cipher = (0, crypto_1.createCipheriv)(algorithm, keyObject, buffer_1.Buffer.alloc(8, 0xa6));
    return (0, buffer_utils_js_1.concat)(cipher.update(cek), cipher.final());
};
exports.wrap = wrap;
const unwrap = (alg, key, encryptedKey) => {
    const size = parseInt(alg.slice(1, 4), 10);
    const algorithm = `aes${size}-wrap`;
    if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
    const keyObject = ensureKeyObject(key, alg, 'unwrapKey');
    checkKeySize(keyObject, alg);
    const cipher = (0, crypto_1.createDecipheriv)(algorithm, keyObject, buffer_1.Buffer.alloc(8, 0xa6));
    return (0, buffer_utils_js_1.concat)(cipher.update(encryptedKey), cipher.final());
};
exports.unwrap = unwrap;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/asn1.js":
/*!*************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/asn1.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fromSPKI = exports.fromPKCS8 = exports.toPKCS8 = exports.toSPKI = void 0;
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const buffer_1 = __webpack_require__(/*! buffer */ "buffer");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
const genericExport = (keyType, keyFormat, key) => {
    let keyObject;
    if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        if (!key.extractable) {
            throw new TypeError('CryptoKey is not extractable');
        }
        keyObject = crypto_1.KeyObject.from(key);
    }
    else if ((0, is_key_object_js_1.default)(key)) {
        keyObject = key;
    }
    else {
        throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
    }
    if (keyObject.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
    }
    return keyObject.export({ format: 'pem', type: keyFormat });
};
const toSPKI = (key) => {
    return genericExport('public', 'spki', key);
};
exports.toSPKI = toSPKI;
const toPKCS8 = (key) => {
    return genericExport('private', 'pkcs8', key);
};
exports.toPKCS8 = toPKCS8;
const fromPKCS8 = (pem) => (0, crypto_1.createPrivateKey)({
    key: buffer_1.Buffer.from(pem.replace(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, ''), 'base64'),
    type: 'pkcs8',
    format: 'der',
});
exports.fromPKCS8 = fromPKCS8;
const fromSPKI = (pem) => (0, crypto_1.createPublicKey)({
    key: buffer_1.Buffer.from(pem.replace(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, ''), 'base64'),
    type: 'spki',
    format: 'der',
});
exports.fromSPKI = fromSPKI;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/asn1_sequence_decoder.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/asn1_sequence_decoder.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tagInteger = 0x02;
const tagSequence = 0x30;
class Asn1SequenceDecoder {
    constructor(buffer) {
        if (buffer[0] !== tagSequence) {
            throw new TypeError();
        }
        this.buffer = buffer;
        this.offset = 1;
        const len = this.decodeLength();
        if (len !== buffer.length - this.offset) {
            throw new TypeError();
        }
    }
    decodeLength() {
        let length = this.buffer[this.offset++];
        if (length & 0x80) {
            const nBytes = length & ~0x80;
            length = 0;
            for (let i = 0; i < nBytes; i++)
                length = (length << 8) | this.buffer[this.offset + i];
            this.offset += nBytes;
        }
        return length;
    }
    unsignedInteger() {
        if (this.buffer[this.offset++] !== tagInteger) {
            throw new TypeError();
        }
        let length = this.decodeLength();
        if (this.buffer[this.offset] === 0) {
            this.offset++;
            length--;
        }
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
    }
    end() {
        if (this.offset !== this.buffer.length) {
            throw new TypeError();
        }
    }
}
exports["default"] = Asn1SequenceDecoder;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/asn1_sequence_encoder.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/asn1_sequence_encoder.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const buffer_1 = __webpack_require__(/*! buffer */ "buffer");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const tagInteger = 0x02;
const tagBitStr = 0x03;
const tagOctStr = 0x04;
const tagSequence = 0x30;
const bZero = buffer_1.Buffer.from([0x00]);
const bTagInteger = buffer_1.Buffer.from([tagInteger]);
const bTagBitStr = buffer_1.Buffer.from([tagBitStr]);
const bTagSequence = buffer_1.Buffer.from([tagSequence]);
const bTagOctStr = buffer_1.Buffer.from([tagOctStr]);
const encodeLength = (len) => {
    if (len < 128)
        return buffer_1.Buffer.from([len]);
    const buffer = buffer_1.Buffer.alloc(5);
    buffer.writeUInt32BE(len, 1);
    let offset = 1;
    while (buffer[offset] === 0)
        offset++;
    buffer[offset - 1] = 0x80 | (5 - offset);
    return buffer.slice(offset - 1);
};
const oids = new Map([
    ['P-256', buffer_1.Buffer.from('06 08 2A 86 48 CE 3D 03 01 07'.replace(/ /g, ''), 'hex')],
    ['secp256k1', buffer_1.Buffer.from('06 05 2B 81 04 00 0A'.replace(/ /g, ''), 'hex')],
    ['P-384', buffer_1.Buffer.from('06 05 2B 81 04 00 22'.replace(/ /g, ''), 'hex')],
    ['P-521', buffer_1.Buffer.from('06 05 2B 81 04 00 23'.replace(/ /g, ''), 'hex')],
    ['ecPublicKey', buffer_1.Buffer.from('06 07 2A 86 48 CE 3D 02 01'.replace(/ /g, ''), 'hex')],
    ['X25519', buffer_1.Buffer.from('06 03 2B 65 6E'.replace(/ /g, ''), 'hex')],
    ['X448', buffer_1.Buffer.from('06 03 2B 65 6F'.replace(/ /g, ''), 'hex')],
    ['Ed25519', buffer_1.Buffer.from('06 03 2B 65 70'.replace(/ /g, ''), 'hex')],
    ['Ed448', buffer_1.Buffer.from('06 03 2B 65 71'.replace(/ /g, ''), 'hex')],
]);
class DumbAsn1Encoder {
    constructor() {
        this.length = 0;
        this.elements = [];
    }
    oidFor(oid) {
        const bOid = oids.get(oid);
        if (!bOid) {
            throw new errors_js_1.JOSENotSupported('Invalid or unsupported OID');
        }
        this.elements.push(bOid);
        this.length += bOid.length;
    }
    zero() {
        this.elements.push(bTagInteger, buffer_1.Buffer.from([0x01]), bZero);
        this.length += 3;
    }
    one() {
        this.elements.push(bTagInteger, buffer_1.Buffer.from([0x01]), buffer_1.Buffer.from([0x01]));
        this.length += 3;
    }
    unsignedInteger(integer) {
        if (integer[0] & 0x80) {
            const len = encodeLength(integer.length + 1);
            this.elements.push(bTagInteger, len, bZero, integer);
            this.length += 2 + len.length + integer.length;
        }
        else {
            let i = 0;
            while (integer[i] === 0 && (integer[i + 1] & 0x80) === 0)
                i++;
            const len = encodeLength(integer.length - i);
            this.elements.push(bTagInteger, encodeLength(integer.length - i), integer.slice(i));
            this.length += 1 + len.length + integer.length - i;
        }
    }
    octStr(octStr) {
        const len = encodeLength(octStr.length);
        this.elements.push(bTagOctStr, encodeLength(octStr.length), octStr);
        this.length += 1 + len.length + octStr.length;
    }
    bitStr(bitS) {
        const len = encodeLength(bitS.length + 1);
        this.elements.push(bTagBitStr, encodeLength(bitS.length + 1), bZero, bitS);
        this.length += 1 + len.length + bitS.length + 1;
    }
    add(seq) {
        this.elements.push(seq);
        this.length += seq.length;
    }
    end(tag = bTagSequence) {
        const len = encodeLength(this.length);
        return buffer_1.Buffer.concat([tag, len, ...this.elements], 1 + len.length + this.length);
    }
}
exports["default"] = DumbAsn1Encoder;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js":
/*!******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/base64url.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decode = exports.encode = exports.encodeBase64 = exports.decodeBase64 = void 0;
const buffer_1 = __webpack_require__(/*! buffer */ "buffer");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
let encode;
exports.encode = encode;
function normalize(input) {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = buffer_utils_js_1.decoder.decode(encoded);
    }
    return encoded;
}
if (buffer_1.Buffer.isEncoding('base64url')) {
    exports.encode = encode = (input) => buffer_1.Buffer.from(input).toString('base64url');
}
else {
    exports.encode = encode = (input) => buffer_1.Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
const decodeBase64 = (input) => buffer_1.Buffer.from(input, 'base64');
exports.decodeBase64 = decodeBase64;
const encodeBase64 = (input) => buffer_1.Buffer.from(input).toString('base64');
exports.encodeBase64 = encodeBase64;
const decode = (input) => buffer_1.Buffer.from(normalize(input), 'base64');
exports.decode = decode;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/cbc_tag.js":
/*!****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/cbc_tag.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
function cbcTag(aad, iv, ciphertext, macSize, macKey, keySize) {
    const macData = (0, buffer_utils_js_1.concat)(aad, iv, ciphertext, (0, buffer_utils_js_1.uint64be)(aad.length << 3));
    const hmac = (0, crypto_1.createHmac)(`sha${macSize}`, macKey);
    hmac.update(macData);
    return hmac.digest().slice(0, keySize >> 3);
}
exports["default"] = cbcTag;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/check_cek_length.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/check_cek_length.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const checkCekLength = (enc, cek) => {
    let expected;
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            expected = parseInt(enc.slice(-3), 10);
            break;
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            expected = parseInt(enc.slice(1, 4), 10);
            break;
        default:
            throw new errors_js_1.JOSENotSupported(`Content Encryption Algorithm ${enc} is not supported either by JOSE or your javascript runtime`);
    }
    if (cek instanceof Uint8Array) {
        if (cek.length << 3 !== expected) {
            throw new errors_js_1.JWEInvalid('Invalid Content Encryption Key length');
        }
        return;
    }
    if ((0, is_key_object_js_1.default)(cek) && cek.type === 'secret') {
        if (cek.symmetricKeySize << 3 !== expected) {
            throw new errors_js_1.JWEInvalid('Invalid Content Encryption Key length');
        }
        return;
    }
    throw new TypeError('Invalid Content Encryption Key type');
};
exports["default"] = checkCekLength;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/check_modulus_length.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/check_modulus_length.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setModulusLength = exports.weakMap = void 0;
exports.weakMap = new WeakMap();
const getLength = (buf, index) => {
    let len = buf.readUInt8(1);
    if ((len & 0x80) === 0) {
        if (index === 0) {
            return len;
        }
        return getLength(buf.subarray(2 + len), index - 1);
    }
    const num = len & 0x7f;
    len = 0;
    for (let i = 0; i < num; i++) {
        len <<= 8;
        const j = buf.readUInt8(2 + i);
        len |= j;
    }
    if (index === 0) {
        return len;
    }
    return getLength(buf.subarray(2 + len), index - 1);
};
const getLengthOfSeqIndex = (sequence, index) => {
    const len = sequence.readUInt8(1);
    if ((len & 0x80) === 0) {
        return getLength(sequence.subarray(2), index);
    }
    const num = len & 0x7f;
    return getLength(sequence.subarray(2 + num), index);
};
const getModulusLength = (key) => {
    var _a, _b;
    if (exports.weakMap.has(key)) {
        return exports.weakMap.get(key);
    }
    const modulusLength = (_b = (_a = key.asymmetricKeyDetails) === null || _a === void 0 ? void 0 : _a.modulusLength) !== null && _b !== void 0 ? _b : (getLengthOfSeqIndex(key.export({ format: 'der', type: 'pkcs1' }), key.type === 'private' ? 1 : 0) -
        1) <<
        3;
    exports.weakMap.set(key, modulusLength);
    return modulusLength;
};
const setModulusLength = (keyObject, modulusLength) => {
    exports.weakMap.set(keyObject, modulusLength);
};
exports.setModulusLength = setModulusLength;
exports["default"] = (key, alg) => {
    if (getModulusLength(key) < 2048) {
        throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
};


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/ciphers.js":
/*!****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/ciphers.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
let ciphers;
exports["default"] = (algorithm) => {
    ciphers || (ciphers = new Set((0, crypto_1.getCiphers)()));
    return ciphers.has(algorithm);
};


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/decrypt.js":
/*!****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/decrypt.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const check_iv_length_js_1 = __webpack_require__(/*! ../lib/check_iv_length.js */ "../../node_modules/jose/dist/node/cjs/lib/check_iv_length.js");
const check_cek_length_js_1 = __webpack_require__(/*! ./check_cek_length.js */ "../../node_modules/jose/dist/node/cjs/runtime/check_cek_length.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const timing_safe_equal_js_1 = __webpack_require__(/*! ./timing_safe_equal.js */ "../../node_modules/jose/dist/node/cjs/runtime/timing_safe_equal.js");
const cbc_tag_js_1 = __webpack_require__(/*! ./cbc_tag.js */ "../../node_modules/jose/dist/node/cjs/runtime/cbc_tag.js");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const crypto_key_js_1 = __webpack_require__(/*! ../lib/crypto_key.js */ "../../node_modules/jose/dist/node/cjs/lib/crypto_key.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const ciphers_js_1 = __webpack_require__(/*! ./ciphers.js */ "../../node_modules/jose/dist/node/cjs/runtime/ciphers.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    if ((0, is_key_object_js_1.default)(cek)) {
        cek = cek.export();
    }
    const encKey = cek.subarray(keySize >> 3);
    const macKey = cek.subarray(0, keySize >> 3);
    const macSize = parseInt(enc.slice(-3), 10);
    const algorithm = `aes-${keySize}-cbc`;
    if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const expectedTag = (0, cbc_tag_js_1.default)(aad, iv, ciphertext, macSize, macKey, keySize);
    let macCheckPassed;
    try {
        macCheckPassed = (0, timing_safe_equal_js_1.default)(tag, expectedTag);
    }
    catch {
    }
    if (!macCheckPassed) {
        throw new errors_js_1.JWEDecryptionFailed();
    }
    let plaintext;
    try {
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, encKey, iv);
        plaintext = (0, buffer_utils_js_1.concat)(decipher.update(ciphertext), decipher.final());
    }
    catch {
    }
    if (!plaintext) {
        throw new errors_js_1.JWEDecryptionFailed();
    }
    return plaintext;
}
function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    const algorithm = `aes-${keySize}-gcm`;
    if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    try {
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, cek, iv, { authTagLength: 16 });
        decipher.setAuthTag(tag);
        if (aad.byteLength) {
            decipher.setAAD(aad, { plaintextLength: ciphertext.length });
        }
        const plaintext = decipher.update(ciphertext);
        decipher.final();
        return plaintext;
    }
    catch {
        throw new errors_js_1.JWEDecryptionFailed();
    }
}
const decrypt = (enc, cek, ciphertext, iv, tag, aad) => {
    let key;
    if ((0, webcrypto_js_1.isCryptoKey)(cek)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(cek, enc, 'decrypt');
        key = crypto_1.KeyObject.from(cek);
    }
    else if (cek instanceof Uint8Array || (0, is_key_object_js_1.default)(cek)) {
        key = cek;
    }
    else {
        throw new TypeError((0, invalid_key_input_js_1.default)(cek, ...is_key_like_js_1.types, 'Uint8Array'));
    }
    (0, check_cek_length_js_1.default)(enc, key);
    (0, check_iv_length_js_1.default)(enc, iv);
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return cbcDecrypt(enc, key, ciphertext, iv, tag, aad);
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            return gcmDecrypt(enc, key, ciphertext, iv, tag, aad);
        default:
            throw new errors_js_1.JOSENotSupported('Unsupported JWE Content Encryption Algorithm');
    }
};
exports["default"] = decrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/digest.js":
/*!***************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/digest.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const digest = (algorithm, data) => (0, crypto_1.createHash)(algorithm).update(data).digest();
exports["default"] = digest;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/dsa_digest.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/dsa_digest.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
function dsaDigest(alg) {
    switch (alg) {
        case 'PS256':
        case 'RS256':
        case 'ES256':
        case 'ES256K':
            return 'sha256';
        case 'PS384':
        case 'RS384':
        case 'ES384':
            return 'sha384';
        case 'PS512':
        case 'RS512':
        case 'ES512':
            return 'sha512';
        case 'EdDSA':
            return undefined;
        default:
            throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}
exports["default"] = dsaDigest;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/ecdhes.js":
/*!***************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/ecdhes.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ecdhAllowed = exports.generateEpk = exports.deriveKey = void 0;
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const util_1 = __webpack_require__(/*! util */ "util");
const get_named_curve_js_1 = __webpack_require__(/*! ./get_named_curve.js */ "../../node_modules/jose/dist/node/cjs/runtime/get_named_curve.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const crypto_key_js_1 = __webpack_require__(/*! ../lib/crypto_key.js */ "../../node_modules/jose/dist/node/cjs/lib/crypto_key.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
const generateKeyPair = (0, util_1.promisify)(crypto_1.generateKeyPair);
async function deriveKey(publicKee, privateKee, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    let publicKey;
    if ((0, webcrypto_js_1.isCryptoKey)(publicKee)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(publicKee, 'ECDH');
        publicKey = crypto_1.KeyObject.from(publicKee);
    }
    else if ((0, is_key_object_js_1.default)(publicKee)) {
        publicKey = publicKee;
    }
    else {
        throw new TypeError((0, invalid_key_input_js_1.default)(publicKee, ...is_key_like_js_1.types));
    }
    let privateKey;
    if ((0, webcrypto_js_1.isCryptoKey)(privateKee)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(privateKee, 'ECDH', 'deriveBits');
        privateKey = crypto_1.KeyObject.from(privateKee);
    }
    else if ((0, is_key_object_js_1.default)(privateKee)) {
        privateKey = privateKee;
    }
    else {
        throw new TypeError((0, invalid_key_input_js_1.default)(privateKee, ...is_key_like_js_1.types));
    }
    const value = (0, buffer_utils_js_1.concat)((0, buffer_utils_js_1.lengthAndInput)(buffer_utils_js_1.encoder.encode(algorithm)), (0, buffer_utils_js_1.lengthAndInput)(apu), (0, buffer_utils_js_1.lengthAndInput)(apv), (0, buffer_utils_js_1.uint32be)(keyLength));
    const sharedSecret = (0, crypto_1.diffieHellman)({ privateKey, publicKey });
    return (0, buffer_utils_js_1.concatKdf)(sharedSecret, keyLength, value);
}
exports.deriveKey = deriveKey;
async function generateEpk(kee) {
    let key;
    if ((0, webcrypto_js_1.isCryptoKey)(kee)) {
        key = crypto_1.KeyObject.from(kee);
    }
    else if ((0, is_key_object_js_1.default)(kee)) {
        key = kee;
    }
    else {
        throw new TypeError((0, invalid_key_input_js_1.default)(kee, ...is_key_like_js_1.types));
    }
    switch (key.asymmetricKeyType) {
        case 'x25519':
            return generateKeyPair('x25519');
        case 'x448': {
            return generateKeyPair('x448');
        }
        case 'ec': {
            const namedCurve = (0, get_named_curve_js_1.default)(key);
            return generateKeyPair('ec', { namedCurve });
        }
        default:
            throw new errors_js_1.JOSENotSupported('Invalid or unsupported EPK');
    }
}
exports.generateEpk = generateEpk;
const ecdhAllowed = (key) => ['P-256', 'P-384', 'P-521', 'X25519', 'X448'].includes((0, get_named_curve_js_1.default)(key));
exports.ecdhAllowed = ecdhAllowed;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/encrypt.js":
/*!****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/encrypt.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const check_iv_length_js_1 = __webpack_require__(/*! ../lib/check_iv_length.js */ "../../node_modules/jose/dist/node/cjs/lib/check_iv_length.js");
const check_cek_length_js_1 = __webpack_require__(/*! ./check_cek_length.js */ "../../node_modules/jose/dist/node/cjs/runtime/check_cek_length.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const cbc_tag_js_1 = __webpack_require__(/*! ./cbc_tag.js */ "../../node_modules/jose/dist/node/cjs/runtime/cbc_tag.js");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const crypto_key_js_1 = __webpack_require__(/*! ../lib/crypto_key.js */ "../../node_modules/jose/dist/node/cjs/lib/crypto_key.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const ciphers_js_1 = __webpack_require__(/*! ./ciphers.js */ "../../node_modules/jose/dist/node/cjs/runtime/ciphers.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    if ((0, is_key_object_js_1.default)(cek)) {
        cek = cek.export();
    }
    const encKey = cek.subarray(keySize >> 3);
    const macKey = cek.subarray(0, keySize >> 3);
    const algorithm = `aes-${keySize}-cbc`;
    if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const cipher = (0, crypto_1.createCipheriv)(algorithm, encKey, iv);
    const ciphertext = (0, buffer_utils_js_1.concat)(cipher.update(plaintext), cipher.final());
    const macSize = parseInt(enc.slice(-3), 10);
    const tag = (0, cbc_tag_js_1.default)(aad, iv, ciphertext, macSize, macKey, keySize);
    return { ciphertext, tag };
}
function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    const keySize = parseInt(enc.slice(1, 4), 10);
    const algorithm = `aes-${keySize}-gcm`;
    if (!(0, ciphers_js_1.default)(algorithm)) {
        throw new errors_js_1.JOSENotSupported(`alg ${enc} is not supported by your javascript runtime`);
    }
    const cipher = (0, crypto_1.createCipheriv)(algorithm, cek, iv, { authTagLength: 16 });
    if (aad.byteLength) {
        cipher.setAAD(aad, { plaintextLength: plaintext.length });
    }
    const ciphertext = cipher.update(plaintext);
    cipher.final();
    const tag = cipher.getAuthTag();
    return { ciphertext, tag };
}
const encrypt = (enc, plaintext, cek, iv, aad) => {
    let key;
    if ((0, webcrypto_js_1.isCryptoKey)(cek)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(cek, enc, 'encrypt');
        key = crypto_1.KeyObject.from(cek);
    }
    else if (cek instanceof Uint8Array || (0, is_key_object_js_1.default)(cek)) {
        key = cek;
    }
    else {
        throw new TypeError((0, invalid_key_input_js_1.default)(cek, ...is_key_like_js_1.types, 'Uint8Array'));
    }
    (0, check_cek_length_js_1.default)(enc, key);
    (0, check_iv_length_js_1.default)(enc, iv);
    switch (enc) {
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            return cbcEncrypt(enc, plaintext, key, iv, aad);
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            return gcmEncrypt(enc, plaintext, key, iv, aad);
        default:
            throw new errors_js_1.JOSENotSupported('Unsupported JWE Content Encryption Algorithm');
    }
};
exports["default"] = encrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/env.js":
/*!************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/env.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNodeJs = exports.isCloudflareWorkers = void 0;
function isCloudflareWorkers() {
    return false;
}
exports.isCloudflareWorkers = isCloudflareWorkers;
function isNodeJs() {
    return true;
}
exports.isNodeJs = isNodeJs;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/fetch_jwks.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/fetch_jwks.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
const events_1 = __webpack_require__(/*! events */ "events");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const fetchJwks = async (url, timeout, options) => {
    let get;
    switch (url.protocol) {
        case 'https:':
            get = https.get;
            break;
        case 'http:':
            get = http.get;
            break;
        default:
            throw new TypeError('Unsupported URL protocol.');
    }
    const { agent, headers } = options;
    const req = get(url.href, {
        agent,
        timeout,
        headers,
    });
    const [response] = (await Promise.race([(0, events_1.once)(req, 'response'), (0, events_1.once)(req, 'timeout')]));
    if (!response) {
        req.destroy();
        throw new errors_js_1.JWKSTimeout();
    }
    if (response.statusCode !== 200) {
        throw new errors_js_1.JOSEError('Expected 200 OK from the JSON Web Key Set HTTP response');
    }
    const parts = [];
    for await (const part of response) {
        parts.push(part);
    }
    try {
        return JSON.parse(buffer_utils_js_1.decoder.decode((0, buffer_utils_js_1.concat)(...parts)));
    }
    catch {
        throw new errors_js_1.JOSEError('Failed to parse the JSON Web Key Set HTTP response as JSON');
    }
};
exports["default"] = fetchJwks;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/generate.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/generate.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateKeyPair = exports.generateSecret = void 0;
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const util_1 = __webpack_require__(/*! util */ "util");
const random_js_1 = __webpack_require__(/*! ./random.js */ "../../node_modules/jose/dist/node/cjs/runtime/random.js");
const check_modulus_length_js_1 = __webpack_require__(/*! ./check_modulus_length.js */ "../../node_modules/jose/dist/node/cjs/runtime/check_modulus_length.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const generate = (0, util_1.promisify)(crypto_1.generateKeyPair);
async function generateSecret(alg, options) {
    let length;
    switch (alg) {
        case 'HS256':
        case 'HS384':
        case 'HS512':
        case 'A128CBC-HS256':
        case 'A192CBC-HS384':
        case 'A256CBC-HS512':
            length = parseInt(alg.slice(-3), 10);
            break;
        case 'A128KW':
        case 'A192KW':
        case 'A256KW':
        case 'A128GCMKW':
        case 'A192GCMKW':
        case 'A256GCMKW':
        case 'A128GCM':
        case 'A192GCM':
        case 'A256GCM':
            length = parseInt(alg.slice(1, 4), 10);
            break;
        default:
            throw new errors_js_1.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return (0, crypto_1.createSecretKey)((0, random_js_1.default)(new Uint8Array(length >> 3)));
}
exports.generateSecret = generateSecret;
async function generateKeyPair(alg, options) {
    var _a, _b;
    switch (alg) {
        case 'RS256':
        case 'RS384':
        case 'RS512':
        case 'PS256':
        case 'PS384':
        case 'PS512':
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
        case 'RSA1_5': {
            const modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 2048;
            if (typeof modulusLength !== 'number' || modulusLength < 2048) {
                throw new errors_js_1.JOSENotSupported('Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used');
            }
            const keypair = await generate('rsa', {
                modulusLength,
                publicExponent: 0x10001,
            });
            (0, check_modulus_length_js_1.setModulusLength)(keypair.privateKey, modulusLength);
            (0, check_modulus_length_js_1.setModulusLength)(keypair.publicKey, modulusLength);
            return keypair;
        }
        case 'ES256':
            return generate('ec', { namedCurve: 'P-256' });
        case 'ES256K':
            return generate('ec', { namedCurve: 'secp256k1' });
        case 'ES384':
            return generate('ec', { namedCurve: 'P-384' });
        case 'ES512':
            return generate('ec', { namedCurve: 'P-521' });
        case 'EdDSA': {
            switch (options === null || options === void 0 ? void 0 : options.crv) {
                case undefined:
                case 'Ed25519':
                    return generate('ed25519');
                case 'Ed448':
                    return generate('ed448');
                default:
                    throw new errors_js_1.JOSENotSupported('Invalid or unsupported crv option provided, supported values are Ed25519 and Ed448');
            }
        }
        case 'ECDH-ES':
        case 'ECDH-ES+A128KW':
        case 'ECDH-ES+A192KW':
        case 'ECDH-ES+A256KW':
            const crv = (_b = options === null || options === void 0 ? void 0 : options.crv) !== null && _b !== void 0 ? _b : 'P-256';
            switch (crv) {
                case undefined:
                case 'P-256':
                case 'P-384':
                case 'P-521':
                    return generate('ec', { namedCurve: crv });
                case 'X25519':
                    return generate('x25519');
                case 'X448':
                    return generate('x448');
                default:
                    throw new errors_js_1.JOSENotSupported('Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448');
            }
        default:
            throw new errors_js_1.JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
}
exports.generateKeyPair = generateKeyPair;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/get_named_curve.js":
/*!************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/get_named_curve.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setCurve = exports.weakMap = void 0;
const buffer_1 = __webpack_require__(/*! buffer */ "buffer");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
const p256 = buffer_1.Buffer.from([42, 134, 72, 206, 61, 3, 1, 7]);
const p384 = buffer_1.Buffer.from([43, 129, 4, 0, 34]);
const p521 = buffer_1.Buffer.from([43, 129, 4, 0, 35]);
const secp256k1 = buffer_1.Buffer.from([43, 129, 4, 0, 10]);
exports.weakMap = new WeakMap();
const namedCurveToJOSE = (namedCurve) => {
    switch (namedCurve) {
        case 'prime256v1':
            return 'P-256';
        case 'secp384r1':
            return 'P-384';
        case 'secp521r1':
            return 'P-521';
        case 'secp256k1':
            return 'secp256k1';
        default:
            throw new errors_js_1.JOSENotSupported('Unsupported key curve for this operation');
    }
};
const getNamedCurve = (kee, raw) => {
    var _a;
    let key;
    if ((0, webcrypto_js_1.isCryptoKey)(kee)) {
        key = crypto_1.KeyObject.from(kee);
    }
    else if ((0, is_key_object_js_1.default)(kee)) {
        key = kee;
    }
    else {
        throw new TypeError((0, invalid_key_input_js_1.default)(kee, ...is_key_like_js_1.types));
    }
    if (key.type === 'secret') {
        throw new TypeError('only "private" or "public" type keys can be used for this operation');
    }
    switch (key.asymmetricKeyType) {
        case 'ed25519':
        case 'ed448':
            return `Ed${key.asymmetricKeyType.slice(2)}`;
        case 'x25519':
        case 'x448':
            return `X${key.asymmetricKeyType.slice(1)}`;
        case 'ec': {
            if (exports.weakMap.has(key)) {
                return exports.weakMap.get(key);
            }
            let namedCurve = (_a = key.asymmetricKeyDetails) === null || _a === void 0 ? void 0 : _a.namedCurve;
            if (!namedCurve && key.type === 'private') {
                namedCurve = getNamedCurve((0, crypto_1.createPublicKey)(key), true);
            }
            else if (!namedCurve) {
                const buf = key.export({ format: 'der', type: 'spki' });
                const i = buf[1] < 128 ? 14 : 15;
                const len = buf[i];
                const curveOid = buf.slice(i + 1, i + 1 + len);
                if (curveOid.equals(p256)) {
                    namedCurve = 'prime256v1';
                }
                else if (curveOid.equals(p384)) {
                    namedCurve = 'secp384r1';
                }
                else if (curveOid.equals(p521)) {
                    namedCurve = 'secp521r1';
                }
                else if (curveOid.equals(secp256k1)) {
                    namedCurve = 'secp256k1';
                }
                else {
                    throw new errors_js_1.JOSENotSupported('Unsupported key curve for this operation');
                }
            }
            if (raw)
                return namedCurve;
            const curve = namedCurveToJOSE(namedCurve);
            exports.weakMap.set(key, curve);
            return curve;
        }
        default:
            throw new TypeError('Invalid asymmetric key type for this operation');
    }
};
function setCurve(keyObject, curve) {
    exports.weakMap.set(keyObject, curve);
}
exports.setCurve = setCurve;
exports["default"] = getNamedCurve;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/get_sign_verify_key.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/get_sign_verify_key.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const crypto_key_js_1 = __webpack_require__(/*! ../lib/crypto_key.js */ "../../node_modules/jose/dist/node/cjs/lib/crypto_key.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
function getSignVerifyKey(alg, key, usage) {
    if (key instanceof Uint8Array) {
        if (!alg.startsWith('HS')) {
            throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
        }
        return (0, crypto_1.createSecretKey)(key);
    }
    if (key instanceof crypto_1.KeyObject) {
        return key;
    }
    if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        (0, crypto_key_js_1.checkSigCryptoKey)(key, alg, usage);
        return crypto_1.KeyObject.from(key);
    }
    throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, 'Uint8Array'));
}
exports["default"] = getSignVerifyKey;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/hmac_digest.js":
/*!********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/hmac_digest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
function hmacDigest(alg) {
    switch (alg) {
        case 'HS256':
            return 'sha256';
        case 'HS384':
            return 'sha384';
        case 'HS512':
            return 'sha512';
        default:
            throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}
exports["default"] = hmacDigest;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js":
/*!********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.types = void 0;
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
exports["default"] = (key) => (0, is_key_object_js_1.default)(key) || (0, webcrypto_js_1.isCryptoKey)(key);
const types = ['KeyObject'];
exports.types = types;
if (parseInt(process.versions.node) >= 16) {
    types.push('CryptoKey');
}


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const util = __webpack_require__(/*! util */ "util");
exports["default"] = util.types.isKeyObject
    ? (obj) => util.types.isKeyObject(obj)
    : (obj) => obj != null && obj instanceof crypto_1.KeyObject;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/jwk_to_key.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/jwk_to_key.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const buffer_1 = __webpack_require__(/*! buffer */ "buffer");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const base64url_js_1 = __webpack_require__(/*! ./base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const get_named_curve_js_1 = __webpack_require__(/*! ./get_named_curve.js */ "../../node_modules/jose/dist/node/cjs/runtime/get_named_curve.js");
const check_modulus_length_js_1 = __webpack_require__(/*! ./check_modulus_length.js */ "../../node_modules/jose/dist/node/cjs/runtime/check_modulus_length.js");
const asn1_sequence_encoder_js_1 = __webpack_require__(/*! ./asn1_sequence_encoder.js */ "../../node_modules/jose/dist/node/cjs/runtime/asn1_sequence_encoder.js");
const [major, minor] = process.version
    .slice(1)
    .split('.')
    .map((str) => parseInt(str, 10));
const jwkImportSupported = major >= 16 || (major === 15 && minor >= 12);
const parse = (jwk) => {
    if (jwkImportSupported && jwk.kty !== 'oct') {
        return jwk.d
            ? (0, crypto_1.createPrivateKey)({ format: 'jwk', key: jwk })
            : (0, crypto_1.createPublicKey)({ format: 'jwk', key: jwk });
    }
    switch (jwk.kty) {
        case 'oct': {
            return (0, crypto_1.createSecretKey)((0, base64url_js_1.decode)(jwk.k));
        }
        case 'RSA': {
            const enc = new asn1_sequence_encoder_js_1.default();
            const isPrivate = jwk.d !== undefined;
            const modulus = buffer_1.Buffer.from(jwk.n, 'base64');
            const exponent = buffer_1.Buffer.from(jwk.e, 'base64');
            if (isPrivate) {
                enc.zero();
                enc.unsignedInteger(modulus);
                enc.unsignedInteger(exponent);
                enc.unsignedInteger(buffer_1.Buffer.from(jwk.d, 'base64'));
                enc.unsignedInteger(buffer_1.Buffer.from(jwk.p, 'base64'));
                enc.unsignedInteger(buffer_1.Buffer.from(jwk.q, 'base64'));
                enc.unsignedInteger(buffer_1.Buffer.from(jwk.dp, 'base64'));
                enc.unsignedInteger(buffer_1.Buffer.from(jwk.dq, 'base64'));
                enc.unsignedInteger(buffer_1.Buffer.from(jwk.qi, 'base64'));
            }
            else {
                enc.unsignedInteger(modulus);
                enc.unsignedInteger(exponent);
            }
            const der = enc.end();
            const createInput = {
                key: der,
                format: 'der',
                type: 'pkcs1',
            };
            const keyObject = isPrivate ? (0, crypto_1.createPrivateKey)(createInput) : (0, crypto_1.createPublicKey)(createInput);
            (0, check_modulus_length_js_1.setModulusLength)(keyObject, modulus.length << 3);
            return keyObject;
        }
        case 'EC': {
            const enc = new asn1_sequence_encoder_js_1.default();
            const isPrivate = jwk.d !== undefined;
            const pub = buffer_1.Buffer.concat([
                buffer_1.Buffer.alloc(1, 4),
                buffer_1.Buffer.from(jwk.x, 'base64'),
                buffer_1.Buffer.from(jwk.y, 'base64'),
            ]);
            if (isPrivate) {
                enc.zero();
                const enc$1 = new asn1_sequence_encoder_js_1.default();
                enc$1.oidFor('ecPublicKey');
                enc$1.oidFor(jwk.crv);
                enc.add(enc$1.end());
                const enc$2 = new asn1_sequence_encoder_js_1.default();
                enc$2.one();
                enc$2.octStr(buffer_1.Buffer.from(jwk.d, 'base64'));
                const enc$3 = new asn1_sequence_encoder_js_1.default();
                enc$3.bitStr(pub);
                const f2 = enc$3.end(buffer_1.Buffer.from([0xa1]));
                enc$2.add(f2);
                const f = enc$2.end();
                const enc$4 = new asn1_sequence_encoder_js_1.default();
                enc$4.add(f);
                const f3 = enc$4.end(buffer_1.Buffer.from([0x04]));
                enc.add(f3);
                const der = enc.end();
                const keyObject = (0, crypto_1.createPrivateKey)({ key: der, format: 'der', type: 'pkcs8' });
                (0, get_named_curve_js_1.setCurve)(keyObject, jwk.crv);
                return keyObject;
            }
            const enc$1 = new asn1_sequence_encoder_js_1.default();
            enc$1.oidFor('ecPublicKey');
            enc$1.oidFor(jwk.crv);
            enc.add(enc$1.end());
            enc.bitStr(pub);
            const der = enc.end();
            const keyObject = (0, crypto_1.createPublicKey)({ key: der, format: 'der', type: 'spki' });
            (0, get_named_curve_js_1.setCurve)(keyObject, jwk.crv);
            return keyObject;
        }
        case 'OKP': {
            const enc = new asn1_sequence_encoder_js_1.default();
            const isPrivate = jwk.d !== undefined;
            if (isPrivate) {
                enc.zero();
                const enc$1 = new asn1_sequence_encoder_js_1.default();
                enc$1.oidFor(jwk.crv);
                enc.add(enc$1.end());
                const enc$2 = new asn1_sequence_encoder_js_1.default();
                enc$2.octStr(buffer_1.Buffer.from(jwk.d, 'base64'));
                const f = enc$2.end(buffer_1.Buffer.from([0x04]));
                enc.add(f);
                const der = enc.end();
                return (0, crypto_1.createPrivateKey)({ key: der, format: 'der', type: 'pkcs8' });
            }
            const enc$1 = new asn1_sequence_encoder_js_1.default();
            enc$1.oidFor(jwk.crv);
            enc.add(enc$1.end());
            enc.bitStr(buffer_1.Buffer.from(jwk.x, 'base64'));
            const der = enc.end();
            return (0, crypto_1.createPublicKey)({ key: der, format: 'der', type: 'spki' });
        }
        default:
            throw new errors_js_1.JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
};
exports["default"] = parse;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/key_to_jwk.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/key_to_jwk.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const base64url_js_1 = __webpack_require__(/*! ./base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const asn1_sequence_decoder_js_1 = __webpack_require__(/*! ./asn1_sequence_decoder.js */ "../../node_modules/jose/dist/node/cjs/runtime/asn1_sequence_decoder.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const get_named_curve_js_1 = __webpack_require__(/*! ./get_named_curve.js */ "../../node_modules/jose/dist/node/cjs/runtime/get_named_curve.js");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
const [major, minor] = process.version
    .slice(1)
    .split('.')
    .map((str) => parseInt(str, 10));
const jwkExportSupported = major >= 16 || (major === 15 && minor >= 9);
const keyToJWK = (key) => {
    let keyObject;
    if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        if (!key.extractable) {
            throw new TypeError('CryptoKey is not extractable');
        }
        keyObject = crypto_1.KeyObject.from(key);
    }
    else if ((0, is_key_object_js_1.default)(key)) {
        keyObject = key;
    }
    else if (key instanceof Uint8Array) {
        return {
            kty: 'oct',
            k: (0, base64url_js_1.encode)(key),
        };
    }
    else {
        throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, 'Uint8Array'));
    }
    if (jwkExportSupported) {
        return keyObject.export({ format: 'jwk' });
    }
    switch (keyObject.type) {
        case 'secret':
            return {
                kty: 'oct',
                k: (0, base64url_js_1.encode)(keyObject.export()),
            };
        case 'private':
        case 'public': {
            switch (keyObject.asymmetricKeyType) {
                case 'rsa': {
                    const der = keyObject.export({ format: 'der', type: 'pkcs1' });
                    const dec = new asn1_sequence_decoder_js_1.default(der);
                    if (keyObject.type === 'private') {
                        dec.unsignedInteger();
                    }
                    const n = (0, base64url_js_1.encode)(dec.unsignedInteger());
                    const e = (0, base64url_js_1.encode)(dec.unsignedInteger());
                    let jwk;
                    if (keyObject.type === 'private') {
                        jwk = {
                            d: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                            p: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                            q: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                            dp: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                            dq: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                            qi: (0, base64url_js_1.encode)(dec.unsignedInteger()),
                        };
                    }
                    dec.end();
                    return { kty: 'RSA', n, e, ...jwk };
                }
                case 'ec': {
                    const crv = (0, get_named_curve_js_1.default)(keyObject);
                    let len;
                    let offset;
                    let correction;
                    switch (crv) {
                        case 'secp256k1':
                            len = 64;
                            offset = 31 + 2;
                            correction = -1;
                            break;
                        case 'P-256':
                            len = 64;
                            offset = 34 + 2;
                            correction = -1;
                            break;
                        case 'P-384':
                            len = 96;
                            offset = 33 + 2;
                            correction = -3;
                            break;
                        case 'P-521':
                            len = 132;
                            offset = 33 + 2;
                            correction = -3;
                            break;
                        default:
                            throw new errors_js_1.JOSENotSupported('Unsupported curve');
                    }
                    if (keyObject.type === 'public') {
                        const der = keyObject.export({ type: 'spki', format: 'der' });
                        return {
                            kty: 'EC',
                            crv,
                            x: (0, base64url_js_1.encode)(der.subarray(-len, -len / 2)),
                            y: (0, base64url_js_1.encode)(der.subarray(-len / 2)),
                        };
                    }
                    const der = keyObject.export({ type: 'pkcs8', format: 'der' });
                    if (der.length < 100) {
                        offset += correction;
                    }
                    return {
                        ...keyToJWK((0, crypto_1.createPublicKey)(keyObject)),
                        d: (0, base64url_js_1.encode)(der.subarray(offset, offset + len / 2)),
                    };
                }
                case 'ed25519':
                case 'x25519': {
                    const crv = (0, get_named_curve_js_1.default)(keyObject);
                    if (keyObject.type === 'public') {
                        const der = keyObject.export({ type: 'spki', format: 'der' });
                        return {
                            kty: 'OKP',
                            crv,
                            x: (0, base64url_js_1.encode)(der.subarray(-32)),
                        };
                    }
                    const der = keyObject.export({ type: 'pkcs8', format: 'der' });
                    return {
                        ...keyToJWK((0, crypto_1.createPublicKey)(keyObject)),
                        d: (0, base64url_js_1.encode)(der.subarray(-32)),
                    };
                }
                case 'ed448':
                case 'x448': {
                    const crv = (0, get_named_curve_js_1.default)(keyObject);
                    if (keyObject.type === 'public') {
                        const der = keyObject.export({ type: 'spki', format: 'der' });
                        return {
                            kty: 'OKP',
                            crv,
                            x: (0, base64url_js_1.encode)(der.subarray(crv === 'Ed448' ? -57 : -56)),
                        };
                    }
                    const der = keyObject.export({ type: 'pkcs8', format: 'der' });
                    return {
                        ...keyToJWK((0, crypto_1.createPublicKey)(keyObject)),
                        d: (0, base64url_js_1.encode)(der.subarray(crv === 'Ed448' ? -57 : -56)),
                    };
                }
                default:
                    throw new errors_js_1.JOSENotSupported('Unsupported key asymmetricKeyType');
            }
        }
        default:
            throw new errors_js_1.JOSENotSupported('Unsupported key type');
    }
};
exports["default"] = keyToJWK;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/node_key.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/node_key.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const get_named_curve_js_1 = __webpack_require__(/*! ./get_named_curve.js */ "../../node_modules/jose/dist/node/cjs/runtime/get_named_curve.js");
const errors_js_1 = __webpack_require__(/*! ../util/errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
const check_modulus_length_js_1 = __webpack_require__(/*! ./check_modulus_length.js */ "../../node_modules/jose/dist/node/cjs/runtime/check_modulus_length.js");
const [major, minor] = process.version
    .slice(1)
    .split('.')
    .map((str) => parseInt(str, 10));
const electron = 'electron' in process.versions;
const rsaPssParams = !electron && (major >= 17 || (major === 16 && minor >= 9));
const PSS = {
    padding: crypto_1.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: crypto_1.constants.RSA_PSS_SALTLEN_DIGEST,
};
const ecCurveAlgMap = new Map([
    ['ES256', 'P-256'],
    ['ES256K', 'secp256k1'],
    ['ES384', 'P-384'],
    ['ES512', 'P-521'],
]);
function keyForCrypto(alg, key) {
    switch (alg) {
        case 'EdDSA':
            if (!['ed25519', 'ed448'].includes(key.asymmetricKeyType)) {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448');
            }
            return key;
        case 'RS256':
        case 'RS384':
        case 'RS512':
            if (key.asymmetricKeyType !== 'rsa') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa');
            }
            (0, check_modulus_length_js_1.default)(key, alg);
            return key;
        case rsaPssParams && 'PS256':
        case rsaPssParams && 'PS384':
        case rsaPssParams && 'PS512':
            if (key.asymmetricKeyType === 'rsa-pss') {
                const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
                const length = parseInt(alg.slice(-3), 10);
                if (hashAlgorithm !== undefined &&
                    (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm)) {
                    throw new TypeError(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${alg}`);
                }
                if (saltLength !== undefined && saltLength > length >> 3) {
                    throw new TypeError(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${alg}`);
                }
            }
            else if (key.asymmetricKeyType !== 'rsa') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss');
            }
            (0, check_modulus_length_js_1.default)(key, alg);
            return { key, ...PSS };
        case !rsaPssParams && 'PS256':
        case !rsaPssParams && 'PS384':
        case !rsaPssParams && 'PS512':
            if (key.asymmetricKeyType !== 'rsa') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa');
            }
            (0, check_modulus_length_js_1.default)(key, alg);
            return { key, ...PSS };
        case 'ES256':
        case 'ES256K':
        case 'ES384':
        case 'ES512': {
            if (key.asymmetricKeyType !== 'ec') {
                throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be ec');
            }
            const actual = (0, get_named_curve_js_1.default)(key);
            const expected = ecCurveAlgMap.get(alg);
            if (actual !== expected) {
                throw new TypeError(`Invalid key curve for the algorithm, its curve must be ${expected}, got ${actual}`);
            }
            return { dsaEncoding: 'ieee-p1363', key };
        }
        default:
            throw new errors_js_1.JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}
exports["default"] = keyForCrypto;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/pbes2kw.js":
/*!****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/pbes2kw.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decrypt = exports.encrypt = void 0;
const util_1 = __webpack_require__(/*! util */ "util");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const random_js_1 = __webpack_require__(/*! ./random.js */ "../../node_modules/jose/dist/node/cjs/runtime/random.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const base64url_js_1 = __webpack_require__(/*! ./base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
const aeskw_js_1 = __webpack_require__(/*! ./aeskw.js */ "../../node_modules/jose/dist/node/cjs/runtime/aeskw.js");
const check_p2s_js_1 = __webpack_require__(/*! ../lib/check_p2s.js */ "../../node_modules/jose/dist/node/cjs/lib/check_p2s.js");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const crypto_key_js_1 = __webpack_require__(/*! ../lib/crypto_key.js */ "../../node_modules/jose/dist/node/cjs/lib/crypto_key.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
const pbkdf2 = (0, util_1.promisify)(crypto_1.pbkdf2);
function getPassword(key, alg) {
    if ((0, is_key_object_js_1.default)(key)) {
        return key.export();
    }
    if (key instanceof Uint8Array) {
        return key;
    }
    if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(key, alg, 'deriveBits', 'deriveKey');
        return crypto_1.KeyObject.from(key).export();
    }
    throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types, 'Uint8Array'));
}
const encrypt = async (alg, key, cek, p2c = 2048, p2s = (0, random_js_1.default)(new Uint8Array(16))) => {
    (0, check_p2s_js_1.default)(p2s);
    const salt = (0, buffer_utils_js_1.p2s)(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
    const password = getPassword(key, alg);
    const derivedKey = await pbkdf2(password, salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
    const encryptedKey = await (0, aeskw_js_1.wrap)(alg.slice(-6), derivedKey, cek);
    return { encryptedKey, p2c, p2s: (0, base64url_js_1.encode)(p2s) };
};
exports.encrypt = encrypt;
const decrypt = async (alg, key, encryptedKey, p2c, p2s) => {
    (0, check_p2s_js_1.default)(p2s);
    const salt = (0, buffer_utils_js_1.p2s)(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10) >> 3;
    const password = getPassword(key, alg);
    const derivedKey = await pbkdf2(password, salt, p2c, keylen, `sha${alg.slice(8, 11)}`);
    return (0, aeskw_js_1.unwrap)(alg.slice(-6), derivedKey, encryptedKey);
};
exports.decrypt = decrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/random.js":
/*!***************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/random.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = void 0;
var crypto_1 = __webpack_require__(/*! crypto */ "crypto");
Object.defineProperty(exports, "default", ({ enumerable: true, get: function () { return crypto_1.randomFillSync; } }));


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/rsaes.js":
/*!**************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/rsaes.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const check_modulus_length_js_1 = __webpack_require__(/*! ./check_modulus_length.js */ "../../node_modules/jose/dist/node/cjs/runtime/check_modulus_length.js");
const webcrypto_js_1 = __webpack_require__(/*! ./webcrypto.js */ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js");
const crypto_key_js_1 = __webpack_require__(/*! ../lib/crypto_key.js */ "../../node_modules/jose/dist/node/cjs/lib/crypto_key.js");
const is_key_object_js_1 = __webpack_require__(/*! ./is_key_object.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_object.js");
const invalid_key_input_js_1 = __webpack_require__(/*! ../lib/invalid_key_input.js */ "../../node_modules/jose/dist/node/cjs/lib/invalid_key_input.js");
const is_key_like_js_1 = __webpack_require__(/*! ./is_key_like.js */ "../../node_modules/jose/dist/node/cjs/runtime/is_key_like.js");
const checkKey = (key, alg) => {
    if (key.asymmetricKeyType !== 'rsa') {
        throw new TypeError('Invalid key for this operation, its asymmetricKeyType must be rsa');
    }
    (0, check_modulus_length_js_1.default)(key, alg);
};
const resolvePadding = (alg) => {
    switch (alg) {
        case 'RSA-OAEP':
        case 'RSA-OAEP-256':
        case 'RSA-OAEP-384':
        case 'RSA-OAEP-512':
            return crypto_1.constants.RSA_PKCS1_OAEP_PADDING;
        case 'RSA1_5':
            return crypto_1.constants.RSA_PKCS1_PADDING;
        default:
            return undefined;
    }
};
const resolveOaepHash = (alg) => {
    switch (alg) {
        case 'RSA-OAEP':
            return 'sha1';
        case 'RSA-OAEP-256':
            return 'sha256';
        case 'RSA-OAEP-384':
            return 'sha384';
        case 'RSA-OAEP-512':
            return 'sha512';
        default:
            return undefined;
    }
};
function ensureKeyObject(key, alg, ...usages) {
    if ((0, is_key_object_js_1.default)(key)) {
        return key;
    }
    if ((0, webcrypto_js_1.isCryptoKey)(key)) {
        (0, crypto_key_js_1.checkEncCryptoKey)(key, alg, ...usages);
        return crypto_1.KeyObject.from(key);
    }
    throw new TypeError((0, invalid_key_input_js_1.default)(key, ...is_key_like_js_1.types));
}
const encrypt = (alg, key, cek) => {
    const padding = resolvePadding(alg);
    const oaepHash = resolveOaepHash(alg);
    const keyObject = ensureKeyObject(key, alg, 'wrapKey', 'encrypt');
    checkKey(keyObject, alg);
    return (0, crypto_1.publicEncrypt)({ key: keyObject, oaepHash, padding }, cek);
};
exports.encrypt = encrypt;
const decrypt = (alg, key, encryptedKey) => {
    const padding = resolvePadding(alg);
    const oaepHash = resolveOaepHash(alg);
    const keyObject = ensureKeyObject(key, alg, 'unwrapKey', 'decrypt');
    checkKey(keyObject, alg);
    return (0, crypto_1.privateDecrypt)({ key: keyObject, oaepHash, padding }, encryptedKey);
};
exports.decrypt = decrypt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/sign.js":
/*!*************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/sign.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto = __webpack_require__(/*! crypto */ "crypto");
const util_1 = __webpack_require__(/*! util */ "util");
const dsa_digest_js_1 = __webpack_require__(/*! ./dsa_digest.js */ "../../node_modules/jose/dist/node/cjs/runtime/dsa_digest.js");
const hmac_digest_js_1 = __webpack_require__(/*! ./hmac_digest.js */ "../../node_modules/jose/dist/node/cjs/runtime/hmac_digest.js");
const node_key_js_1 = __webpack_require__(/*! ./node_key.js */ "../../node_modules/jose/dist/node/cjs/runtime/node_key.js");
const get_sign_verify_key_js_1 = __webpack_require__(/*! ./get_sign_verify_key.js */ "../../node_modules/jose/dist/node/cjs/runtime/get_sign_verify_key.js");
let oneShotSign;
if (crypto.sign.length > 3) {
    oneShotSign = (0, util_1.promisify)(crypto.sign);
}
else {
    oneShotSign = crypto.sign;
}
const sign = async (alg, key, data) => {
    const keyObject = (0, get_sign_verify_key_js_1.default)(alg, key, 'sign');
    if (alg.startsWith('HS')) {
        const hmac = crypto.createHmac((0, hmac_digest_js_1.default)(alg), keyObject);
        hmac.update(data);
        return hmac.digest();
    }
    return oneShotSign((0, dsa_digest_js_1.default)(alg), data, (0, node_key_js_1.default)(alg, keyObject));
};
exports["default"] = sign;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/timing_safe_equal.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/timing_safe_equal.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
const timingSafeEqual = crypto_1.timingSafeEqual;
exports["default"] = timingSafeEqual;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/verify.js":
/*!***************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/verify.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto = __webpack_require__(/*! crypto */ "crypto");
const util_1 = __webpack_require__(/*! util */ "util");
const dsa_digest_js_1 = __webpack_require__(/*! ./dsa_digest.js */ "../../node_modules/jose/dist/node/cjs/runtime/dsa_digest.js");
const node_key_js_1 = __webpack_require__(/*! ./node_key.js */ "../../node_modules/jose/dist/node/cjs/runtime/node_key.js");
const sign_js_1 = __webpack_require__(/*! ./sign.js */ "../../node_modules/jose/dist/node/cjs/runtime/sign.js");
const get_sign_verify_key_js_1 = __webpack_require__(/*! ./get_sign_verify_key.js */ "../../node_modules/jose/dist/node/cjs/runtime/get_sign_verify_key.js");
const [major, minor] = process.version
    .slice(1)
    .split('.')
    .map((str) => parseInt(str, 10));
const oneShotCallbackSupported = major >= 16 || (major === 15 && minor >= 13);
let oneShotVerify;
if (crypto.verify.length > 4 && oneShotCallbackSupported) {
    oneShotVerify = (0, util_1.promisify)(crypto.verify);
}
else {
    oneShotVerify = crypto.verify;
}
const verify = async (alg, key, signature, data) => {
    const keyObject = (0, get_sign_verify_key_js_1.default)(alg, key, 'verify');
    if (alg.startsWith('HS')) {
        const expected = await (0, sign_js_1.default)(alg, keyObject, data);
        const actual = signature;
        try {
            return crypto.timingSafeEqual(actual, expected);
        }
        catch {
            return false;
        }
    }
    const algorithm = (0, dsa_digest_js_1.default)(alg);
    const keyInput = (0, node_key_js_1.default)(alg, keyObject);
    try {
        return await oneShotVerify(algorithm, data, keyInput, signature);
    }
    catch {
        return false;
    }
};
exports["default"] = verify;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js":
/*!******************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/webcrypto.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isCryptoKey = void 0;
const crypto = __webpack_require__(/*! crypto */ "crypto");
const util = __webpack_require__(/*! util */ "util");
const webcrypto = crypto.webcrypto;
exports["default"] = webcrypto;
exports.isCryptoKey = util.types.isCryptoKey
    ? (key) => util.types.isCryptoKey(key)
    :
        (key) => false;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/runtime/zlib.js":
/*!*************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/runtime/zlib.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deflate = exports.inflate = void 0;
const util_1 = __webpack_require__(/*! util */ "util");
const zlib_1 = __webpack_require__(/*! zlib */ "zlib");
const inflateRaw = (0, util_1.promisify)(zlib_1.inflateRaw);
const deflateRaw = (0, util_1.promisify)(zlib_1.deflateRaw);
const inflate = (input) => inflateRaw(input);
exports.inflate = inflate;
const deflate = (input) => deflateRaw(input);
exports.deflate = deflate;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/util/base64url.js":
/*!***************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/util/base64url.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decode = exports.encode = void 0;
const base64url = __webpack_require__(/*! ../runtime/base64url.js */ "../../node_modules/jose/dist/node/cjs/runtime/base64url.js");
exports.encode = base64url.encode;
exports.decode = base64url.decode;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/util/decode_jwt.js":
/*!****************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/util/decode_jwt.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeJwt = void 0;
const base64url_js_1 = __webpack_require__(/*! ./base64url.js */ "../../node_modules/jose/dist/node/cjs/util/base64url.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const is_object_js_1 = __webpack_require__(/*! ../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
const errors_js_1 = __webpack_require__(/*! ./errors.js */ "../../node_modules/jose/dist/node/cjs/util/errors.js");
function decodeJwt(jwt) {
    if (typeof jwt !== 'string')
        throw new errors_js_1.JWTInvalid('JWTs must use Compact JWS serialization, JWT must be a string');
    const { 1: payload, length } = jwt.split('.');
    if (length === 5)
        throw new errors_js_1.JWTInvalid('Only JWTs using Compact JWS serialization can be decoded');
    if (length !== 3)
        throw new errors_js_1.JWTInvalid('Invalid JWT');
    if (!payload)
        throw new errors_js_1.JWTInvalid('JWTs must contain a payload');
    let decoded;
    try {
        decoded = (0, base64url_js_1.decode)(payload);
    }
    catch {
        throw new errors_js_1.JWTInvalid('Failed to parse the base64url encoded payload');
    }
    let result;
    try {
        result = JSON.parse(buffer_utils_js_1.decoder.decode(decoded));
    }
    catch {
        throw new errors_js_1.JWTInvalid('Failed to parse the decoded payload as JSON');
    }
    if (!(0, is_object_js_1.default)(result))
        throw new errors_js_1.JWTInvalid('Invalid JWT Claims Set');
    return result;
}
exports.decodeJwt = decodeJwt;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/util/decode_protected_header.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/util/decode_protected_header.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeProtectedHeader = void 0;
const base64url_js_1 = __webpack_require__(/*! ./base64url.js */ "../../node_modules/jose/dist/node/cjs/util/base64url.js");
const buffer_utils_js_1 = __webpack_require__(/*! ../lib/buffer_utils.js */ "../../node_modules/jose/dist/node/cjs/lib/buffer_utils.js");
const is_object_js_1 = __webpack_require__(/*! ../lib/is_object.js */ "../../node_modules/jose/dist/node/cjs/lib/is_object.js");
function decodeProtectedHeader(token) {
    let protectedB64u;
    if (typeof token === 'string') {
        const parts = token.split('.');
        if (parts.length === 3 || parts.length === 5) {
            ;
            [protectedB64u] = parts;
        }
    }
    else if (typeof token === 'object' && token) {
        if ('protected' in token) {
            protectedB64u = token.protected;
        }
        else {
            throw new TypeError('Token does not contain a Protected Header');
        }
    }
    try {
        if (typeof protectedB64u !== 'string' || !protectedB64u) {
            throw new Error();
        }
        const result = JSON.parse(buffer_utils_js_1.decoder.decode((0, base64url_js_1.decode)(protectedB64u)));
        if (!(0, is_object_js_1.default)(result)) {
            throw new Error();
        }
        return result;
    }
    catch {
        throw new TypeError('Invalid Token or Protected Header formatting');
    }
}
exports.decodeProtectedHeader = decodeProtectedHeader;


/***/ }),

/***/ "../../node_modules/jose/dist/node/cjs/util/errors.js":
/*!************************************************************!*\
  !*** ../../node_modules/jose/dist/node/cjs/util/errors.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JWSSignatureVerificationFailed = exports.JWKSTimeout = exports.JWKSMultipleMatchingKeys = exports.JWKSNoMatchingKey = exports.JWKSInvalid = exports.JWKInvalid = exports.JWTInvalid = exports.JWSInvalid = exports.JWEInvalid = exports.JWEDecryptionFailed = exports.JOSENotSupported = exports.JOSEAlgNotAllowed = exports.JWTExpired = exports.JWTClaimValidationFailed = exports.JOSEError = void 0;
class JOSEError extends Error {
    constructor(message) {
        var _a;
        super(message);
        this.code = 'ERR_JOSE_GENERIC';
        this.name = this.constructor.name;
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
    }
    static get code() {
        return 'ERR_JOSE_GENERIC';
    }
}
exports.JOSEError = JOSEError;
class JWTClaimValidationFailed extends JOSEError {
    constructor(message, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
        this.claim = claim;
        this.reason = reason;
    }
    static get code() {
        return 'ERR_JWT_CLAIM_VALIDATION_FAILED';
    }
}
exports.JWTClaimValidationFailed = JWTClaimValidationFailed;
class JWTExpired extends JOSEError {
    constructor(message, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.code = 'ERR_JWT_EXPIRED';
        this.claim = claim;
        this.reason = reason;
    }
    static get code() {
        return 'ERR_JWT_EXPIRED';
    }
}
exports.JWTExpired = JWTExpired;
class JOSEAlgNotAllowed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JOSE_ALG_NOT_ALLOWED';
    }
    static get code() {
        return 'ERR_JOSE_ALG_NOT_ALLOWED';
    }
}
exports.JOSEAlgNotAllowed = JOSEAlgNotAllowed;
class JOSENotSupported extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JOSE_NOT_SUPPORTED';
    }
    static get code() {
        return 'ERR_JOSE_NOT_SUPPORTED';
    }
}
exports.JOSENotSupported = JOSENotSupported;
class JWEDecryptionFailed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWE_DECRYPTION_FAILED';
        this.message = 'decryption operation failed';
    }
    static get code() {
        return 'ERR_JWE_DECRYPTION_FAILED';
    }
}
exports.JWEDecryptionFailed = JWEDecryptionFailed;
class JWEInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWE_INVALID';
    }
    static get code() {
        return 'ERR_JWE_INVALID';
    }
}
exports.JWEInvalid = JWEInvalid;
class JWSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWS_INVALID';
    }
    static get code() {
        return 'ERR_JWS_INVALID';
    }
}
exports.JWSInvalid = JWSInvalid;
class JWTInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWT_INVALID';
    }
    static get code() {
        return 'ERR_JWT_INVALID';
    }
}
exports.JWTInvalid = JWTInvalid;
class JWKInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWK_INVALID';
    }
    static get code() {
        return 'ERR_JWK_INVALID';
    }
}
exports.JWKInvalid = JWKInvalid;
class JWKSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_INVALID';
    }
    static get code() {
        return 'ERR_JWKS_INVALID';
    }
}
exports.JWKSInvalid = JWKSInvalid;
class JWKSNoMatchingKey extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_NO_MATCHING_KEY';
        this.message = 'no applicable key found in the JSON Web Key Set';
    }
    static get code() {
        return 'ERR_JWKS_NO_MATCHING_KEY';
    }
}
exports.JWKSNoMatchingKey = JWKSNoMatchingKey;
class JWKSMultipleMatchingKeys extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
        this.message = 'multiple matching keys found in the JSON Web Key Set';
    }
    static get code() {
        return 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
    }
}
exports.JWKSMultipleMatchingKeys = JWKSMultipleMatchingKeys;
class JWKSTimeout extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWKS_TIMEOUT';
        this.message = 'request timed out';
    }
    static get code() {
        return 'ERR_JWKS_TIMEOUT';
    }
}
exports.JWKSTimeout = JWKSTimeout;
class JWSSignatureVerificationFailed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
        this.message = 'signature verification failed';
    }
    static get code() {
        return 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
    }
}
exports.JWSSignatureVerificationFailed = JWSSignatureVerificationFailed;


/***/ }),

/***/ "../../node_modules/stytch/dist/client.js":
/*!************************************************!*\
  !*** ../../node_modules/stytch/dist/client.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Client = void 0;

var _package = __webpack_require__(/*! ../package.json */ "../../node_modules/stytch/package.json");

var jose = _interopRequireWildcard(__webpack_require__(/*! jose */ "../../node_modules/jose/dist/node/cjs/index.js"));

var _isomorphicBase = __webpack_require__(/*! isomorphic-base64 */ "../../node_modules/isomorphic-base64/index.js");

var envs = _interopRequireWildcard(__webpack_require__(/*! ./envs */ "../../node_modules/stytch/dist/envs.js"));

var _crypto_wallets = __webpack_require__(/*! ./crypto_wallets */ "../../node_modules/stytch/dist/crypto_wallets.js");

var _users = __webpack_require__(/*! ./users */ "../../node_modules/stytch/dist/users.js");

var _magic_links = __webpack_require__(/*! ./magic_links */ "../../node_modules/stytch/dist/magic_links.js");

var _oauth = __webpack_require__(/*! ./oauth */ "../../node_modules/stytch/dist/oauth.js");

var _otps = __webpack_require__(/*! ./otps */ "../../node_modules/stytch/dist/otps.js");

var _sessions = __webpack_require__(/*! ./sessions */ "../../node_modules/stytch/dist/sessions.js");

var _totps = __webpack_require__(/*! ./totps */ "../../node_modules/stytch/dist/totps.js");

var _webauthn = __webpack_require__(/*! ./webauthn */ "../../node_modules/stytch/dist/webauthn.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

class Client {
  constructor(config) {
    if (typeof config != "object") {
      throw new Error("Unexpected config type. Refer to https://github.com/stytchauth/stytch-node for how to use the Node client library.");
    }

    if (!config.project_id) {
      throw new Error('Missing "project_id" in config');
    }

    if (!config.secret) {
      throw new Error('Missing "secret" in config');
    }

    if (!config.env) {
      throw new Error('Missing "env" in config');
    }

    if (config.env != envs.test && config.env != envs.live) {// TODO: warn about non-production configuration
    }

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": `Stytch Node v${_package.version}`,
      Authorization: "Basic " + (0, _isomorphicBase.btoa)(config.project_id + ":" + config.secret)
    };
    this.fetchConfig = {
      baseURL: config.env,
      headers,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      agent: config.agent
    }; // Get a baseURL that ends with a slash to make building route URLs easier.

    let baseURL = config.env;

    if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }

    const jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(new URL(`sessions/jwks/${config.project_id}`, baseURL))
    };
    this.users = new _users.Users(this.fetchConfig);
    this.magicLinks = new _magic_links.MagicLinks(this.fetchConfig);
    this.oauth = new _oauth.OAuth(this.fetchConfig);
    this.otps = new _otps.OTPs(this.fetchConfig);
    this.sessions = new _sessions.Sessions(this.fetchConfig, jwtConfig);
    this.totps = new _totps.TOTPs(this.fetchConfig);
    this.webauthn = new _webauthn.WebAuthn(this.fetchConfig);
    this.cryptoWallets = new _crypto_wallets.CryptoWallets(this.fetchConfig);
  }

}

exports.Client = Client;

/***/ }),

/***/ "../../node_modules/stytch/dist/crypto_wallets.js":
/*!********************************************************!*\
  !*** ../../node_modules/stytch/dist/crypto_wallets.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CryptoWallets = void 0;

var _shared = __webpack_require__(/*! ./shared */ "../../node_modules/stytch/dist/shared.js");

class CryptoWallets {
  base_path = "crypto_wallets";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticateStart(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate/start"),
      data
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.CryptoWallets = CryptoWallets;

/***/ }),

/***/ "../../node_modules/stytch/dist/envs.js":
/*!**********************************************!*\
  !*** ../../node_modules/stytch/dist/envs.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.live = exports.test = void 0;
const test = "https://test.stytch.com/v1/";
exports.test = test;
const live = "https://api.stytch.com/v1/";
exports.live = live;

/***/ }),

/***/ "../../node_modules/stytch/dist/errors.js":
/*!************************************************!*\
  !*** ../../node_modules/stytch/dist/errors.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ClientError = exports.RequestError = exports.StytchError = void 0;

class StytchError extends Error {
  constructor(data) {
    super(JSON.stringify(data));
    this.status_code = data.status_code;
    this.request_id = data.request_id;
    this.error_type = data.error_type;
    this.error_message = data.error_message;
    this.error_url = data.error_url;
  }

}

exports.StytchError = StytchError;

class RequestError extends Error {
  constructor(message, request) {
    super(message);
    this.request = request;
  }

}

exports.RequestError = RequestError;

class ClientError extends Error {
  constructor(code, message, cause) {
    let msg = `${code}: ${message}`;

    if (cause) {
      msg += `: ${cause}`;
    }

    super(msg);
    this.code = code;
    this.cause = cause;
  }

}

exports.ClientError = ClientError;

/***/ }),

/***/ "../../node_modules/stytch/dist/index.js":
/*!***********************************************!*\
  !*** ../../node_modules/stytch/dist/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  Client: true,
  envs: true,
  UserSearchOperator: true
};
Object.defineProperty(exports, "Client", ({
  enumerable: true,
  get: function () {
    return _client.Client;
  }
}));
Object.defineProperty(exports, "UserSearchOperator", ({
  enumerable: true,
  get: function () {
    return _users.UserSearchOperator;
  }
}));
exports.envs = void 0;

var _client = __webpack_require__(/*! ./client */ "../../node_modules/stytch/dist/client.js");

var _envs = _interopRequireWildcard(__webpack_require__(/*! ./envs */ "../../node_modules/stytch/dist/envs.js"));

exports.envs = _envs;

var _users = __webpack_require__(/*! ./users */ "../../node_modules/stytch/dist/users.js");

var _errors = __webpack_require__(/*! ./errors */ "../../node_modules/stytch/dist/errors.js");

Object.keys(_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _errors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _errors[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/***/ }),

/***/ "../../node_modules/stytch/dist/magic_links.js":
/*!*****************************************************!*\
  !*** ../../node_modules/stytch/dist/magic_links.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MagicLinks = void 0;

var _shared = __webpack_require__(/*! ./shared */ "../../node_modules/stytch/dist/shared.js");

// eslint-disable-line @typescript-eslint/no-empty-interface
class Email {
  delivery = "email";

  constructor(fetchConfig, parent_path) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
  }

  endpoint(path) {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data
    });
  }

  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data
    });
  }

  invite(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("invite"),
      data
    });
  }

  revokeInvite(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("revoke_invite"),
      data
    });
  }

}

class MagicLinks {
  base_path = "magic_links";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new Email(fetchConfig, this.base_path);
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data: data
    });
  }

  authenticate(token, data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: {
        token,
        ...data
      }
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.MagicLinks = MagicLinks;

/***/ }),

/***/ "../../node_modules/stytch/dist/oauth.js":
/*!***********************************************!*\
  !*** ../../node_modules/stytch/dist/oauth.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OAuth = void 0;

var _shared = __webpack_require__(/*! ./shared */ "../../node_modules/stytch/dist/shared.js");

class OAuth {
  base_path = "oauth";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticate(token, data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: {
        token,
        ...data
      }
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.OAuth = OAuth;

/***/ }),

/***/ "../../node_modules/stytch/dist/otps.js":
/*!**********************************************!*\
  !*** ../../node_modules/stytch/dist/otps.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OTPs = void 0;

var _shared = __webpack_require__(/*! ./shared */ "../../node_modules/stytch/dist/shared.js");

class Email {
  delivery = "email";

  constructor(fetchConfig, base_path) {
    this.fetchConfig = fetchConfig;
    this.base_path = base_path;
  }

  endpoint(path) {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data
    });
  }

  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data
    });
  }

}

class SMS {
  delivery = "sms";

  constructor(fetchConfig, base_path) {
    this.fetchConfig = fetchConfig;
    this.base_path = base_path;
  }

  endpoint(path) {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data
    });
  }

  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data
    });
  }

}

class WhatsApp {
  delivery = "whatsapp";

  constructor(fetchConfig, base_path) {
    this.fetchConfig = fetchConfig;
    this.base_path = base_path;
  }

  endpoint(path) {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data
    });
  }

  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data
    });
  }

}

class OTPs {
  base_path = "otps";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new Email(fetchConfig, this.base_path);
    this.sms = new SMS(fetchConfig, this.base_path);
    this.whatsapp = new WhatsApp(fetchConfig, this.base_path);
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.OTPs = OTPs;

/***/ }),

/***/ "../../node_modules/stytch/dist/sessions.js":
/*!**************************************************!*\
  !*** ../../node_modules/stytch/dist/sessions.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Sessions = void 0;

var jose = _interopRequireWildcard(__webpack_require__(/*! jose */ "../../node_modules/jose/dist/node/cjs/index.js"));

var _shared = __webpack_require__(/*! ./shared */ "../../node_modules/stytch/dist/shared.js");

var _errors = __webpack_require__(/*! ./errors */ "../../node_modules/stytch/dist/errors.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const sessionClaim = "https://stytch.com/session";

class Sessions {
  base_path = "sessions";

  constructor(fetchConfig, jwtConfig) {
    this.fetchConfig = fetchConfig;
    this.jwksClient = jwtConfig.jwks;
    this.jwtOptions = {
      audience: jwtConfig.projectID,
      issuer: `stytch.com/${jwtConfig.projectID}`,
      typ: "JWT"
    };
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  get(params) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: this.base_path,
      params: { ...params
      }
    }).then(res => {
      return { ...res,
        sessions: res.sessions.map(parseSession)
      };
    });
  }

  jwks(project_id) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: this.endpoint(`jwks/${project_id}`)
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user),
        session: parseSession(res.session)
      };
    });
  }
  /** Parse a JWT and verify the signature, preferring local verification over remote.
   *
   * If max_token_age_seconds is set, remote verification will be forced if the JWT was issued at
   * (based on the "iat" claim) more than that many seconds ago.
   *
   * To force remote validation for all tokens, set max_token_age_seconds to zero or use the
   * authenticate method instead.
   */


  async authenticateJwt(jwt, options) {
    try {
      const session = await this.authenticateJwtLocal(jwt, options);
      return {
        session,
        session_jwt: jwt
      };
    } catch (err) {
      // JWT could not be verified locally. Check with the Stytch API.
      return this.authenticate({
        session_jwt: jwt
      });
    }
  }
  /** Parse a JWT and verify the signature locally (without calling /authenticate in the API).
   *
   * If maxTokenAge is set, this will return an error if the JWT was issued (based on the "iat"
   * claim) more than maxTokenAge seconds ago.
   *
   * If max_token_age_seconds is explicitly set to zero, all tokens will be considered too old,
   * even if they are otherwise valid.
   *
   * The value for current_date is used to compare timestamp claims ("exp", "nbf", "iat"). It
   * defaults to the current date (new Date()).
   *
   * The value for clock_tolerance_seconds is the maximum allowable difference when comparing
   * timestamps. It defaults to zero.
   */


  async authenticateJwtLocal(jwt, options) {
    const now = (options === null || options === void 0 ? void 0 : options.current_date) || new Date();
    let payload;

    try {
      const token = await jose.jwtVerify(jwt, this.jwksClient, { ...this.jwtOptions,
        clockTolerance: options === null || options === void 0 ? void 0 : options.clock_tolerance_seconds,
        currentDate: now // Don't pass maxTokenAge directly to jwtVerify because it interprets zero as "infinity".
        // We want zero to mean "every token is stale" and force remote verification.

      });
      payload = token.payload;
    } catch (err) {
      throw new _errors.ClientError("jwt_invalid", "Could not verify JWT", err);
    }

    const maxTokenAge = options === null || options === void 0 ? void 0 : options.max_token_age_seconds;

    if (maxTokenAge != null) {
      const iat = payload.iat;

      if (!iat) {
        throw new _errors.ClientError("jwt_invalid", "JWT was missing iat claim");
      }

      const nowEpoch = +now / 1000; // Epoch seconds from milliseconds

      if (nowEpoch - iat >= maxTokenAge) {
        throw new _errors.ClientError("jwt_too_old", `JWT was issued at ${iat}, more than ${maxTokenAge} seconds ago`);
      }
    }

    const claim = payload[sessionClaim];
    return {
      session_id: claim.id,
      attributes: claim.attributes,
      authentication_factors: claim.authentication_factors,
      user_id: payload.sub || "",
      // Parse the timestamps into Dates. The JWT expiration time is the same as the session's.
      // The exp claim is a Unix timestamp in seconds, so convert it to milliseconds first. The
      // other timestamps are RFC3339-formatted strings.
      started_at: new Date(claim.started_at),
      last_accessed_at: new Date(claim.last_accessed_at),
      // For JWTs that include it, prefer the inner expires_at claim.
      expires_at: new Date(claim.expires_at || (payload.exp || 0) * 1000)
    };
  }

  revoke(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("revoke"),
      data
    });
  }

}

exports.Sessions = Sessions;

function parseSession(session) {
  const started_at = new Date(session.started_at);
  const last_accessed_at = new Date(session.last_accessed_at);
  const expires_at = new Date(session.expires_at);
  return { ...session,
    started_at,
    expires_at,
    last_accessed_at
  };
}

/***/ }),

/***/ "../../node_modules/stytch/dist/shared.js":
/*!************************************************!*\
  !*** ../../node_modules/stytch/dist/shared.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.request = request;
exports.parseUser = parseUser;

var _errors = __webpack_require__(/*! ./errors */ "../../node_modules/stytch/dist/errors.js");

var fetchImport = _interopRequireWildcard(__webpack_require__(/*! isomorphic-unfetch */ "../../node_modules/isomorphic-unfetch/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// https://github.com/developit/unfetch/issues/99
const fetch = fetchImport.default || fetchImport;

async function request(fetchConfig, requestConfig) {
  const url = new URL(requestConfig.url, fetchConfig.baseURL);

  if (requestConfig.params) {
    Object.entries(requestConfig.params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  let response;

  try {
    response = await fetch(url.toString(), {
      method: requestConfig.method,
      body: JSON.stringify(requestConfig.data),
      ...fetchConfig
    });
  } catch (e) {
    const err = e;
    throw new _errors.RequestError(err.message, requestConfig);
  }

  let responseJSON;

  try {
    responseJSON = await response.json();
  } catch (e) {
    const err = e;
    throw new _errors.RequestError(`Unable to parse JSON response from server: ${err.message}`, requestConfig);
  }

  if (response.status >= 400) {
    throw new _errors.StytchError(responseJSON);
  }

  return responseJSON;
}

function parseUser(user) {
  return { ...user,
    created_at: new Date(user.created_at)
  };
}

/***/ }),

/***/ "../../node_modules/stytch/dist/totps.js":
/*!***********************************************!*\
  !*** ../../node_modules/stytch/dist/totps.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TOTPs = void 0;

var _shared = __webpack_require__(/*! ./shared */ "../../node_modules/stytch/dist/shared.js");

class TOTPs {
  base_path = "totps";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

  recoveryCodes(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("recovery_codes"),
      data
    });
  }

  recover(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("recover"),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.TOTPs = TOTPs;

/***/ }),

/***/ "../../node_modules/stytch/dist/users.js":
/*!***********************************************!*\
  !*** ../../node_modules/stytch/dist/users.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Users = exports.UserSearchIterator = exports.UserSearchOperator = void 0;

var _shared = __webpack_require__(/*! ./shared */ "../../node_modules/stytch/dist/shared.js");

let UserSearchOperator;
exports.UserSearchOperator = UserSearchOperator;

(function (UserSearchOperator) {
  UserSearchOperator["OR"] = "OR";
  UserSearchOperator["AND"] = "AND";
})(UserSearchOperator || (exports.UserSearchOperator = UserSearchOperator = {}));

var mode;

(function (mode) {
  mode[mode["pending"] = 0] = "pending";
  mode[mode["inProgress"] = 1] = "inProgress";
  mode[mode["complete"] = 2] = "complete";
})(mode || (mode = {}));

class UserSearchIterator {
  constructor(client, data) {
    this.client = client;
    this.data = data;
    this.mode = mode.pending;
  }

  async next() {
    const res = await this.client.search(this.data);
    this.data = { ...this.data,
      cursor: res.results_metadata.next_cursor
    };

    if (!this.data.cursor) {
      this.mode = mode.complete;
    } else {
      this.mode = mode.inProgress;
    }

    return res.results;
  }

  hasNext() {
    return this.mode !== mode.complete;
  }

  async *[Symbol.asyncIterator]() {
    while (this.hasNext()) {
      yield this.next();
    }
  }

}

exports.UserSearchIterator = UserSearchIterator;

class Users {
  base_path = "users";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

  get(userID) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: this.endpoint(userID)
    }).then(res => ({ ...res,
      ...(0, _shared.parseUser)(res)
    }));
  }

  search(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("search"),
      data
    }).then(res => {
      return { ...res,
        results: res.results.map(_shared.parseUser)
      };
    });
  }

  searchAll(data) {
    return new UserSearchIterator(this, data);
  }

  update(userID, data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: this.endpoint(userID),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

  delete(userID) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(userID)
    });
  }

  getPending(params) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: this.endpoint("pending"),
      params: { ...params
      }
    });
  }

  deleteEmail(emailID) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`emails/${emailID}`)
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

  deletePhoneNumber(phoneID) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`phone_numbers/${phoneID}`)
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

  deleteWebAuthnRegistration(webAuthnRegistrationID) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`webauthn_registrations/${webAuthnRegistrationID}`)
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

  deleteTOTP(totpID) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`totps/${totpID}`)
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

  deleteCryptoWallet(cryptoWalletID) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`crypto_wallets/${cryptoWalletID}`)
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.Users = Users;

/***/ }),

/***/ "../../node_modules/stytch/dist/webauthn.js":
/*!**************************************************!*\
  !*** ../../node_modules/stytch/dist/webauthn.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WebAuthn = void 0;

var _shared = __webpack_require__(/*! ./shared */ "../../node_modules/stytch/dist/shared.js");

class WebAuthn {
  base_path = "webauthn";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  registerStart(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("register/start"),
      data
    });
  }

  register(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("register"),
      data
    });
  }

  authenticateStart(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate/start"),
      data
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    }).then(res => {
      return { ...res,
        user: (0, _shared.parseUser)(res.user)
      };
    });
  }

}

exports.WebAuthn = WebAuthn;

/***/ }),

/***/ "../../node_modules/unfetch/dist/unfetch.module.js":
/*!*********************************************************!*\
  !*** ../../node_modules/unfetch/dist/unfetch.module.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})}
//# sourceMappingURL=unfetch.module.js.map


/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("graphql");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node-fetch");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "../../node_modules/stytch/package.json":
/*!**********************************************!*\
  !*** ../../node_modules/stytch/package.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"stytch","version":"5.3.0","description":"A wrapper for the Stytch API","types":"./types/lib/index.d.ts","main":"./dist/index.js","exports":{"require":"./dist/index.js","import":"./module.mjs"},"files":["dist/**/*","types/**/*","module.mjs"],"repository":{"type":"git","url":"git://github.com/stytchauth/stytch-node.git"},"engines":{"node":">= 14.0.0"},"scripts":{"build":"rm -rf dist types && babel lib --out-dir dist --extensions \'.ts\' && tsc --declaration --outDir types --emitDeclarationOnly","format":"prettier --write lib","check-format":"prettier --check lib","lint":"eslint lib","test":"jest","test-packages":"./test-packages/test.sh"},"author":"Stytch","bugs":{"url":"git://github.com/stytchauth/stytch-node/issues"},"license":"MIT","devDependencies":{"@babel/cli":"^7.15.7","@babel/core":"^7.15.5","@babel/preset-env":"^7.15.6","@babel/preset-typescript":"^7.15.0","@types/jest":"^27.0.2","@types/node":"^15.14.9","@types/node-fetch":"^2.6.1","@typescript-eslint/eslint-plugin":"^4.33.0","@typescript-eslint/parser":"^4.33.0","eslint":"^7.32.0","jest":"^27.2.4","prettier":"2.4.1","ts-jest":"^27.0.5","typescript":"^4.4.3"},"dependencies":{"isomorphic-base64":"^1.0.2","isomorphic-unfetch":"^3.1.0","jose":"^4.6.0"},"eslintConfig":{"extends":"airbnb","env":{"commonjs":true,"node":true,"mocha":true},"rules":{"indent":["error",4],"no-underscore-dangle":0,"strict":0,"prefer-rest-params":0}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/apollo-server.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2Fwb2xsby1zZXJ2ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7QUFHQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQVFBOzs7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBRUE7Ozs7Ozs7O0FBUUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0RBOzs7Ozs7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDMURBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0RBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBRU5BO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmFja2VuZC8uL3NyYy9hcG9sbG8tc2VydmVyLnRzIiwid2VicGFjazovL2JhY2tlbmQvLi9zcmMvZW52aXJvbm1lbnQudHMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uL3NyYy9ncmFwaHFsL3Jlc29sdmVycy9pbmRleC50cyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4vc3JjL2dyYXBocWwvcmVzb2x2ZXJzL3N0eXRjaC50cyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4vc3JjL2dyYXBocWwvcmVzb2x2ZXJzL3VuaXQudHMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uL3NyYy9ncmFwaHFsL3R5cGVEZWZzL2luZGV4LnRzIiwid2VicGFjazovL2JhY2tlbmQvLi9zcmMvZ3JhcGhxbC90eXBlRGVmcy9zaGFyZWQudHMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uL3NyYy9ncmFwaHFsL3R5cGVEZWZzL3N0eXRjaC50cyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLWJhc2U2NC9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXVuZmV0Y2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2luZGV4LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9qd2UvY29tcGFjdC9kZWNyeXB0LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9qd2UvY29tcGFjdC9lbmNyeXB0LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9qd2UvZmxhdHRlbmVkL2RlY3J5cHQuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2p3ZS9mbGF0dGVuZWQvZW5jcnlwdC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvandlL2dlbmVyYWwvZGVjcnlwdC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvandlL2dlbmVyYWwvZW5jcnlwdC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvandrL2VtYmVkZGVkLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9qd2svdGh1bWJwcmludC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvandrcy9sb2NhbC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvandrcy9yZW1vdGUuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2p3cy9jb21wYWN0L3NpZ24uanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2p3cy9jb21wYWN0L3ZlcmlmeS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvandzL2ZsYXR0ZW5lZC9zaWduLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9qd3MvZmxhdHRlbmVkL3ZlcmlmeS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvandzL2dlbmVyYWwvc2lnbi5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvandzL2dlbmVyYWwvdmVyaWZ5LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9qd3QvZGVjcnlwdC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvand0L2VuY3J5cHQuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2p3dC9wcm9kdWNlLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9qd3Qvc2lnbi5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvand0L3Vuc2VjdXJlZC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvand0L3ZlcmlmeS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMva2V5L2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMva2V5L2dlbmVyYXRlX2tleV9wYWlyLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9rZXkvZ2VuZXJhdGVfc2VjcmV0LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9rZXkvaW1wb3J0LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9saWIvYWVzZ2Nta3cuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2xpYi9idWZmZXJfdXRpbHMuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2xpYi9jZWsuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2xpYi9jaGVja19pdl9sZW5ndGguanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2xpYi9jaGVja19rZXlfdHlwZS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvbGliL2NoZWNrX3Aycy5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvbGliL2NyeXB0b19rZXkuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2xpYi9kZWNyeXB0X2tleV9tYW5hZ2VtZW50LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9saWIvZW5jcnlwdF9rZXlfbWFuYWdlbWVudC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvbGliL2Vwb2NoLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9saWIvZm9ybWF0X3BlbS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvbGliL2ludmFsaWRfa2V5X2lucHV0LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9saWIvaXNfZGlzam9pbnQuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2xpYi9pc19vYmplY3QuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2xpYi9pdi5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvbGliL2p3dF9jbGFpbXNfc2V0LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9saWIvc2Vjcy5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvbGliL3ZhbGlkYXRlX2FsZ29yaXRobXMuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL2xpYi92YWxpZGF0ZV9jcml0LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL2Flc2t3LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL2FzbjEuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUvYXNuMV9zZXF1ZW5jZV9kZWNvZGVyLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL2FzbjFfc2VxdWVuY2VfZW5jb2Rlci5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9iYXNlNjR1cmwuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUvY2JjX3RhZy5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9jaGVja19jZWtfbGVuZ3RoLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL2NoZWNrX21vZHVsdXNfbGVuZ3RoLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL2NpcGhlcnMuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUvZGVjcnlwdC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9kaWdlc3QuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUvZHNhX2RpZ2VzdC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9lY2RoZXMuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUvZW5jcnlwdC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9lbnYuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUvZmV0Y2hfandrcy5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9nZW5lcmF0ZS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9nZXRfbmFtZWRfY3VydmUuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUvZ2V0X3NpZ25fdmVyaWZ5X2tleS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9obWFjX2RpZ2VzdC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9pc19rZXlfbGlrZS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9pc19rZXlfb2JqZWN0LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL2p3a190b19rZXkuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUva2V5X3RvX2p3ay5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9ub2RlX2tleS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9wYmVzMmt3LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL3JhbmRvbS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9yc2Flcy5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS9zaWduLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL3RpbWluZ19zYWZlX2VxdWFsLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL2pvc2UvZGlzdC9ub2RlL2Nqcy9ydW50aW1lL3ZlcmlmeS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvcnVudGltZS93ZWJjcnlwdG8uanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3J1bnRpbWUvemxpYi5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvdXRpbC9iYXNlNjR1cmwuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvam9zZS9kaXN0L25vZGUvY2pzL3V0aWwvZGVjb2RlX2p3dC5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvdXRpbC9kZWNvZGVfcHJvdGVjdGVkX2hlYWRlci5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kLy4uLy4uL25vZGVfbW9kdWxlcy9qb3NlL2Rpc3Qvbm9kZS9janMvdXRpbC9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvc3R5dGNoL2Rpc3QvY2xpZW50LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L2NyeXB0b193YWxsZXRzLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L2VudnMuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvc3R5dGNoL2Rpc3QvZXJyb3JzLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L21hZ2ljX2xpbmtzLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L29hdXRoLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L290cHMuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvc3R5dGNoL2Rpc3Qvc2Vzc2lvbnMuanMiLCJ3ZWJwYWNrOi8vYmFja2VuZC8uLi8uLi9ub2RlX21vZHVsZXMvc3R5dGNoL2Rpc3Qvc2hhcmVkLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L3RvdHBzLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L3VzZXJzLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3N0eXRjaC9kaXN0L3dlYmF1dGhuLmpzIiwid2VicGFjazovL2JhY2tlbmQvLi4vLi4vbm9kZV9tb2R1bGVzL3VuZmV0Y2gvZGlzdC91bmZldGNoLm1vZHVsZS5qcyIsIndlYnBhY2s6Ly9iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIiIsIndlYnBhY2s6Ly9iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwiYnVmZmVyXCIiLCJ3ZWJwYWNrOi8vYmFja2VuZC9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2JhY2tlbmQvZXh0ZXJuYWwgY29tbW9uanMgXCJldmVudHNcIiIsIndlYnBhY2s6Ly9iYWNrZW5kL2V4dGVybmFsIGNvbW1vbmpzIFwiZ3JhcGhxbFwiIiwid2VicGFjazovL2JhY2tlbmQvZXh0ZXJuYWwgY29tbW9uanMgXCJub2RlLWZldGNoXCIiLCJ3ZWJwYWNrOi8vYmFja2VuZC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vYmFja2VuZC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL2JhY2tlbmQvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vYmFja2VuZC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXRpbFwiIiwid2VicGFjazovL2JhY2tlbmQvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInpsaWJcIiIsIndlYnBhY2s6Ly9iYWNrZW5kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhY2tlbmQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhY2tlbmQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYWNrZW5kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmFja2VuZC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhY2tlbmQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhY2tlbmQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwb2xsb1NlcnZlciB9IGZyb20gXCJhcG9sbG8tc2VydmVyLWxhbWJkYVwiO1xuaW1wb3J0IHJlc29sdmVycyBmcm9tIFwiLi9ncmFwaHFsL3Jlc29sdmVyc1wiO1xuaW1wb3J0IHR5cGVEZWZzIGZyb20gXCIuL2dyYXBocWwvdHlwZURlZnNcIjtcblxuY29uc3QgYXBvbGxvU2VydmVyID0gbmV3IEFwb2xsb1NlcnZlcih7XG5cdHJlc29sdmVycyxcblx0dHlwZURlZnMsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdyYXBocWxIYW5kbGVyID0gYXBvbGxvU2VydmVyLmNyZWF0ZUhhbmRsZXIoKTtcbiIsInR5cGUgRW52aXJvbm1lbnQgPSB7XG5cdFNUWVRDSF9QUk9KRUNUX0lEOiBzdHJpbmc7XG5cdFNUWVRDSF9TRUNSRVQ6IHN0cmluZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0U1RZVENIX1BST0pFQ1RfSUQ6IFN0cmluZyhwcm9jZXNzLmVudi5TVFlUQ0hfUFJPSkVDVF9JRCksXG5cdFNUWVRDSF9TRUNSRVQ6IFN0cmluZyhwcm9jZXNzLmVudi5TVFlUQ0hfU0VDUkVUKSxcbn07XG4iLCJpbXBvcnQgeyByZXNvbHZlcnMgYXMgc3R5Y2hSZXNvbHZlcnMgfSBmcm9tIFwiLi9zdHl0Y2hcIjtcbmltcG9ydCB7IHJlc29sdmVycyBhcyB1bml0UmVzb2x2ZXJzIH0gZnJvbSBcIi4vdW5pdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBbdW5pdFJlc29sdmVycywgc3R5Y2hSZXNvbHZlcnNdO1xuIiwiaW1wb3J0ICogYXMgc3R5dGNoIGZyb20gXCJzdHl0Y2hcIjtcbmltcG9ydCBkb3RlbnYgZnJvbSBcImRvdGVudlwiO1xuaW1wb3J0IHsgU2VuZE9UUEJ5U01TUmVzcG9uc2UgfSBmcm9tIFwic3R5dGNoL3R5cGVzL2xpYi9vdHBzXCI7XG5pbXBvcnQgeyBTdHl0Y2hFcnJvciB9IGZyb20gXCJzdHl0Y2hcIjtcbmltcG9ydCBlbnZpcm9ubWVudCBmcm9tIFwiLi4vLi4vZW52aXJvbm1lbnRcIjtcblxuLy9sb2FkIGVudmlyb25tZW50IHZhcmlhYmxlc1xuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCBzdHl0Y2hfY2xpZW50ID0gbmV3IHN0eXRjaC5DbGllbnQoe1xuXHRwcm9qZWN0X2lkOiBlbnZpcm9ubWVudC5TVFlUQ0hfUFJPSkVDVF9JRCxcblx0c2VjcmV0OiBlbnZpcm9ubWVudC5TVFlUQ0hfU0VDUkVULFxuXHRlbnY6IHN0eXRjaC5lbnZzLnRlc3QsXG59KTtcblxudHlwZSBMb2dpbk9yQ3JlYXRlQXJncyA9IHtcblx0cGhvbmVOdW1iZXI/OiBzdHJpbmc7XG5cdGVtYWlsPzogc3RyaW5nO1xufTtcblxudHlwZSBBdXRoZW50aWNhdGVBcmdzID0ge1xuXHRtZXRob2RJZDogc3RyaW5nO1xuXHRjb2RlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZXJzID0ge1xuXHRRdWVyeToge1xuXHRcdGxvZ2luT3JDcmVhdGVTTVM6IGFzeW5jIChfOiBhbnksIHsgcGhvbmVOdW1iZXIgfTogTG9naW5PckNyZWF0ZUFyZ3MpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKHBob25lTnVtYmVyKTtcblx0XHRcdGNvbnN0IHsgcGhvbmVfaWQsIHVzZXJfaWQgfSA9IGF3YWl0IHN0eXRjaF9jbGllbnQub3Rwcy5zbXMubG9naW5PckNyZWF0ZSh7XG5cdFx0XHRcdHBob25lX251bWJlcjogXCIrMTAwMDAwMDAwMDBcIixcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHsgcGhvbmVfaWQsIHVzZXJfaWQgfTtcblx0XHR9LFxuXHRcdGxvZ2luT3JDcmVhdGVFbWFpbDogYXN5bmMgKF86IGFueSwgeyBlbWFpbCB9OiBMb2dpbk9yQ3JlYXRlQXJncykgPT4ge1xuXHRcdFx0Y29uc3QgeyBlbWFpbF9pZCwgdXNlcl9pZCB9ID1cblx0XHRcdFx0YXdhaXQgc3R5dGNoX2NsaWVudC5vdHBzLmVtYWlsLmxvZ2luT3JDcmVhdGUoe1xuXHRcdFx0XHRcdGVtYWlsOiBlbWFpbCB8fCBcIlwiLFxuXHRcdFx0XHR9KTtcblx0XHRcdHJldHVybiB7IGVtYWlsX2lkLCB1c2VyX2lkIH07XG5cdFx0fSxcblx0XHRhdXRoZW50aWNhdGVPVFA6IGFzeW5jIChfOiBhbnksIHsgbWV0aG9kSWQsIGNvZGUgfTogQXV0aGVudGljYXRlQXJncykgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgeyB1c2VyLCBzdGF0dXNfY29kZSB9ID0gYXdhaXQgc3R5dGNoX2NsaWVudC5vdHBzLmF1dGhlbnRpY2F0ZSh7XG5cdFx0XHRcdFx0bWV0aG9kX2lkOiBcInBob25lLW51bWJlci10ZXN0LTk4Y2ZiZTE5LTZjOGYtNGI4Yi1iNjJhLWU3OGE1YTdiZGZmM1wiLFxuXHRcdFx0XHRcdGNvZGU6IFwiMDAwMDAwXCIsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiB7IHN0YXR1c19jb2RlIH07XG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0Y29uc3QgeyBlcnJvcl9tZXNzYWdlLCBlcnJvcl90eXBlLCBzdGF0dXNfY29kZSB9ID0gZXJyIGFzIFN0eXRjaEVycm9yO1xuXHRcdFx0XHRyZXR1cm4geyBlcnJvcl9tZXNzYWdlLCBlcnJvcl90eXBlLCBzdGF0dXNfY29kZSB9O1xuXHRcdFx0fVxuXHRcdH0sXG5cdH0sXG5cdEF1dGhlbnRpY2F0ZVJlc3BvbnNlOiB7XG5cdFx0X19yZXNvbHZlVHlwZTogKG9iajogeyBzdGF0dXNfY29kZTogbnVtYmVyIH0pID0+IHtcblx0XHRcdGlmIChvYmouc3RhdHVzX2NvZGUgPT09IDIwMCkge1xuXHRcdFx0XHRyZXR1cm4gXCJTdGF0dXNDb2RlXCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gXCJTdHl0Y2hFcnJvclwiO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH0sXG59O1xuIiwiZXhwb3J0IGNvbnN0IHJlc29sdmVycyA9IHtcblx0UXVlcnk6IHtcblx0XHRnZXRab2U6ICgpID0+IFwiem9lXCIsXG5cdFx0Z2V0TGFuZG9uOiAoKSA9PiBcIkxhbmRvblwiLFxuXHRcdGdldE1vbmV5OiAoKSA9PiAxMDAwMDAwMDAwLFxuXHR9LFxufTtcbiIsImltcG9ydCB7IHR5cGVEZWZzIGFzIHN0eXRjaFR5cGVEZWZzIH0gZnJvbSBcIi4vc3R5dGNoXCI7XG5pbXBvcnQgeyB0eXBlRGVmcyBhcyBjdXN0b21UeXBlRGVmcyB9IGZyb20gXCIuL3NoYXJlZFwiO1xuXG4vKiBjb25zdCBiYXNlVHlwZURlZiA9IGdxbGBcblx0dHlwZSBRdWVyeSB7XG5cdFx0X2VtcHR5OiBTdHJpbmdcblx0fVxuYDsgKi9cblxuZXhwb3J0IGRlZmF1bHQgW3N0eXRjaFR5cGVEZWZzLCBjdXN0b21UeXBlRGVmc107XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIjtcbmltcG9ydCB7IEdyYXBoUUxTY2FsYXJUeXBlLCBLaW5kIH0gZnJvbSBcImdyYXBocWxcIjtcblxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxuXHR0eXBlIFF1ZXJ5IHtcblx0XHRnZXRMYW5kb246IFN0cmluZ1xuXHRcdGdldFpvZTogU3RyaW5nXG5cdFx0Z2V0TW9uZXk6IEludFxuXHR9XG5cblx0c2NhbGFyIERhdGVcbmA7XG5cbmNvbnN0IGRhdGVTY2FsYXIgPSBuZXcgR3JhcGhRTFNjYWxhclR5cGUoe1xuXHRuYW1lOiBcIkRhdGVcIixcblx0ZGVzY3JpcHRpb246IFwiRGF0ZSBjdXN0b20gc2NhbGFyIHR5cGVcIixcblx0c2VyaWFsaXplKHZhbHVlOiBhbnkpIHtcblx0XHRyZXR1cm4gdmFsdWUuZ2V0VGltZSgpOyAvLyBDb252ZXJ0IG91dGdvaW5nIERhdGUgdG8gaW50ZWdlciBmb3IgSlNPTlxuXHR9LFxuXHRwYXJzZVZhbHVlKHZhbHVlOiBhbnkpIHtcblx0XHRyZXR1cm4gbmV3IERhdGUodmFsdWUpOyAvLyBDb252ZXJ0IGluY29taW5nIGludGVnZXIgdG8gRGF0ZVxuXHR9LFxuXHRwYXJzZUxpdGVyYWwoYXN0KSB7XG5cdFx0aWYgKGFzdC5raW5kID09PSBLaW5kLklOVCkge1xuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKHBhcnNlSW50KGFzdC52YWx1ZSwgMTApKTsgLy8gQ29udmVydCBoYXJkLWNvZGVkIEFTVCBzdHJpbmcgdG8gaW50ZWdlciBhbmQgdGhlbiB0byBEYXRlXG5cdFx0fVxuXHRcdHJldHVybiBudWxsOyAvLyBJbnZhbGlkIGhhcmQtY29kZWQgdmFsdWUgKG5vdCBhbiBpbnRlZ2VyKVxuXHR9LFxufSk7XG5cbmNvbnN0IHJlc29sdmVycyA9IHtcblx0RGF0ZTogZGF0ZVNjYWxhcixcblx0Ly8gLi4ub3RoZXIgcmVzb2x2ZXIgZGVmaW5pdGlvbnMuLi5cbn07XG4iLCJpbXBvcnQgeyBncWwgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIjtcblxuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxuXHR0eXBlIFF1ZXJ5IHtcblx0XHRsb2dpbk9yQ3JlYXRlU01TKHBob25lTnVtYmVyOiBTdHJpbmcpOiBMb2dpbk9yQ3JlYXRlUmVzcG9uc2Vcblx0XHRsb2dpbk9yQ3JlYXRlRW1haWwoZW1haWw6IFN0cmluZyk6IExvZ2luT3JDcmVhdGVSZXNwb25zZVxuXHRcdGF1dGhlbnRpY2F0ZU9UUChtZXRob2RJZDogU3RyaW5nLCBjb2RlOiBTdHJpbmcpOiBBdXRoZW50aWNhdGVSZXNwb25zZVxuXHR9XG5cblx0ZW51bSBBdXRoVHlwZSB7XG5cdFx0UEhPTkVcblx0XHRFTUFJTFxuXHR9XG5cblx0dW5pb24gQXV0aGVudGljYXRlUmVzcG9uc2UgPSBTdGF0dXNDb2RlIHwgU3R5dGNoRXJyb3JcblxuXHR0eXBlIExvZ2luT3JDcmVhdGVSZXNwb25zZSB7XG5cdFx0cGhvbmVfaWQ6IFN0cmluZ1xuXHRcdGVtYWlsX2lkOiBTdHJpbmdcblx0XHR1c2VyX2lkOiBTdHJpbmchXG5cdH1cblxuXHR0eXBlIFN0YXR1c0NvZGUge1xuXHRcdHN0YXR1c19jb2RlOiBJbnRcblx0fVxuXG5cdHR5cGUgU3R5dGNoRXJyb3Ige1xuXHRcdHN0YXR1c19jb2RlOiBJbnRcblx0XHRlcnJvcl90eXBlOiBTdHJpbmdcblx0XHRlcnJvcl9tZXNzYWdlOiBTdHJpbmdcblx0fVxuXG5cdHR5cGUgU3R5dGNoVXNlciB7XG5cdFx0dXNlcl9pZDogU3RyaW5nIVxuXHRcdGF1dGhUeXBlOiBBdXRoVHlwZSFcblx0XHRwaG9uZV9udW1iZXJzOiBbU3R5dGNoUGhvbmVOdW1iZXJdXG5cdFx0ZW1haWw6IFN0eXRjaEVtYWlsXG5cdFx0cHJvdmlkZXJzOiBbU3R5dGNoT0F1dGhdXG5cdH1cblxuXHR0eXBlIFN0eXRjaEVtYWlsIHtcblx0XHRlbWFpbF9pZDogU3RyaW5nXG5cdFx0ZW1haWw6IFN0cmluZ1xuXHRcdHZlcmlmaWVkOiBCb29sZWFuXG5cdH1cblxuXHR0eXBlIFN0eXRjaFBob25lTnVtYmVyIHtcblx0XHRwaG9uZV9pZDogU3RyaW5nXG5cdFx0cGhvbmVfbnVtYmVyOiBTdHJpbmdcblx0XHR2ZXJpZmllZDogQm9vbGVhblxuXHR9XG5cblx0dHlwZSBTdHl0Y2hPQXV0aCB7XG5cdFx0cHJvdmlkZXJfc3ViamVjdDogU3RyaW5nXG5cdFx0cHJvaXZpZGVyX3R5cGU6IFN0cmluZ1xuXHRcdHByb2ZpbGVfcGljdHVyZV91cmw6IFN0cmluZ1xuXHRcdGxvY2FsZTogU3RyaW5nXG5cdH1cbmA7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuYXRvYiA9IGZ1bmN0aW9uIGF0b2IodmFsKSB7XG4gIHJldHVybiBuZXcgQnVmZmVyKHZhbCwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCk7XG59O1xuXG5leHBvcnRzLmJ0b2EgPSBmdW5jdGlvbiBidG9hKHZhbCkge1xuICByZXR1cm4gbmV3IEJ1ZmZlcih2YWwpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbn07XG4iLCJmdW5jdGlvbiByKG0pe3JldHVybiBtICYmIG0uZGVmYXVsdCB8fCBtO31cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmZldGNoID0gZ2xvYmFsLmZldGNoIHx8IChcblx0dHlwZW9mIHByb2Nlc3M9PSd1bmRlZmluZWQnID8gcihyZXF1aXJlKCd1bmZldGNoJykpIDogKGZ1bmN0aW9uKHVybCwgb3B0cykge1xuXHRcdHJldHVybiByKHJlcXVpcmUoJ25vZGUtZmV0Y2gnKSkoU3RyaW5nKHVybCkucmVwbGFjZSgvXlxcL1xcLy9nLCdodHRwczovLycpLCBvcHRzKTtcblx0fSlcbik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYmFzZTY0dXJsID0gZXhwb3J0cy5nZW5lcmF0ZVNlY3JldCA9IGV4cG9ydHMuZ2VuZXJhdGVLZXlQYWlyID0gZXhwb3J0cy5lcnJvcnMgPSBleHBvcnRzLmRlY29kZUp3dCA9IGV4cG9ydHMuZGVjb2RlUHJvdGVjdGVkSGVhZGVyID0gZXhwb3J0cy5pbXBvcnRKV0sgPSBleHBvcnRzLmltcG9ydFg1MDkgPSBleHBvcnRzLmltcG9ydFBLQ1M4ID0gZXhwb3J0cy5pbXBvcnRTUEtJID0gZXhwb3J0cy5leHBvcnRKV0sgPSBleHBvcnRzLmV4cG9ydFNQS0kgPSBleHBvcnRzLmV4cG9ydFBLQ1M4ID0gZXhwb3J0cy5VbnNlY3VyZWRKV1QgPSBleHBvcnRzLmNyZWF0ZVJlbW90ZUpXS1NldCA9IGV4cG9ydHMuY3JlYXRlTG9jYWxKV0tTZXQgPSBleHBvcnRzLkVtYmVkZGVkSldLID0gZXhwb3J0cy5jYWxjdWxhdGVKd2tUaHVtYnByaW50ID0gZXhwb3J0cy5FbmNyeXB0SldUID0gZXhwb3J0cy5TaWduSldUID0gZXhwb3J0cy5HZW5lcmFsU2lnbiA9IGV4cG9ydHMuRmxhdHRlbmVkU2lnbiA9IGV4cG9ydHMuQ29tcGFjdFNpZ24gPSBleHBvcnRzLkZsYXR0ZW5lZEVuY3J5cHQgPSBleHBvcnRzLkNvbXBhY3RFbmNyeXB0ID0gZXhwb3J0cy5qd3REZWNyeXB0ID0gZXhwb3J0cy5qd3RWZXJpZnkgPSBleHBvcnRzLmdlbmVyYWxWZXJpZnkgPSBleHBvcnRzLmZsYXR0ZW5lZFZlcmlmeSA9IGV4cG9ydHMuY29tcGFjdFZlcmlmeSA9IGV4cG9ydHMuR2VuZXJhbEVuY3J5cHQgPSBleHBvcnRzLmdlbmVyYWxEZWNyeXB0ID0gZXhwb3J0cy5mbGF0dGVuZWREZWNyeXB0ID0gZXhwb3J0cy5jb21wYWN0RGVjcnlwdCA9IHZvaWQgMDtcbnZhciBkZWNyeXB0X2pzXzEgPSByZXF1aXJlKFwiLi9qd2UvY29tcGFjdC9kZWNyeXB0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiY29tcGFjdERlY3J5cHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlY3J5cHRfanNfMS5jb21wYWN0RGVjcnlwdDsgfSB9KTtcbnZhciBkZWNyeXB0X2pzXzIgPSByZXF1aXJlKFwiLi9qd2UvZmxhdHRlbmVkL2RlY3J5cHQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJmbGF0dGVuZWREZWNyeXB0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWNyeXB0X2pzXzIuZmxhdHRlbmVkRGVjcnlwdDsgfSB9KTtcbnZhciBkZWNyeXB0X2pzXzMgPSByZXF1aXJlKFwiLi9qd2UvZ2VuZXJhbC9kZWNyeXB0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2VuZXJhbERlY3J5cHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlY3J5cHRfanNfMy5nZW5lcmFsRGVjcnlwdDsgfSB9KTtcbnZhciBlbmNyeXB0X2pzXzEgPSByZXF1aXJlKFwiLi9qd2UvZ2VuZXJhbC9lbmNyeXB0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiR2VuZXJhbEVuY3J5cHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuY3J5cHRfanNfMS5HZW5lcmFsRW5jcnlwdDsgfSB9KTtcbnZhciB2ZXJpZnlfanNfMSA9IHJlcXVpcmUoXCIuL2p3cy9jb21wYWN0L3ZlcmlmeS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNvbXBhY3RWZXJpZnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZlcmlmeV9qc18xLmNvbXBhY3RWZXJpZnk7IH0gfSk7XG52YXIgdmVyaWZ5X2pzXzIgPSByZXF1aXJlKFwiLi9qd3MvZmxhdHRlbmVkL3ZlcmlmeS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImZsYXR0ZW5lZFZlcmlmeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmVyaWZ5X2pzXzIuZmxhdHRlbmVkVmVyaWZ5OyB9IH0pO1xudmFyIHZlcmlmeV9qc18zID0gcmVxdWlyZShcIi4vandzL2dlbmVyYWwvdmVyaWZ5LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2VuZXJhbFZlcmlmeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmVyaWZ5X2pzXzMuZ2VuZXJhbFZlcmlmeTsgfSB9KTtcbnZhciB2ZXJpZnlfanNfNCA9IHJlcXVpcmUoXCIuL2p3dC92ZXJpZnkuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJqd3RWZXJpZnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZlcmlmeV9qc180Lmp3dFZlcmlmeTsgfSB9KTtcbnZhciBkZWNyeXB0X2pzXzQgPSByZXF1aXJlKFwiLi9qd3QvZGVjcnlwdC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImp3dERlY3J5cHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlY3J5cHRfanNfNC5qd3REZWNyeXB0OyB9IH0pO1xudmFyIGVuY3J5cHRfanNfMiA9IHJlcXVpcmUoXCIuL2p3ZS9jb21wYWN0L2VuY3J5cHQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb21wYWN0RW5jcnlwdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5jcnlwdF9qc18yLkNvbXBhY3RFbmNyeXB0OyB9IH0pO1xudmFyIGVuY3J5cHRfanNfMyA9IHJlcXVpcmUoXCIuL2p3ZS9mbGF0dGVuZWQvZW5jcnlwdC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkZsYXR0ZW5lZEVuY3J5cHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuY3J5cHRfanNfMy5GbGF0dGVuZWRFbmNyeXB0OyB9IH0pO1xudmFyIHNpZ25fanNfMSA9IHJlcXVpcmUoXCIuL2p3cy9jb21wYWN0L3NpZ24uanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb21wYWN0U2lnblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2lnbl9qc18xLkNvbXBhY3RTaWduOyB9IH0pO1xudmFyIHNpZ25fanNfMiA9IHJlcXVpcmUoXCIuL2p3cy9mbGF0dGVuZWQvc2lnbi5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkZsYXR0ZW5lZFNpZ25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNpZ25fanNfMi5GbGF0dGVuZWRTaWduOyB9IH0pO1xudmFyIHNpZ25fanNfMyA9IHJlcXVpcmUoXCIuL2p3cy9nZW5lcmFsL3NpZ24uanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJHZW5lcmFsU2lnblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2lnbl9qc18zLkdlbmVyYWxTaWduOyB9IH0pO1xudmFyIHNpZ25fanNfNCA9IHJlcXVpcmUoXCIuL2p3dC9zaWduLmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2lnbkpXVFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2lnbl9qc180LlNpZ25KV1Q7IH0gfSk7XG52YXIgZW5jcnlwdF9qc180ID0gcmVxdWlyZShcIi4vand0L2VuY3J5cHQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFbmNyeXB0SldUXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbmNyeXB0X2pzXzQuRW5jcnlwdEpXVDsgfSB9KTtcbnZhciB0aHVtYnByaW50X2pzXzEgPSByZXF1aXJlKFwiLi9qd2svdGh1bWJwcmludC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNhbGN1bGF0ZUp3a1RodW1icHJpbnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRodW1icHJpbnRfanNfMS5jYWxjdWxhdGVKd2tUaHVtYnByaW50OyB9IH0pO1xudmFyIGVtYmVkZGVkX2pzXzEgPSByZXF1aXJlKFwiLi9qd2svZW1iZWRkZWQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJFbWJlZGRlZEpXS1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW1iZWRkZWRfanNfMS5FbWJlZGRlZEpXSzsgfSB9KTtcbnZhciBsb2NhbF9qc18xID0gcmVxdWlyZShcIi4vandrcy9sb2NhbC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNyZWF0ZUxvY2FsSldLU2V0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBsb2NhbF9qc18xLmNyZWF0ZUxvY2FsSldLU2V0OyB9IH0pO1xudmFyIHJlbW90ZV9qc18xID0gcmVxdWlyZShcIi4vandrcy9yZW1vdGUuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjcmVhdGVSZW1vdGVKV0tTZXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbW90ZV9qc18xLmNyZWF0ZVJlbW90ZUpXS1NldDsgfSB9KTtcbnZhciB1bnNlY3VyZWRfanNfMSA9IHJlcXVpcmUoXCIuL2p3dC91bnNlY3VyZWQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJVbnNlY3VyZWRKV1RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuc2VjdXJlZF9qc18xLlVuc2VjdXJlZEpXVDsgfSB9KTtcbnZhciBleHBvcnRfanNfMSA9IHJlcXVpcmUoXCIuL2tleS9leHBvcnQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJleHBvcnRQS0NTOFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZXhwb3J0X2pzXzEuZXhwb3J0UEtDUzg7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJleHBvcnRTUEtJXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBleHBvcnRfanNfMS5leHBvcnRTUEtJOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZXhwb3J0SldLXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBleHBvcnRfanNfMS5leHBvcnRKV0s7IH0gfSk7XG52YXIgaW1wb3J0X2pzXzEgPSByZXF1aXJlKFwiLi9rZXkvaW1wb3J0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaW1wb3J0U1BLSVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaW1wb3J0X2pzXzEuaW1wb3J0U1BLSTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImltcG9ydFBLQ1M4XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpbXBvcnRfanNfMS5pbXBvcnRQS0NTODsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImltcG9ydFg1MDlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGltcG9ydF9qc18xLmltcG9ydFg1MDk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpbXBvcnRKV0tcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGltcG9ydF9qc18xLmltcG9ydEpXSzsgfSB9KTtcbnZhciBkZWNvZGVfcHJvdGVjdGVkX2hlYWRlcl9qc18xID0gcmVxdWlyZShcIi4vdXRpbC9kZWNvZGVfcHJvdGVjdGVkX2hlYWRlci5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlY29kZVByb3RlY3RlZEhlYWRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZGVjb2RlX3Byb3RlY3RlZF9oZWFkZXJfanNfMS5kZWNvZGVQcm90ZWN0ZWRIZWFkZXI7IH0gfSk7XG52YXIgZGVjb2RlX2p3dF9qc18xID0gcmVxdWlyZShcIi4vdXRpbC9kZWNvZGVfand0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVjb2RlSnd0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWNvZGVfand0X2pzXzEuZGVjb2RlSnd0OyB9IH0pO1xuZXhwb3J0cy5lcnJvcnMgPSByZXF1aXJlKFwiLi91dGlsL2Vycm9ycy5qc1wiKTtcbnZhciBnZW5lcmF0ZV9rZXlfcGFpcl9qc18xID0gcmVxdWlyZShcIi4va2V5L2dlbmVyYXRlX2tleV9wYWlyLmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2VuZXJhdGVLZXlQYWlyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBnZW5lcmF0ZV9rZXlfcGFpcl9qc18xLmdlbmVyYXRlS2V5UGFpcjsgfSB9KTtcbnZhciBnZW5lcmF0ZV9zZWNyZXRfanNfMSA9IHJlcXVpcmUoXCIuL2tleS9nZW5lcmF0ZV9zZWNyZXQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZW5lcmF0ZVNlY3JldFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2VuZXJhdGVfc2VjcmV0X2pzXzEuZ2VuZXJhdGVTZWNyZXQ7IH0gfSk7XG5leHBvcnRzLmJhc2U2NHVybCA9IHJlcXVpcmUoXCIuL3V0aWwvYmFzZTY0dXJsLmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbXBhY3REZWNyeXB0ID0gdm9pZCAwO1xuY29uc3QgZGVjcnlwdF9qc18xID0gcmVxdWlyZShcIi4uL2ZsYXR0ZW5lZC9kZWNyeXB0LmpzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBidWZmZXJfdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvYnVmZmVyX3V0aWxzLmpzXCIpO1xuYXN5bmMgZnVuY3Rpb24gY29tcGFjdERlY3J5cHQoandlLCBrZXksIG9wdGlvbnMpIHtcbiAgICBpZiAoandlIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICBqd2UgPSBidWZmZXJfdXRpbHNfanNfMS5kZWNvZGVyLmRlY29kZShqd2UpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGp3ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0NvbXBhY3QgSldFIG11c3QgYmUgYSBzdHJpbmcgb3IgVWludDhBcnJheScpO1xuICAgIH1cbiAgICBjb25zdCB7IDA6IHByb3RlY3RlZEhlYWRlciwgMTogZW5jcnlwdGVkS2V5LCAyOiBpdiwgMzogY2lwaGVydGV4dCwgNDogdGFnLCBsZW5ndGgsIH0gPSBqd2Uuc3BsaXQoJy4nKTtcbiAgICBpZiAobGVuZ3RoICE9PSA1KSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdJbnZhbGlkIENvbXBhY3QgSldFJyk7XG4gICAgfVxuICAgIGNvbnN0IGRlY3J5cHRlZCA9IGF3YWl0ICgwLCBkZWNyeXB0X2pzXzEuZmxhdHRlbmVkRGVjcnlwdCkoe1xuICAgICAgICBjaXBoZXJ0ZXh0LFxuICAgICAgICBpdjogKGl2IHx8IHVuZGVmaW5lZCksXG4gICAgICAgIHByb3RlY3RlZDogcHJvdGVjdGVkSGVhZGVyIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgdGFnOiAodGFnIHx8IHVuZGVmaW5lZCksXG4gICAgICAgIGVuY3J5cHRlZF9rZXk6IGVuY3J5cHRlZEtleSB8fCB1bmRlZmluZWQsXG4gICAgfSwga2V5LCBvcHRpb25zKTtcbiAgICBjb25zdCByZXN1bHQgPSB7IHBsYWludGV4dDogZGVjcnlwdGVkLnBsYWludGV4dCwgcHJvdGVjdGVkSGVhZGVyOiBkZWNyeXB0ZWQucHJvdGVjdGVkSGVhZGVyIH07XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXk6IGRlY3J5cHRlZC5rZXkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY29tcGFjdERlY3J5cHQgPSBjb21wYWN0RGVjcnlwdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Db21wYWN0RW5jcnlwdCA9IHZvaWQgMDtcbmNvbnN0IGVuY3J5cHRfanNfMSA9IHJlcXVpcmUoXCIuLi9mbGF0dGVuZWQvZW5jcnlwdC5qc1wiKTtcbmNsYXNzIENvbXBhY3RFbmNyeXB0IHtcbiAgICBjb25zdHJ1Y3RvcihwbGFpbnRleHQpIHtcbiAgICAgICAgdGhpcy5fZmxhdHRlbmVkID0gbmV3IGVuY3J5cHRfanNfMS5GbGF0dGVuZWRFbmNyeXB0KHBsYWludGV4dCk7XG4gICAgfVxuICAgIHNldENvbnRlbnRFbmNyeXB0aW9uS2V5KGNlaykge1xuICAgICAgICB0aGlzLl9mbGF0dGVuZWQuc2V0Q29udGVudEVuY3J5cHRpb25LZXkoY2VrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEluaXRpYWxpemF0aW9uVmVjdG9yKGl2KSB7XG4gICAgICAgIHRoaXMuX2ZsYXR0ZW5lZC5zZXRJbml0aWFsaXphdGlvblZlY3Rvcihpdik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgIHRoaXMuX2ZsYXR0ZW5lZC5zZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEtleU1hbmFnZW1lbnRQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpIHtcbiAgICAgICAgdGhpcy5fZmxhdHRlbmVkLnNldEtleU1hbmFnZW1lbnRQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXN5bmMgZW5jcnlwdChrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgandlID0gYXdhaXQgdGhpcy5fZmxhdHRlbmVkLmVuY3J5cHQoa2V5LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIFtqd2UucHJvdGVjdGVkLCBqd2UuZW5jcnlwdGVkX2tleSwgandlLml2LCBqd2UuY2lwaGVydGV4dCwgandlLnRhZ10uam9pbignLicpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29tcGFjdEVuY3J5cHQgPSBDb21wYWN0RW5jcnlwdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mbGF0dGVuZWREZWNyeXB0ID0gdm9pZCAwO1xuY29uc3QgYmFzZTY0dXJsX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9iYXNlNjR1cmwuanNcIik7XG5jb25zdCBkZWNyeXB0X2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9kZWNyeXB0LmpzXCIpO1xuY29uc3QgemxpYl9qc18xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvemxpYi5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgaXNfZGlzam9pbnRfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvaXNfZGlzam9pbnQuanNcIik7XG5jb25zdCBpc19vYmplY3RfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvaXNfb2JqZWN0LmpzXCIpO1xuY29uc3QgZGVjcnlwdF9rZXlfbWFuYWdlbWVudF9qc18xID0gcmVxdWlyZShcIi4uLy4uL2xpYi9kZWNyeXB0X2tleV9tYW5hZ2VtZW50LmpzXCIpO1xuY29uc3QgYnVmZmVyX3V0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2J1ZmZlcl91dGlscy5qc1wiKTtcbmNvbnN0IGNla19qc18xID0gcmVxdWlyZShcIi4uLy4uL2xpYi9jZWsuanNcIik7XG5jb25zdCB2YWxpZGF0ZV9jcml0X2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL3ZhbGlkYXRlX2NyaXQuanNcIik7XG5jb25zdCB2YWxpZGF0ZV9hbGdvcml0aG1zX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL3ZhbGlkYXRlX2FsZ29yaXRobXMuanNcIik7XG5hc3luYyBmdW5jdGlvbiBmbGF0dGVuZWREZWNyeXB0KGp3ZSwga2V5LCBvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICghKDAsIGlzX29iamVjdF9qc18xLmRlZmF1bHQpKGp3ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0ZsYXR0ZW5lZCBKV0UgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgICB9XG4gICAgaWYgKGp3ZS5wcm90ZWN0ZWQgPT09IHVuZGVmaW5lZCAmJiBqd2UuaGVhZGVyID09PSB1bmRlZmluZWQgJiYgandlLnVucHJvdGVjdGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pPU0UgSGVhZGVyIG1pc3NpbmcnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBqd2UuaXYgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgSW5pdGlhbGl6YXRpb24gVmVjdG9yIG1pc3Npbmcgb3IgaW5jb3JyZWN0IHR5cGUnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBqd2UuY2lwaGVydGV4dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBDaXBoZXJ0ZXh0IG1pc3Npbmcgb3IgaW5jb3JyZWN0IHR5cGUnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBqd2UudGFnICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnSldFIEF1dGhlbnRpY2F0aW9uIFRhZyBtaXNzaW5nIG9yIGluY29ycmVjdCB0eXBlJyk7XG4gICAgfVxuICAgIGlmIChqd2UucHJvdGVjdGVkICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGp3ZS5wcm90ZWN0ZWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgUHJvdGVjdGVkIEhlYWRlciBpbmNvcnJlY3QgdHlwZScpO1xuICAgIH1cbiAgICBpZiAoandlLmVuY3J5cHRlZF9rZXkgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgandlLmVuY3J5cHRlZF9rZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgRW5jcnlwdGVkIEtleSBpbmNvcnJlY3QgdHlwZScpO1xuICAgIH1cbiAgICBpZiAoandlLmFhZCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBqd2UuYWFkICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnSldFIEFBRCBpbmNvcnJlY3QgdHlwZScpO1xuICAgIH1cbiAgICBpZiAoandlLmhlYWRlciAhPT0gdW5kZWZpbmVkICYmICEoMCwgaXNfb2JqZWN0X2pzXzEuZGVmYXVsdCkoandlLmhlYWRlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBTaGFyZWQgVW5wcm90ZWN0ZWQgSGVhZGVyIGluY29ycmVjdCB0eXBlJyk7XG4gICAgfVxuICAgIGlmIChqd2UudW5wcm90ZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiAhKDAsIGlzX29iamVjdF9qc18xLmRlZmF1bHQpKGp3ZS51bnByb3RlY3RlZCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBQZXItUmVjaXBpZW50IFVucHJvdGVjdGVkIEhlYWRlciBpbmNvcnJlY3QgdHlwZScpO1xuICAgIH1cbiAgICBsZXQgcGFyc2VkUHJvdDtcbiAgICBpZiAoandlLnByb3RlY3RlZCkge1xuICAgICAgICBjb25zdCBwcm90ZWN0ZWRIZWFkZXIgPSAoMCwgYmFzZTY0dXJsX2pzXzEuZGVjb2RlKShqd2UucHJvdGVjdGVkKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBhcnNlZFByb3QgPSBKU09OLnBhcnNlKGJ1ZmZlcl91dGlsc19qc18xLmRlY29kZXIuZGVjb2RlKHByb3RlY3RlZEhlYWRlcikpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgUHJvdGVjdGVkIEhlYWRlciBpcyBpbnZhbGlkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCEoMCwgaXNfZGlzam9pbnRfanNfMS5kZWZhdWx0KShwYXJzZWRQcm90LCBqd2UuaGVhZGVyLCBqd2UudW5wcm90ZWN0ZWQpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgUHJvdGVjdGVkLCBKV0UgVW5wcm90ZWN0ZWQgSGVhZGVyLCBhbmQgSldFIFBlci1SZWNpcGllbnQgVW5wcm90ZWN0ZWQgSGVhZGVyIFBhcmFtZXRlciBuYW1lcyBtdXN0IGJlIGRpc2pvaW50Jyk7XG4gICAgfVxuICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7XG4gICAgICAgIC4uLnBhcnNlZFByb3QsXG4gICAgICAgIC4uLmp3ZS5oZWFkZXIsXG4gICAgICAgIC4uLmp3ZS51bnByb3RlY3RlZCxcbiAgICB9O1xuICAgICgwLCB2YWxpZGF0ZV9jcml0X2pzXzEuZGVmYXVsdCkoZXJyb3JzX2pzXzEuSldFSW52YWxpZCwgbmV3IE1hcCgpLCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY3JpdCwgcGFyc2VkUHJvdCwgam9zZUhlYWRlcik7XG4gICAgaWYgKGpvc2VIZWFkZXIuemlwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFwYXJzZWRQcm90IHx8ICFwYXJzZWRQcm90LnppcCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBcInppcFwiIChDb21wcmVzc2lvbiBBbGdvcml0aG0pIEhlYWRlciBNVVNUIGJlIGludGVncml0eSBwcm90ZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoam9zZUhlYWRlci56aXAgIT09ICdERUYnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnVW5zdXBwb3J0ZWQgSldFIFwiemlwXCIgKENvbXByZXNzaW9uIEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHsgYWxnLCBlbmMgfSA9IGpvc2VIZWFkZXI7XG4gICAgaWYgKHR5cGVvZiBhbGcgIT09ICdzdHJpbmcnIHx8ICFhbGcpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ21pc3NpbmcgSldFIEFsZ29yaXRobSAoYWxnKSBpbiBKV0UgSGVhZGVyJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jICE9PSAnc3RyaW5nJyB8fCAhZW5jKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdtaXNzaW5nIEpXRSBFbmNyeXB0aW9uIEFsZ29yaXRobSAoZW5jKSBpbiBKV0UgSGVhZGVyJyk7XG4gICAgfVxuICAgIGNvbnN0IGtleU1hbmFnZW1lbnRBbGdvcml0aG1zID0gb3B0aW9ucyAmJiAoMCwgdmFsaWRhdGVfYWxnb3JpdGhtc19qc18xLmRlZmF1bHQpKCdrZXlNYW5hZ2VtZW50QWxnb3JpdGhtcycsIG9wdGlvbnMua2V5TWFuYWdlbWVudEFsZ29yaXRobXMpO1xuICAgIGNvbnN0IGNvbnRlbnRFbmNyeXB0aW9uQWxnb3JpdGhtcyA9IG9wdGlvbnMgJiZcbiAgICAgICAgKDAsIHZhbGlkYXRlX2FsZ29yaXRobXNfanNfMS5kZWZhdWx0KSgnY29udGVudEVuY3J5cHRpb25BbGdvcml0aG1zJywgb3B0aW9ucy5jb250ZW50RW5jcnlwdGlvbkFsZ29yaXRobXMpO1xuICAgIGlmIChrZXlNYW5hZ2VtZW50QWxnb3JpdGhtcyAmJiAha2V5TWFuYWdlbWVudEFsZ29yaXRobXMuaGFzKGFsZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VBbGdOb3RBbGxvd2VkKCdcImFsZ1wiIChBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbm90IGFsbG93ZWQnKTtcbiAgICB9XG4gICAgaWYgKGNvbnRlbnRFbmNyeXB0aW9uQWxnb3JpdGhtcyAmJiAhY29udGVudEVuY3J5cHRpb25BbGdvcml0aG1zLmhhcyhlbmMpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFQWxnTm90QWxsb3dlZCgnXCJlbmNcIiAoRW5jcnlwdGlvbiBBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbm90IGFsbG93ZWQnKTtcbiAgICB9XG4gICAgbGV0IGVuY3J5cHRlZEtleTtcbiAgICBpZiAoandlLmVuY3J5cHRlZF9rZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbmNyeXB0ZWRLZXkgPSAoMCwgYmFzZTY0dXJsX2pzXzEuZGVjb2RlKShqd2UuZW5jcnlwdGVkX2tleSk7XG4gICAgfVxuICAgIGxldCByZXNvbHZlZEtleSA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGtleSA9IGF3YWl0IGtleShwYXJzZWRQcm90LCBqd2UpO1xuICAgICAgICByZXNvbHZlZEtleSA9IHRydWU7XG4gICAgfVxuICAgIGxldCBjZWs7XG4gICAgdHJ5IHtcbiAgICAgICAgY2VrID0gYXdhaXQgKDAsIGRlY3J5cHRfa2V5X21hbmFnZW1lbnRfanNfMS5kZWZhdWx0KShhbGcsIGtleSwgZW5jcnlwdGVkS2V5LCBqb3NlSGVhZGVyKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVHlwZUVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgY2VrID0gKDAsIGNla19qc18xLmRlZmF1bHQpKGVuYyk7XG4gICAgfVxuICAgIGNvbnN0IGl2ID0gKDAsIGJhc2U2NHVybF9qc18xLmRlY29kZSkoandlLml2KTtcbiAgICBjb25zdCB0YWcgPSAoMCwgYmFzZTY0dXJsX2pzXzEuZGVjb2RlKShqd2UudGFnKTtcbiAgICBjb25zdCBwcm90ZWN0ZWRIZWFkZXIgPSBidWZmZXJfdXRpbHNfanNfMS5lbmNvZGVyLmVuY29kZSgoX2EgPSBqd2UucHJvdGVjdGVkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJyk7XG4gICAgbGV0IGFkZGl0aW9uYWxEYXRhO1xuICAgIGlmIChqd2UuYWFkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWRkaXRpb25hbERhdGEgPSAoMCwgYnVmZmVyX3V0aWxzX2pzXzEuY29uY2F0KShwcm90ZWN0ZWRIZWFkZXIsIGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKCcuJyksIGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKGp3ZS5hYWQpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhID0gcHJvdGVjdGVkSGVhZGVyO1xuICAgIH1cbiAgICBsZXQgcGxhaW50ZXh0ID0gYXdhaXQgKDAsIGRlY3J5cHRfanNfMS5kZWZhdWx0KShlbmMsIGNlaywgKDAsIGJhc2U2NHVybF9qc18xLmRlY29kZSkoandlLmNpcGhlcnRleHQpLCBpdiwgdGFnLCBhZGRpdGlvbmFsRGF0YSk7XG4gICAgaWYgKGpvc2VIZWFkZXIuemlwID09PSAnREVGJykge1xuICAgICAgICBwbGFpbnRleHQgPSBhd2FpdCAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5pbmZsYXRlUmF3KSB8fCB6bGliX2pzXzEuaW5mbGF0ZSkocGxhaW50ZXh0KTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0geyBwbGFpbnRleHQgfTtcbiAgICBpZiAoandlLnByb3RlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdC5wcm90ZWN0ZWRIZWFkZXIgPSBwYXJzZWRQcm90O1xuICAgIH1cbiAgICBpZiAoandlLmFhZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdC5hZGRpdGlvbmFsQXV0aGVudGljYXRlZERhdGEgPSAoMCwgYmFzZTY0dXJsX2pzXzEuZGVjb2RlKShqd2UuYWFkKTtcbiAgICB9XG4gICAgaWYgKGp3ZS51bnByb3RlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdC5zaGFyZWRVbnByb3RlY3RlZEhlYWRlciA9IGp3ZS51bnByb3RlY3RlZDtcbiAgICB9XG4gICAgaWYgKGp3ZS5oZWFkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQudW5wcm90ZWN0ZWRIZWFkZXIgPSBqd2UuaGVhZGVyO1xuICAgIH1cbiAgICBpZiAocmVzb2x2ZWRLZXkpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuZmxhdHRlbmVkRGVjcnlwdCA9IGZsYXR0ZW5lZERlY3J5cHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRmxhdHRlbmVkRW5jcnlwdCA9IGV4cG9ydHMudW5wcm90ZWN0ZWQgPSB2b2lkIDA7XG5jb25zdCBiYXNlNjR1cmxfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL2Jhc2U2NHVybC5qc1wiKTtcbmNvbnN0IGVuY3J5cHRfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL2VuY3J5cHQuanNcIik7XG5jb25zdCB6bGliX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS96bGliLmpzXCIpO1xuY29uc3QgaXZfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvaXYuanNcIik7XG5jb25zdCBlbmNyeXB0X2tleV9tYW5hZ2VtZW50X2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2VuY3J5cHRfa2V5X21hbmFnZW1lbnQuanNcIik7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IGlzX2Rpc2pvaW50X2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2lzX2Rpc2pvaW50LmpzXCIpO1xuY29uc3QgYnVmZmVyX3V0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2J1ZmZlcl91dGlscy5qc1wiKTtcbmNvbnN0IHZhbGlkYXRlX2NyaXRfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvdmFsaWRhdGVfY3JpdC5qc1wiKTtcbmV4cG9ydHMudW5wcm90ZWN0ZWQgPSBTeW1ib2woKTtcbmNsYXNzIEZsYXR0ZW5lZEVuY3J5cHQge1xuICAgIGNvbnN0cnVjdG9yKHBsYWludGV4dCkge1xuICAgICAgICBpZiAoIShwbGFpbnRleHQgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGxhaW50ZXh0IG11c3QgYmUgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BsYWludGV4dCA9IHBsYWludGV4dDtcbiAgICB9XG4gICAgc2V0S2V5TWFuYWdlbWVudFBhcmFtZXRlcnMocGFyYW1ldGVycykge1xuICAgICAgICBpZiAodGhpcy5fa2V5TWFuYWdlbWVudFBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NldEtleU1hbmFnZW1lbnRQYXJhbWV0ZXJzIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fa2V5TWFuYWdlbWVudFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0UHJvdGVjdGVkSGVhZGVyKHByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRQcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIgPSBwcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRTaGFyZWRVbnByb3RlY3RlZEhlYWRlcihzaGFyZWRVbnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5fc2hhcmVkVW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NldFNoYXJlZFVucHJvdGVjdGVkSGVhZGVyIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2hhcmVkVW5wcm90ZWN0ZWRIZWFkZXIgPSBzaGFyZWRVbnByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFVucHJvdGVjdGVkSGVhZGVyKHVucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLl91bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0VW5wcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91bnByb3RlY3RlZEhlYWRlciA9IHVucHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0QWRkaXRpb25hbEF1dGhlbnRpY2F0ZWREYXRhKGFhZCkge1xuICAgICAgICB0aGlzLl9hYWQgPSBhYWQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRDb250ZW50RW5jcnlwdGlvbktleShjZWspIHtcbiAgICAgICAgaWYgKHRoaXMuX2Nlaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0Q29udGVudEVuY3J5cHRpb25LZXkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jZWsgPSBjZWs7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRJbml0aWFsaXphdGlvblZlY3Rvcihpdikge1xuICAgICAgICBpZiAodGhpcy5faXYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NldEluaXRpYWxpemF0aW9uVmVjdG9yIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXYgPSBpdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFzeW5jIGVuY3J5cHQoa2V5LCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghdGhpcy5fcHJvdGVjdGVkSGVhZGVyICYmICF0aGlzLl91bnByb3RlY3RlZEhlYWRlciAmJiAhdGhpcy5fc2hhcmVkVW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdlaXRoZXIgc2V0UHJvdGVjdGVkSGVhZGVyLCBzZXRVbnByb3RlY3RlZEhlYWRlciwgb3Igc2hhcmVkVW5wcm90ZWN0ZWRIZWFkZXIgbXVzdCBiZSBjYWxsZWQgYmVmb3JlICNlbmNyeXB0KCknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISgwLCBpc19kaXNqb2ludF9qc18xLmRlZmF1bHQpKHRoaXMuX3Byb3RlY3RlZEhlYWRlciwgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIsIHRoaXMuX3NoYXJlZFVucHJvdGVjdGVkSGVhZGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBQcm90ZWN0ZWQsIEpXRSBTaGFyZWQgVW5wcm90ZWN0ZWQgYW5kIEpXRSBQZXItUmVjaXBpZW50IEhlYWRlciBQYXJhbWV0ZXIgbmFtZXMgbXVzdCBiZSBkaXNqb2ludCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7XG4gICAgICAgICAgICAuLi50aGlzLl9wcm90ZWN0ZWRIZWFkZXIsXG4gICAgICAgICAgICAuLi50aGlzLl91bnByb3RlY3RlZEhlYWRlcixcbiAgICAgICAgICAgIC4uLnRoaXMuX3NoYXJlZFVucHJvdGVjdGVkSGVhZGVyLFxuICAgICAgICB9O1xuICAgICAgICAoMCwgdmFsaWRhdGVfY3JpdF9qc18xLmRlZmF1bHQpKGVycm9yc19qc18xLkpXRUludmFsaWQsIG5ldyBNYXAoKSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNyaXQsIHRoaXMuX3Byb3RlY3RlZEhlYWRlciwgam9zZUhlYWRlcik7XG4gICAgICAgIGlmIChqb3NlSGVhZGVyLnppcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Byb3RlY3RlZEhlYWRlciB8fCAhdGhpcy5fcHJvdGVjdGVkSGVhZGVyLnppcCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgXCJ6aXBcIiAoQ29tcHJlc3Npb24gQWxnb3JpdGhtKSBIZWFkZXIgTVVTVCBiZSBpbnRlZ3JpdHkgcHJvdGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoam9zZUhlYWRlci56aXAgIT09ICdERUYnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ1Vuc3VwcG9ydGVkIEpXRSBcInppcFwiIChDb21wcmVzc2lvbiBBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgdmFsdWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGFsZywgZW5jIH0gPSBqb3NlSGVhZGVyO1xuICAgICAgICBpZiAodHlwZW9mIGFsZyAhPT0gJ3N0cmluZycgfHwgIWFsZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBcImFsZ1wiIChBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbWlzc2luZyBvciBpbnZhbGlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBlbmMgIT09ICdzdHJpbmcnIHx8ICFlbmMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgXCJlbmNcIiAoRW5jcnlwdGlvbiBBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbWlzc2luZyBvciBpbnZhbGlkJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGVuY3J5cHRlZEtleTtcbiAgICAgICAgaWYgKGFsZyA9PT0gJ2RpcicpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jZWspIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRDb250ZW50RW5jcnlwdGlvbktleSBjYW5ub3QgYmUgY2FsbGVkIHdoZW4gdXNpbmcgRGlyZWN0IEVuY3J5cHRpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGcgPT09ICdFQ0RILUVTJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Nlaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NldENvbnRlbnRFbmNyeXB0aW9uS2V5IGNhbm5vdCBiZSBjYWxsZWQgd2hlbiB1c2luZyBEaXJlY3QgS2V5IEFncmVlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjZWs7XG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBwYXJhbWV0ZXJzO1xuICAgICAgICAgICAgKHsgY2VrLCBlbmNyeXB0ZWRLZXksIHBhcmFtZXRlcnMgfSA9IGF3YWl0ICgwLCBlbmNyeXB0X2tleV9tYW5hZ2VtZW50X2pzXzEuZGVmYXVsdCkoYWxnLCBlbmMsIGtleSwgdGhpcy5fY2VrLCB0aGlzLl9rZXlNYW5hZ2VtZW50UGFyYW1ldGVycykpO1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBleHBvcnRzLnVucHJvdGVjdGVkIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl91bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRVbnByb3RlY3RlZEhlYWRlcihwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyID0geyAuLi50aGlzLl91bnByb3RlY3RlZEhlYWRlciwgLi4ucGFyYW1ldGVycyB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3Byb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm90ZWN0ZWRIZWFkZXIocGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIgPSB7IC4uLnRoaXMuX3Byb3RlY3RlZEhlYWRlciwgLi4ucGFyYW1ldGVycyB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2l2IHx8ICh0aGlzLl9pdiA9ICgwLCBpdl9qc18xLmRlZmF1bHQpKGVuYykpO1xuICAgICAgICBsZXQgYWRkaXRpb25hbERhdGE7XG4gICAgICAgIGxldCBwcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIGxldCBhYWRNZW1iZXI7XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHByb3RlY3RlZEhlYWRlciA9IGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKCgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKEpTT04uc3RyaW5naWZ5KHRoaXMuX3Byb3RlY3RlZEhlYWRlcikpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb3RlY3RlZEhlYWRlciA9IGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKCcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYWFkKSB7XG4gICAgICAgICAgICBhYWRNZW1iZXIgPSAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKSh0aGlzLl9hYWQpO1xuICAgICAgICAgICAgYWRkaXRpb25hbERhdGEgPSAoMCwgYnVmZmVyX3V0aWxzX2pzXzEuY29uY2F0KShwcm90ZWN0ZWRIZWFkZXIsIGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKCcuJyksIGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKGFhZE1lbWJlcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWRkaXRpb25hbERhdGEgPSBwcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNpcGhlcnRleHQ7XG4gICAgICAgIGxldCB0YWc7XG4gICAgICAgIGlmIChqb3NlSGVhZGVyLnppcCA9PT0gJ0RFRicpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmxhdGVkID0gYXdhaXQgKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGVmbGF0ZVJhdykgfHwgemxpYl9qc18xLmRlZmxhdGUpKHRoaXMuX3BsYWludGV4dCk7XG4gICAgICAgICAgICAoeyBjaXBoZXJ0ZXh0LCB0YWcgfSA9IGF3YWl0ICgwLCBlbmNyeXB0X2pzXzEuZGVmYXVsdCkoZW5jLCBkZWZsYXRlZCwgY2VrLCB0aGlzLl9pdiwgYWRkaXRpb25hbERhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgICh7IGNpcGhlcnRleHQsIHRhZyB9ID0gYXdhaXQgKDAsIGVuY3J5cHRfanNfMS5kZWZhdWx0KShlbmMsIHRoaXMuX3BsYWludGV4dCwgY2VrLCB0aGlzLl9pdiwgYWRkaXRpb25hbERhdGEpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqd2UgPSB7XG4gICAgICAgICAgICBjaXBoZXJ0ZXh0OiAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKShjaXBoZXJ0ZXh0KSxcbiAgICAgICAgICAgIGl2OiAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKSh0aGlzLl9pdiksXG4gICAgICAgICAgICB0YWc6ICgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKHRhZyksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChlbmNyeXB0ZWRLZXkpIHtcbiAgICAgICAgICAgIGp3ZS5lbmNyeXB0ZWRfa2V5ID0gKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZW5jcnlwdGVkS2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWFkTWVtYmVyKSB7XG4gICAgICAgICAgICBqd2UuYWFkID0gYWFkTWVtYmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIGp3ZS5wcm90ZWN0ZWQgPSBidWZmZXJfdXRpbHNfanNfMS5kZWNvZGVyLmRlY29kZShwcm90ZWN0ZWRIZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9zaGFyZWRVbnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgandlLnVucHJvdGVjdGVkID0gdGhpcy5fc2hhcmVkVW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICBqd2UuaGVhZGVyID0gdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGp3ZTtcbiAgICB9XG59XG5leHBvcnRzLkZsYXR0ZW5lZEVuY3J5cHQgPSBGbGF0dGVuZWRFbmNyeXB0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYWxEZWNyeXB0ID0gdm9pZCAwO1xuY29uc3QgZGVjcnlwdF9qc18xID0gcmVxdWlyZShcIi4uL2ZsYXR0ZW5lZC9kZWNyeXB0LmpzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBpc19vYmplY3RfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvaXNfb2JqZWN0LmpzXCIpO1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhbERlY3J5cHQoandlLCBrZXksIG9wdGlvbnMpIHtcbiAgICBpZiAoISgwLCBpc19vYmplY3RfanNfMS5kZWZhdWx0KShqd2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdHZW5lcmFsIEpXRSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoandlLnJlY2lwaWVudHMpIHx8ICFqd2UucmVjaXBpZW50cy5ldmVyeShpc19vYmplY3RfanNfMS5kZWZhdWx0KSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnSldFIFJlY2lwaWVudHMgbWlzc2luZyBvciBpbmNvcnJlY3QgdHlwZScpO1xuICAgIH1cbiAgICBpZiAoIWp3ZS5yZWNpcGllbnRzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnSldFIFJlY2lwaWVudHMgaGFzIG5vIG1lbWJlcnMnKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCByZWNpcGllbnQgb2YgandlLnJlY2lwaWVudHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCAoMCwgZGVjcnlwdF9qc18xLmZsYXR0ZW5lZERlY3J5cHQpKHtcbiAgICAgICAgICAgICAgICBhYWQ6IGp3ZS5hYWQsXG4gICAgICAgICAgICAgICAgY2lwaGVydGV4dDogandlLmNpcGhlcnRleHQsXG4gICAgICAgICAgICAgICAgZW5jcnlwdGVkX2tleTogcmVjaXBpZW50LmVuY3J5cHRlZF9rZXksXG4gICAgICAgICAgICAgICAgaGVhZGVyOiByZWNpcGllbnQuaGVhZGVyLFxuICAgICAgICAgICAgICAgIGl2OiBqd2UuaXYsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkOiBqd2UucHJvdGVjdGVkLFxuICAgICAgICAgICAgICAgIHRhZzogandlLnRhZyxcbiAgICAgICAgICAgICAgICB1bnByb3RlY3RlZDogandlLnVucHJvdGVjdGVkLFxuICAgICAgICAgICAgfSwga2V5LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRURlY3J5cHRpb25GYWlsZWQoKTtcbn1cbmV4cG9ydHMuZ2VuZXJhbERlY3J5cHQgPSBnZW5lcmFsRGVjcnlwdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5HZW5lcmFsRW5jcnlwdCA9IHZvaWQgMDtcbmNvbnN0IGVuY3J5cHRfanNfMSA9IHJlcXVpcmUoXCIuLi9mbGF0dGVuZWQvZW5jcnlwdC5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgY2VrX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2Nlay5qc1wiKTtcbmNvbnN0IGlzX2Rpc2pvaW50X2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2lzX2Rpc2pvaW50LmpzXCIpO1xuY29uc3QgZW5jcnlwdF9rZXlfbWFuYWdlbWVudF9qc18xID0gcmVxdWlyZShcIi4uLy4uL2xpYi9lbmNyeXB0X2tleV9tYW5hZ2VtZW50LmpzXCIpO1xuY29uc3QgYmFzZTY0dXJsX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9iYXNlNjR1cmwuanNcIik7XG5jb25zdCB2YWxpZGF0ZV9jcml0X2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL3ZhbGlkYXRlX2NyaXQuanNcIik7XG5jbGFzcyBJbmRpdmlkdWFsUmVjaXBpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihlbmMsIGtleSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnBhcmVudCA9IGVuYztcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIHNldFVucHJvdGVjdGVkSGVhZGVyKHVucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLnVucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRVbnByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5wcm90ZWN0ZWRIZWFkZXIgPSB1bnByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFJlY2lwaWVudCguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5hZGRSZWNpcGllbnQoLi4uYXJncyk7XG4gICAgfVxuICAgIGVuY3J5cHQoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZW5jcnlwdCguLi5hcmdzKTtcbiAgICB9XG4gICAgZG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICAgIH1cbn1cbmNsYXNzIEdlbmVyYWxFbmNyeXB0IHtcbiAgICBjb25zdHJ1Y3RvcihwbGFpbnRleHQpIHtcbiAgICAgICAgdGhpcy5fcmVjaXBpZW50cyA9IFtdO1xuICAgICAgICB0aGlzLl9wbGFpbnRleHQgPSBwbGFpbnRleHQ7XG4gICAgfVxuICAgIGFkZFJlY2lwaWVudChrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50ID0gbmV3IEluZGl2aWR1YWxSZWNpcGllbnQodGhpcywga2V5LCB7IGNyaXQ6IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcml0IH0pO1xuICAgICAgICB0aGlzLl9yZWNpcGllbnRzLnB1c2gocmVjaXBpZW50KTtcbiAgICAgICAgcmV0dXJuIHJlY2lwaWVudDtcbiAgICB9XG4gICAgc2V0UHJvdGVjdGVkSGVhZGVyKHByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5fcHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRQcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIgPSBwcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRTaGFyZWRVbnByb3RlY3RlZEhlYWRlcihzaGFyZWRVbnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NldFNoYXJlZFVucHJvdGVjdGVkSGVhZGVyIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIgPSBzaGFyZWRVbnByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEFkZGl0aW9uYWxBdXRoZW50aWNhdGVkRGF0YShhYWQpIHtcbiAgICAgICAgdGhpcy5fYWFkID0gYWFkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXN5bmMgZW5jcnlwdChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBpZiAoIXRoaXMuX3JlY2lwaWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnYXQgbGVhc3Qgb25lIHJlY2lwaWVudCBtdXN0IGJlIGFkZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IHsgZGVmbGF0ZVJhdzogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRlZmxhdGVSYXcgfTtcbiAgICAgICAgaWYgKHRoaXMuX3JlY2lwaWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBbcmVjaXBpZW50XSA9IHRoaXMuX3JlY2lwaWVudHM7XG4gICAgICAgICAgICBjb25zdCBmbGF0dGVuZWQgPSBhd2FpdCBuZXcgZW5jcnlwdF9qc18xLkZsYXR0ZW5lZEVuY3J5cHQodGhpcy5fcGxhaW50ZXh0KVxuICAgICAgICAgICAgICAgIC5zZXRBZGRpdGlvbmFsQXV0aGVudGljYXRlZERhdGEodGhpcy5fYWFkKVxuICAgICAgICAgICAgICAgIC5zZXRQcm90ZWN0ZWRIZWFkZXIodGhpcy5fcHJvdGVjdGVkSGVhZGVyKVxuICAgICAgICAgICAgICAgIC5zZXRTaGFyZWRVbnByb3RlY3RlZEhlYWRlcih0aGlzLl91bnByb3RlY3RlZEhlYWRlcilcbiAgICAgICAgICAgICAgICAuc2V0VW5wcm90ZWN0ZWRIZWFkZXIocmVjaXBpZW50LnVucHJvdGVjdGVkSGVhZGVyKVxuICAgICAgICAgICAgICAgIC5lbmNyeXB0KHJlY2lwaWVudC5rZXksIHsgLi4ucmVjaXBpZW50Lm9wdGlvbnMsIC4uLm9wdGlvbnMgfSk7XG4gICAgICAgICAgICBsZXQgandlID0ge1xuICAgICAgICAgICAgICAgIGNpcGhlcnRleHQ6IGZsYXR0ZW5lZC5jaXBoZXJ0ZXh0LFxuICAgICAgICAgICAgICAgIGl2OiBmbGF0dGVuZWQuaXYsXG4gICAgICAgICAgICAgICAgcmVjaXBpZW50czogW3t9XSxcbiAgICAgICAgICAgICAgICB0YWc6IGZsYXR0ZW5lZC50YWcsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGZsYXR0ZW5lZC5hYWQpXG4gICAgICAgICAgICAgICAgandlLmFhZCA9IGZsYXR0ZW5lZC5hYWQ7XG4gICAgICAgICAgICBpZiAoZmxhdHRlbmVkLnByb3RlY3RlZClcbiAgICAgICAgICAgICAgICBqd2UucHJvdGVjdGVkID0gZmxhdHRlbmVkLnByb3RlY3RlZDtcbiAgICAgICAgICAgIGlmIChmbGF0dGVuZWQudW5wcm90ZWN0ZWQpXG4gICAgICAgICAgICAgICAgandlLnVucHJvdGVjdGVkID0gZmxhdHRlbmVkLnVucHJvdGVjdGVkO1xuICAgICAgICAgICAgaWYgKGZsYXR0ZW5lZC5lbmNyeXB0ZWRfa2V5KVxuICAgICAgICAgICAgICAgIGp3ZS5yZWNpcGllbnRzWzBdLmVuY3J5cHRlZF9rZXkgPSBmbGF0dGVuZWQuZW5jcnlwdGVkX2tleTtcbiAgICAgICAgICAgIGlmIChmbGF0dGVuZWQuaGVhZGVyKVxuICAgICAgICAgICAgICAgIGp3ZS5yZWNpcGllbnRzWzBdLmhlYWRlciA9IGZsYXR0ZW5lZC5oZWFkZXI7XG4gICAgICAgICAgICByZXR1cm4gandlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBlbmM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcmVjaXBpZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVjaXBpZW50ID0gdGhpcy5fcmVjaXBpZW50c1tpXTtcbiAgICAgICAgICAgIGlmICghKDAsIGlzX2Rpc2pvaW50X2pzXzEuZGVmYXVsdCkodGhpcy5fcHJvdGVjdGVkSGVhZGVyLCB0aGlzLl91bnByb3RlY3RlZEhlYWRlciwgcmVjaXBpZW50LnVucHJvdGVjdGVkSGVhZGVyKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgUHJvdGVjdGVkLCBKV0UgU2hhcmVkIFVucHJvdGVjdGVkIGFuZCBKV0UgUGVyLVJlY2lwaWVudCBIZWFkZXIgUGFyYW1ldGVyIG5hbWVzIG11c3QgYmUgZGlzam9pbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5fcHJvdGVjdGVkSGVhZGVyLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuX3VucHJvdGVjdGVkSGVhZGVyLFxuICAgICAgICAgICAgICAgIC4uLnJlY2lwaWVudC51bnByb3RlY3RlZEhlYWRlcixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCB7IGFsZyB9ID0gam9zZUhlYWRlcjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWxnICE9PSAnc3RyaW5nJyB8fCAhYWxnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBcImFsZ1wiIChBbGdvcml0aG0pIEhlYWRlciBQYXJhbWV0ZXIgbWlzc2luZyBvciBpbnZhbGlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxnID09PSAnZGlyJyB8fCBhbGcgPT09ICdFQ0RILUVTJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdcImRpclwiIGFuZCBcIkVDREgtRVNcIiBhbGcgbWF5IG9ubHkgYmUgdXNlZCB3aXRoIGEgc2luZ2xlIHJlY2lwaWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBqb3NlSGVhZGVyLmVuYyAhPT0gJ3N0cmluZycgfHwgIWpvc2VIZWFkZXIuZW5jKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBcImVuY1wiIChFbmNyeXB0aW9uIEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciBtaXNzaW5nIG9yIGludmFsaWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZW5jKSB7XG4gICAgICAgICAgICAgICAgZW5jID0gam9zZUhlYWRlci5lbmM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbmMgIT09IGpvc2VIZWFkZXIuZW5jKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBcImVuY1wiIChFbmNyeXB0aW9uIEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIHRoZSBzYW1lIGZvciBhbGwgcmVjaXBpZW50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKDAsIHZhbGlkYXRlX2NyaXRfanNfMS5kZWZhdWx0KShlcnJvcnNfanNfMS5KV0VJbnZhbGlkLCBuZXcgTWFwKCksIHJlY2lwaWVudC5vcHRpb25zLmNyaXQsIHRoaXMuX3Byb3RlY3RlZEhlYWRlciwgam9zZUhlYWRlcik7XG4gICAgICAgICAgICBpZiAoam9zZUhlYWRlci56aXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fcHJvdGVjdGVkSGVhZGVyIHx8ICF0aGlzLl9wcm90ZWN0ZWRIZWFkZXIuemlwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgXCJ6aXBcIiAoQ29tcHJlc3Npb24gQWxnb3JpdGhtKSBIZWFkZXIgTVVTVCBiZSBpbnRlZ3JpdHkgcHJvdGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNlayA9ICgwLCBjZWtfanNfMS5kZWZhdWx0KShlbmMpO1xuICAgICAgICBsZXQgandlID0ge1xuICAgICAgICAgICAgY2lwaGVydGV4dDogJycsXG4gICAgICAgICAgICBpdjogJycsXG4gICAgICAgICAgICByZWNpcGllbnRzOiBbXSxcbiAgICAgICAgICAgIHRhZzogJycsXG4gICAgICAgIH07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcmVjaXBpZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVjaXBpZW50ID0gdGhpcy5fcmVjaXBpZW50c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHt9O1xuICAgICAgICAgICAgandlLnJlY2lwaWVudHMucHVzaCh0YXJnZXQpO1xuICAgICAgICAgICAgY29uc3Qgam9zZUhlYWRlciA9IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9wcm90ZWN0ZWRIZWFkZXIsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIsXG4gICAgICAgICAgICAgICAgLi4ucmVjaXBpZW50LnVucHJvdGVjdGVkSGVhZGVyLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHAyYyA9IGpvc2VIZWFkZXIuYWxnLnN0YXJ0c1dpdGgoJ1BCRVMyJykgPyAyMDQ4ICsgaSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmxhdHRlbmVkID0gYXdhaXQgbmV3IGVuY3J5cHRfanNfMS5GbGF0dGVuZWRFbmNyeXB0KHRoaXMuX3BsYWludGV4dClcbiAgICAgICAgICAgICAgICAgICAgLnNldEFkZGl0aW9uYWxBdXRoZW50aWNhdGVkRGF0YSh0aGlzLl9hYWQpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRDb250ZW50RW5jcnlwdGlvbktleShjZWspXG4gICAgICAgICAgICAgICAgICAgIC5zZXRQcm90ZWN0ZWRIZWFkZXIodGhpcy5fcHJvdGVjdGVkSGVhZGVyKVxuICAgICAgICAgICAgICAgICAgICAuc2V0U2hhcmVkVW5wcm90ZWN0ZWRIZWFkZXIodGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRVbnByb3RlY3RlZEhlYWRlcihyZWNpcGllbnQudW5wcm90ZWN0ZWRIZWFkZXIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRLZXlNYW5hZ2VtZW50UGFyYW1ldGVycyh7IHAyYyB9KVxuICAgICAgICAgICAgICAgICAgICAuZW5jcnlwdChyZWNpcGllbnQua2V5LCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnJlY2lwaWVudC5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICBbZW5jcnlwdF9qc18xLnVucHJvdGVjdGVkXTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBqd2UuY2lwaGVydGV4dCA9IGZsYXR0ZW5lZC5jaXBoZXJ0ZXh0O1xuICAgICAgICAgICAgICAgIGp3ZS5pdiA9IGZsYXR0ZW5lZC5pdjtcbiAgICAgICAgICAgICAgICBqd2UudGFnID0gZmxhdHRlbmVkLnRhZztcbiAgICAgICAgICAgICAgICBpZiAoZmxhdHRlbmVkLmFhZClcbiAgICAgICAgICAgICAgICAgICAgandlLmFhZCA9IGZsYXR0ZW5lZC5hYWQ7XG4gICAgICAgICAgICAgICAgaWYgKGZsYXR0ZW5lZC5wcm90ZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgIGp3ZS5wcm90ZWN0ZWQgPSBmbGF0dGVuZWQucHJvdGVjdGVkO1xuICAgICAgICAgICAgICAgIGlmIChmbGF0dGVuZWQudW5wcm90ZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgIGp3ZS51bnByb3RlY3RlZCA9IGZsYXR0ZW5lZC51bnByb3RlY3RlZDtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZW5jcnlwdGVkX2tleSA9IGZsYXR0ZW5lZC5lbmNyeXB0ZWRfa2V5O1xuICAgICAgICAgICAgICAgIGlmIChmbGF0dGVuZWQuaGVhZGVyKVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuaGVhZGVyID0gZmxhdHRlbmVkLmhlYWRlcjtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZW5jcnlwdGVkS2V5LCBwYXJhbWV0ZXJzIH0gPSBhd2FpdCAoMCwgZW5jcnlwdF9rZXlfbWFuYWdlbWVudF9qc18xLmRlZmF1bHQpKCgoX2EgPSByZWNpcGllbnQudW5wcm90ZWN0ZWRIZWFkZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hbGcpIHx8XG4gICAgICAgICAgICAgICAgKChfYiA9IHRoaXMuX3Byb3RlY3RlZEhlYWRlcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFsZykgfHxcbiAgICAgICAgICAgICAgICAoKF9jID0gdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5hbGcpLCBlbmMsIHJlY2lwaWVudC5rZXksIGNlaywgeyBwMmMgfSk7XG4gICAgICAgICAgICB0YXJnZXQuZW5jcnlwdGVkX2tleSA9ICgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKGVuY3J5cHRlZEtleSk7XG4gICAgICAgICAgICBpZiAocmVjaXBpZW50LnVucHJvdGVjdGVkSGVhZGVyIHx8IHBhcmFtZXRlcnMpXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmhlYWRlciA9IHsgLi4ucmVjaXBpZW50LnVucHJvdGVjdGVkSGVhZGVyLCAuLi5wYXJhbWV0ZXJzIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGp3ZTtcbiAgICB9XG59XG5leHBvcnRzLkdlbmVyYWxFbmNyeXB0ID0gR2VuZXJhbEVuY3J5cHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRW1iZWRkZWRKV0sgPSB2b2lkIDA7XG5jb25zdCBpbXBvcnRfanNfMSA9IHJlcXVpcmUoXCIuLi9rZXkvaW1wb3J0LmpzXCIpO1xuY29uc3QgaXNfb2JqZWN0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2lzX29iamVjdC5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuYXN5bmMgZnVuY3Rpb24gRW1iZWRkZWRKV0socHJvdGVjdGVkSGVhZGVyLCB0b2tlbikge1xuICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7XG4gICAgICAgIC4uLnByb3RlY3RlZEhlYWRlcixcbiAgICAgICAgLi4udG9rZW4uaGVhZGVyLFxuICAgIH07XG4gICAgaWYgKCEoMCwgaXNfb2JqZWN0X2pzXzEuZGVmYXVsdCkoam9zZUhlYWRlci5qd2spKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdcImp3a1wiIChKU09OIFdlYiBLZXkpIEhlYWRlciBQYXJhbWV0ZXIgbXVzdCBiZSBhIEpTT04gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGtleSA9IGF3YWl0ICgwLCBpbXBvcnRfanNfMS5pbXBvcnRKV0spKHsgLi4uam9zZUhlYWRlci5qd2ssIGV4dDogdHJ1ZSB9LCBqb3NlSGVhZGVyLmFsZywgdHJ1ZSk7XG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgfHwga2V5LnR5cGUgIT09ICdwdWJsaWMnKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdcImp3a1wiIChKU09OIFdlYiBLZXkpIEhlYWRlciBQYXJhbWV0ZXIgbXVzdCBiZSBhIHB1YmxpYyBrZXknKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbn1cbmV4cG9ydHMuRW1iZWRkZWRKV0sgPSBFbWJlZGRlZEpXSztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jYWxjdWxhdGVKd2tUaHVtYnByaW50ID0gdm9pZCAwO1xuY29uc3QgZGlnZXN0X2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9kaWdlc3QuanNcIik7XG5jb25zdCBiYXNlNjR1cmxfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2Jhc2U2NHVybC5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgYnVmZmVyX3V0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2J1ZmZlcl91dGlscy5qc1wiKTtcbmNvbnN0IGlzX29iamVjdF9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9pc19vYmplY3QuanNcIik7XG5jb25zdCBjaGVjayA9ICh2YWx1ZSwgZGVzY3JpcHRpb24pID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyB8fCAhdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXS0ludmFsaWQoYCR7ZGVzY3JpcHRpb259IG1pc3Npbmcgb3IgaW52YWxpZGApO1xuICAgIH1cbn07XG5hc3luYyBmdW5jdGlvbiBjYWxjdWxhdGVKd2tUaHVtYnByaW50KGp3aywgZGlnZXN0QWxnb3JpdGhtID0gJ3NoYTI1NicpIHtcbiAgICBpZiAoISgwLCBpc19vYmplY3RfanNfMS5kZWZhdWx0KShqd2spKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0pXSyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBpZiAoZGlnZXN0QWxnb3JpdGhtICE9PSAnc2hhMjU2JyAmJlxuICAgICAgICBkaWdlc3RBbGdvcml0aG0gIT09ICdzaGEzODQnICYmXG4gICAgICAgIGRpZ2VzdEFsZ29yaXRobSAhPT0gJ3NoYTUxMicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGlnZXN0QWxnb3JpdGhtIG11c3Qgb25lIG9mIFwic2hhMjU2XCIsIFwic2hhMzg0XCIsIG9yIFwic2hhNTEyXCInKTtcbiAgICB9XG4gICAgbGV0IGNvbXBvbmVudHM7XG4gICAgc3dpdGNoIChqd2sua3R5KSB7XG4gICAgICAgIGNhc2UgJ0VDJzpcbiAgICAgICAgICAgIGNoZWNrKGp3ay5jcnYsICdcImNydlwiIChDdXJ2ZSkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjaGVjayhqd2sueCwgJ1wieFwiIChYIENvb3JkaW5hdGUpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY2hlY2soandrLnksICdcInlcIiAoWSBDb29yZGluYXRlKSBQYXJhbWV0ZXInKTtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSB7IGNydjogandrLmNydiwga3R5OiBqd2sua3R5LCB4OiBqd2sueCwgeTogandrLnkgfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdPS1AnOlxuICAgICAgICAgICAgY2hlY2soandrLmNydiwgJ1wiY3J2XCIgKFN1YnR5cGUgb2YgS2V5IFBhaXIpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY2hlY2soandrLngsICdcInhcIiAoUHVibGljIEtleSkgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjb21wb25lbnRzID0geyBjcnY6IGp3ay5jcnYsIGt0eTogandrLmt0eSwgeDogandrLnggfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdSU0EnOlxuICAgICAgICAgICAgY2hlY2soandrLmUsICdcImVcIiAoRXhwb25lbnQpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY2hlY2soandrLm4sICdcIm5cIiAoTW9kdWx1cykgUGFyYW1ldGVyJyk7XG4gICAgICAgICAgICBjb21wb25lbnRzID0geyBlOiBqd2suZSwga3R5OiBqd2sua3R5LCBuOiBqd2subiB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ29jdCc6XG4gICAgICAgICAgICBjaGVjayhqd2suaywgJ1wia1wiIChLZXkgVmFsdWUpIFBhcmFtZXRlcicpO1xuICAgICAgICAgICAgY29tcG9uZW50cyA9IHsgazogandrLmssIGt0eTogandrLmt0eSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnXCJrdHlcIiAoS2V5IFR5cGUpIFBhcmFtZXRlciBtaXNzaW5nIG9yIHVuc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBidWZmZXJfdXRpbHNfanNfMS5lbmNvZGVyLmVuY29kZShKU09OLnN0cmluZ2lmeShjb21wb25lbnRzKSk7XG4gICAgcmV0dXJuICgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKGF3YWl0ICgwLCBkaWdlc3RfanNfMS5kZWZhdWx0KShkaWdlc3RBbGdvcml0aG0sIGRhdGEpKTtcbn1cbmV4cG9ydHMuY2FsY3VsYXRlSndrVGh1bWJwcmludCA9IGNhbGN1bGF0ZUp3a1RodW1icHJpbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlTG9jYWxKV0tTZXQgPSBleHBvcnRzLkxvY2FsSldLU2V0ID0gZXhwb3J0cy5pc0pXS1NMaWtlID0gdm9pZCAwO1xuY29uc3QgaW1wb3J0X2pzXzEgPSByZXF1aXJlKFwiLi4va2V5L2ltcG9ydC5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgaXNfb2JqZWN0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2lzX29iamVjdC5qc1wiKTtcbmZ1bmN0aW9uIGdldEt0eUZyb21BbGcoYWxnKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgYWxnID09PSAnc3RyaW5nJyAmJiBhbGcuc2xpY2UoMCwgMikpIHtcbiAgICAgICAgY2FzZSAnUlMnOlxuICAgICAgICBjYXNlICdQUyc6XG4gICAgICAgICAgICByZXR1cm4gJ1JTQSc7XG4gICAgICAgIGNhc2UgJ0VTJzpcbiAgICAgICAgICAgIHJldHVybiAnRUMnO1xuICAgICAgICBjYXNlICdFZCc6XG4gICAgICAgICAgICByZXR1cm4gJ09LUCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnVW5zdXBwb3J0ZWQgXCJhbGdcIiB2YWx1ZSBmb3IgYSBKU09OIFdlYiBLZXkgU2V0Jyk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNKV0tTTGlrZShqd2tzKSB7XG4gICAgcmV0dXJuIChqd2tzICYmXG4gICAgICAgIHR5cGVvZiBqd2tzID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBBcnJheS5pc0FycmF5KGp3a3Mua2V5cykgJiZcbiAgICAgICAgandrcy5rZXlzLmV2ZXJ5KGlzSldLTGlrZSkpO1xufVxuZXhwb3J0cy5pc0pXS1NMaWtlID0gaXNKV0tTTGlrZTtcbmZ1bmN0aW9uIGlzSldLTGlrZShrZXkpIHtcbiAgICByZXR1cm4gKDAsIGlzX29iamVjdF9qc18xLmRlZmF1bHQpKGtleSk7XG59XG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgICBpZiAodHlwZW9mIHN0cnVjdHVyZWRDbG9uZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gc3RydWN0dXJlZENsb25lKG9iaik7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuY2xhc3MgTG9jYWxKV0tTZXQge1xuICAgIGNvbnN0cnVjdG9yKGp3a3MpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVkID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgaWYgKCFpc0pXS1NMaWtlKGp3a3MpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldLU0ludmFsaWQoJ0pTT04gV2ViIEtleSBTZXQgbWFsZm9ybWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fandrcyA9IGNsb25lKGp3a3MpO1xuICAgIH1cbiAgICBhc3luYyBnZXRLZXkocHJvdGVjdGVkSGVhZGVyLCB0b2tlbikge1xuICAgICAgICBjb25zdCB7IGFsZywga2lkIH0gPSB7IC4uLnByb3RlY3RlZEhlYWRlciwgLi4udG9rZW4uaGVhZGVyIH07XG4gICAgICAgIGNvbnN0IGt0eSA9IGdldEt0eUZyb21BbGcoYWxnKTtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlcyA9IHRoaXMuX2p3a3Mua2V5cy5maWx0ZXIoKGp3aykgPT4ge1xuICAgICAgICAgICAgbGV0IGNhbmRpZGF0ZSA9IGt0eSA9PT0gandrLmt0eTtcbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGUgJiYgdHlwZW9mIGtpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBraWQgPT09IGp3ay5raWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlICYmIHR5cGVvZiBqd2suYWxnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGFsZyA9PT0gandrLmFsZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGUgJiYgdHlwZW9mIGp3ay51c2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gandrLnVzZSA9PT0gJ3NpZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlICYmIEFycmF5LmlzQXJyYXkoandrLmtleV9vcHMpKSB7XG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlID0gandrLmtleV9vcHMuaW5jbHVkZXMoJ3ZlcmlmeScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZSAmJiBhbGcgPT09ICdFZERTQScpIHtcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnRWQyNTUxOScgfHwgandrLmNydiA9PT0gJ0VkNDQ4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnUC0yNTYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VTMjU2Syc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnc2VjcDI1NmsxJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdFUzM4NCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGUgPSBqd2suY3J2ID09PSAnUC0zODQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0VTNTEyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IGp3ay5jcnYgPT09ICdQLTUyMSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2FuZGlkYXRlO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgeyAwOiBqd2ssIGxlbmd0aCB9ID0gY2FuZGlkYXRlcztcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXS1NOb01hdGNoaW5nS2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldLU011bHRpcGxlTWF0Y2hpbmdLZXlzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2FjaGVkID0gdGhpcy5fY2FjaGVkLmdldChqd2spIHx8IHRoaXMuX2NhY2hlZC5zZXQoandrLCB7fSkuZ2V0KGp3ayk7XG4gICAgICAgIGlmIChjYWNoZWRbYWxnXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlPYmplY3QgPSBhd2FpdCAoMCwgaW1wb3J0X2pzXzEuaW1wb3J0SldLKSh7IC4uLmp3aywgZXh0OiB0cnVlIH0sIGFsZyk7XG4gICAgICAgICAgICBpZiAoa2V5T2JqZWN0IGluc3RhbmNlb2YgVWludDhBcnJheSB8fCBrZXlPYmplY3QudHlwZSAhPT0gJ3B1YmxpYycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldLU0ludmFsaWQoJ0pTT04gV2ViIEtleSBTZXQgbWVtYmVycyBtdXN0IGJlIHB1YmxpYyBrZXlzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWNoZWRbYWxnXSA9IGtleU9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FjaGVkW2FsZ107XG4gICAgfVxufVxuZXhwb3J0cy5Mb2NhbEpXS1NldCA9IExvY2FsSldLU2V0O1xuZnVuY3Rpb24gY3JlYXRlTG9jYWxKV0tTZXQoandrcykge1xuICAgIHJldHVybiBMb2NhbEpXS1NldC5wcm90b3R5cGUuZ2V0S2V5LmJpbmQobmV3IExvY2FsSldLU2V0KGp3a3MpKTtcbn1cbmV4cG9ydHMuY3JlYXRlTG9jYWxKV0tTZXQgPSBjcmVhdGVMb2NhbEpXS1NldDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jcmVhdGVSZW1vdGVKV0tTZXQgPSB2b2lkIDA7XG5jb25zdCBmZXRjaF9qd2tzX2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9mZXRjaF9qd2tzLmpzXCIpO1xuY29uc3QgZW52X2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9lbnYuanNcIik7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IGxvY2FsX2pzXzEgPSByZXF1aXJlKFwiLi9sb2NhbC5qc1wiKTtcbmNsYXNzIFJlbW90ZUpXS1NldCBleHRlbmRzIGxvY2FsX2pzXzEuTG9jYWxKV0tTZXQge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih7IGtleXM6IFtdIH0pO1xuICAgICAgICB0aGlzLl9qd2tzID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoISh1cmwgaW5zdGFuY2VvZiBVUkwpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1cmwgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBVUkwnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cmwgPSBuZXcgVVJMKHVybC5ocmVmKTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHsgYWdlbnQ6IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5hZ2VudCwgaGVhZGVyczogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMgfTtcbiAgICAgICAgdGhpcy5fdGltZW91dER1cmF0aW9uID1cbiAgICAgICAgICAgIHR5cGVvZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRpbWVvdXREdXJhdGlvbikgPT09ICdudW1iZXInID8gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRpbWVvdXREdXJhdGlvbiA6IDUwMDA7XG4gICAgICAgIHRoaXMuX2Nvb2xkb3duRHVyYXRpb24gPVxuICAgICAgICAgICAgdHlwZW9mIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY29vbGRvd25EdXJhdGlvbikgPT09ICdudW1iZXInID8gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNvb2xkb3duRHVyYXRpb24gOiAzMDAwMDtcbiAgICAgICAgdGhpcy5fY2FjaGVNYXhBZ2UgPSB0eXBlb2YgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYWNoZU1heEFnZSkgPT09ICdudW1iZXInID8gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhY2hlTWF4QWdlIDogNjAwMDAwO1xuICAgIH1cbiAgICBjb29saW5nRG93bigpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9qd2tzVGltZXN0YW1wID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgPyBEYXRlLm5vdygpIDwgdGhpcy5fandrc1RpbWVzdGFtcCArIHRoaXMuX2Nvb2xkb3duRHVyYXRpb25cbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgfVxuICAgIGZyZXNoKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2p3a3NUaW1lc3RhbXAgPT09ICdudW1iZXInXG4gICAgICAgICAgICA/IERhdGUubm93KCkgPCB0aGlzLl9qd2tzVGltZXN0YW1wICsgdGhpcy5fY2FjaGVNYXhBZ2VcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgfVxuICAgIGFzeW5jIGdldEtleShwcm90ZWN0ZWRIZWFkZXIsIHRva2VuKSB7XG4gICAgICAgIGlmICghdGhpcy5fandrcyB8fCAhdGhpcy5mcmVzaCgpKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgc3VwZXIuZ2V0S2V5KHByb3RlY3RlZEhlYWRlciwgdG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBlcnJvcnNfanNfMS5KV0tTTm9NYXRjaGluZ0tleSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvb2xpbmdEb3duKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5nZXRLZXkocHJvdGVjdGVkSGVhZGVyLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHJlbG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BlbmRpbmdGZXRjaCAmJiAoMCwgZW52X2pzXzEuaXNDbG91ZGZsYXJlV29ya2VycykoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNEb25lID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGVuZGluZ0ZldGNoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoaXNEb25lLCA1KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaXNEb25lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3BlbmRpbmdGZXRjaCkge1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ0ZldGNoID0gKDAsIGZldGNoX2p3a3NfanNfMS5kZWZhdWx0KSh0aGlzLl91cmwsIHRoaXMuX3RpbWVvdXREdXJhdGlvbiwgdGhpcy5fb3B0aW9ucylcbiAgICAgICAgICAgICAgICAudGhlbigoanNvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKDAsIGxvY2FsX2pzXzEuaXNKV0tTTGlrZSkoanNvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXS1NJbnZhbGlkKCdKU09OIFdlYiBLZXkgU2V0IG1hbGZvcm1lZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9qd2tzID0geyBrZXlzOiBqc29uLmtleXMgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl9qd2tzVGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nRmV0Y2ggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVuZGluZ0ZldGNoID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX3BlbmRpbmdGZXRjaDtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVSZW1vdGVKV0tTZXQodXJsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIFJlbW90ZUpXS1NldC5wcm90b3R5cGUuZ2V0S2V5LmJpbmQobmV3IFJlbW90ZUpXS1NldCh1cmwsIG9wdGlvbnMpKTtcbn1cbmV4cG9ydHMuY3JlYXRlUmVtb3RlSldLU2V0ID0gY3JlYXRlUmVtb3RlSldLU2V0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNvbXBhY3RTaWduID0gdm9pZCAwO1xuY29uc3Qgc2lnbl9qc18xID0gcmVxdWlyZShcIi4uL2ZsYXR0ZW5lZC9zaWduLmpzXCIpO1xuY2xhc3MgQ29tcGFjdFNpZ24ge1xuICAgIGNvbnN0cnVjdG9yKHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5fZmxhdHRlbmVkID0gbmV3IHNpZ25fanNfMS5GbGF0dGVuZWRTaWduKHBheWxvYWQpO1xuICAgIH1cbiAgICBzZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgIHRoaXMuX2ZsYXR0ZW5lZC5zZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFzeW5jIHNpZ24oa2V5LCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGp3cyA9IGF3YWl0IHRoaXMuX2ZsYXR0ZW5lZC5zaWduKGtleSwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChqd3MucGF5bG9hZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1c2UgdGhlIGZsYXR0ZW5lZCBtb2R1bGUgZm9yIGNyZWF0aW5nIEpXUyB3aXRoIGI2NDogZmFsc2UnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7andzLnByb3RlY3RlZH0uJHtqd3MucGF5bG9hZH0uJHtqd3Muc2lnbmF0dXJlfWA7XG4gICAgfVxufVxuZXhwb3J0cy5Db21wYWN0U2lnbiA9IENvbXBhY3RTaWduO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbXBhY3RWZXJpZnkgPSB2b2lkIDA7XG5jb25zdCB2ZXJpZnlfanNfMSA9IHJlcXVpcmUoXCIuLi9mbGF0dGVuZWQvdmVyaWZ5LmpzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBidWZmZXJfdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvYnVmZmVyX3V0aWxzLmpzXCIpO1xuYXN5bmMgZnVuY3Rpb24gY29tcGFjdFZlcmlmeShqd3MsIGtleSwgb3B0aW9ucykge1xuICAgIGlmIChqd3MgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIGp3cyA9IGJ1ZmZlcl91dGlsc19qc18xLmRlY29kZXIuZGVjb2RlKGp3cyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgandzICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnQ29tcGFjdCBKV1MgbXVzdCBiZSBhIHN0cmluZyBvciBVaW50OEFycmF5Jyk7XG4gICAgfVxuICAgIGNvbnN0IHsgMDogcHJvdGVjdGVkSGVhZGVyLCAxOiBwYXlsb2FkLCAyOiBzaWduYXR1cmUsIGxlbmd0aCB9ID0gandzLnNwbGl0KCcuJyk7XG4gICAgaWYgKGxlbmd0aCAhPT0gMykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnSW52YWxpZCBDb21wYWN0IEpXUycpO1xuICAgIH1cbiAgICBjb25zdCB2ZXJpZmllZCA9IGF3YWl0ICgwLCB2ZXJpZnlfanNfMS5mbGF0dGVuZWRWZXJpZnkpKHsgcGF5bG9hZCwgcHJvdGVjdGVkOiBwcm90ZWN0ZWRIZWFkZXIsIHNpZ25hdHVyZSB9LCBrZXksIG9wdGlvbnMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHsgcGF5bG9hZDogdmVyaWZpZWQucGF5bG9hZCwgcHJvdGVjdGVkSGVhZGVyOiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIgfTtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4geyAuLi5yZXN1bHQsIGtleTogdmVyaWZpZWQua2V5IH07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmNvbXBhY3RWZXJpZnkgPSBjb21wYWN0VmVyaWZ5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkZsYXR0ZW5lZFNpZ24gPSB2b2lkIDA7XG5jb25zdCBiYXNlNjR1cmxfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL2Jhc2U2NHVybC5qc1wiKTtcbmNvbnN0IHNpZ25fanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL3NpZ24uanNcIik7XG5jb25zdCBpc19kaXNqb2ludF9qc18xID0gcmVxdWlyZShcIi4uLy4uL2xpYi9pc19kaXNqb2ludC5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgYnVmZmVyX3V0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2J1ZmZlcl91dGlscy5qc1wiKTtcbmNvbnN0IGNoZWNrX2tleV90eXBlX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2NoZWNrX2tleV90eXBlLmpzXCIpO1xuY29uc3QgdmFsaWRhdGVfY3JpdF9qc18xID0gcmVxdWlyZShcIi4uLy4uL2xpYi92YWxpZGF0ZV9jcml0LmpzXCIpO1xuY2xhc3MgRmxhdHRlbmVkU2lnbiB7XG4gICAgY29uc3RydWN0b3IocGF5bG9hZCkge1xuICAgICAgICBpZiAoIShwYXlsb2FkIGluc3RhbmNlb2YgVWludDhBcnJheSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BheWxvYWQgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgfVxuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Byb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0UHJvdGVjdGVkSGVhZGVyIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VW5wcm90ZWN0ZWRIZWFkZXIodW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRVbnByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyID0gdW5wcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhc3luYyBzaWduKGtleSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIXRoaXMuX3Byb3RlY3RlZEhlYWRlciAmJiAhdGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdlaXRoZXIgc2V0UHJvdGVjdGVkSGVhZGVyIG9yIHNldFVucHJvdGVjdGVkSGVhZGVyIG11c3QgYmUgY2FsbGVkIGJlZm9yZSAjc2lnbigpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoMCwgaXNfZGlzam9pbnRfanNfMS5kZWZhdWx0KSh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIsIHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXU0ludmFsaWQoJ0pXUyBQcm90ZWN0ZWQgYW5kIEpXUyBVbnByb3RlY3RlZCBIZWFkZXIgUGFyYW1ldGVyIG5hbWVzIG11c3QgYmUgZGlzam9pbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqb3NlSGVhZGVyID0ge1xuICAgICAgICAgICAgLi4udGhpcy5fcHJvdGVjdGVkSGVhZGVyLFxuICAgICAgICAgICAgLi4udGhpcy5fdW5wcm90ZWN0ZWRIZWFkZXIsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnMgPSAoMCwgdmFsaWRhdGVfY3JpdF9qc18xLmRlZmF1bHQpKGVycm9yc19qc18xLkpXU0ludmFsaWQsIG5ldyBNYXAoW1snYjY0JywgdHJ1ZV1dKSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNyaXQsIHRoaXMuX3Byb3RlY3RlZEhlYWRlciwgam9zZUhlYWRlcik7XG4gICAgICAgIGxldCBiNjQgPSB0cnVlO1xuICAgICAgICBpZiAoZXh0ZW5zaW9ucy5oYXMoJ2I2NCcpKSB7XG4gICAgICAgICAgICBiNjQgPSB0aGlzLl9wcm90ZWN0ZWRIZWFkZXIuYjY0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiNjQgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdUaGUgXCJiNjRcIiAoYmFzZTY0dXJsLWVuY29kZSBwYXlsb2FkKSBIZWFkZXIgUGFyYW1ldGVyIG11c3QgYmUgYSBib29sZWFuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBhbGcgfSA9IGpvc2VIZWFkZXI7XG4gICAgICAgIGlmICh0eXBlb2YgYWxnICE9PSAnc3RyaW5nJyB8fCAhYWxnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnSldTIFwiYWxnXCIgKEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciBtaXNzaW5nIG9yIGludmFsaWQnKTtcbiAgICAgICAgfVxuICAgICAgICAoMCwgY2hlY2tfa2V5X3R5cGVfanNfMS5kZWZhdWx0KShhbGcsIGtleSwgJ3NpZ24nKTtcbiAgICAgICAgbGV0IHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgICAgICBpZiAoYjY0KSB7XG4gICAgICAgICAgICBwYXlsb2FkID0gYnVmZmVyX3V0aWxzX2pzXzEuZW5jb2Rlci5lbmNvZGUoKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkocGF5bG9hZCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm90ZWN0ZWRIZWFkZXI7XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHByb3RlY3RlZEhlYWRlciA9IGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKCgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKEpTT04uc3RyaW5naWZ5KHRoaXMuX3Byb3RlY3RlZEhlYWRlcikpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb3RlY3RlZEhlYWRlciA9IGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKCcnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gKDAsIGJ1ZmZlcl91dGlsc19qc18xLmNvbmNhdCkocHJvdGVjdGVkSGVhZGVyLCBidWZmZXJfdXRpbHNfanNfMS5lbmNvZGVyLmVuY29kZSgnLicpLCBwYXlsb2FkKTtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgKDAsIHNpZ25fanNfMS5kZWZhdWx0KShhbGcsIGtleSwgZGF0YSk7XG4gICAgICAgIGNvbnN0IGp3cyA9IHtcbiAgICAgICAgICAgIHNpZ25hdHVyZTogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoc2lnbmF0dXJlKSxcbiAgICAgICAgICAgIHBheWxvYWQ6ICcnLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoYjY0KSB7XG4gICAgICAgICAgICBqd3MucGF5bG9hZCA9IGJ1ZmZlcl91dGlsc19qc18xLmRlY29kZXIuZGVjb2RlKHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl91bnByb3RlY3RlZEhlYWRlcikge1xuICAgICAgICAgICAgandzLmhlYWRlciA9IHRoaXMuX3VucHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIGp3cy5wcm90ZWN0ZWQgPSBidWZmZXJfdXRpbHNfanNfMS5kZWNvZGVyLmRlY29kZShwcm90ZWN0ZWRIZWFkZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqd3M7XG4gICAgfVxufVxuZXhwb3J0cy5GbGF0dGVuZWRTaWduID0gRmxhdHRlbmVkU2lnbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5mbGF0dGVuZWRWZXJpZnkgPSB2b2lkIDA7XG5jb25zdCBiYXNlNjR1cmxfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9ydW50aW1lL2Jhc2U2NHVybC5qc1wiKTtcbmNvbnN0IHZlcmlmeV9qc18xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvdmVyaWZ5LmpzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBidWZmZXJfdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvYnVmZmVyX3V0aWxzLmpzXCIpO1xuY29uc3QgaXNfZGlzam9pbnRfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvaXNfZGlzam9pbnQuanNcIik7XG5jb25zdCBpc19vYmplY3RfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvaXNfb2JqZWN0LmpzXCIpO1xuY29uc3QgY2hlY2tfa2V5X3R5cGVfanNfMSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvY2hlY2tfa2V5X3R5cGUuanNcIik7XG5jb25zdCB2YWxpZGF0ZV9jcml0X2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL3ZhbGlkYXRlX2NyaXQuanNcIik7XG5jb25zdCB2YWxpZGF0ZV9hbGdvcml0aG1zX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL3ZhbGlkYXRlX2FsZ29yaXRobXMuanNcIik7XG5hc3luYyBmdW5jdGlvbiBmbGF0dGVuZWRWZXJpZnkoandzLCBrZXksIG9wdGlvbnMpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCEoMCwgaXNfb2JqZWN0X2pzXzEuZGVmYXVsdCkoandzKSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnRmxhdHRlbmVkIEpXUyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBpZiAoandzLnByb3RlY3RlZCA9PT0gdW5kZWZpbmVkICYmIGp3cy5oZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnRmxhdHRlbmVkIEpXUyBtdXN0IGhhdmUgZWl0aGVyIG9mIHRoZSBcInByb3RlY3RlZFwiIG9yIFwiaGVhZGVyXCIgbWVtYmVycycpO1xuICAgIH1cbiAgICBpZiAoandzLnByb3RlY3RlZCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBqd3MucHJvdGVjdGVkICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnSldTIFByb3RlY3RlZCBIZWFkZXIgaW5jb3JyZWN0IHR5cGUnKTtcbiAgICB9XG4gICAgaWYgKGp3cy5wYXlsb2FkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXU0ludmFsaWQoJ0pXUyBQYXlsb2FkIG1pc3NpbmcnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBqd3Muc2lnbmF0dXJlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnSldTIFNpZ25hdHVyZSBtaXNzaW5nIG9yIGluY29ycmVjdCB0eXBlJyk7XG4gICAgfVxuICAgIGlmIChqd3MuaGVhZGVyICE9PSB1bmRlZmluZWQgJiYgISgwLCBpc19vYmplY3RfanNfMS5kZWZhdWx0KShqd3MuaGVhZGVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnSldTIFVucHJvdGVjdGVkIEhlYWRlciBpbmNvcnJlY3QgdHlwZScpO1xuICAgIH1cbiAgICBsZXQgcGFyc2VkUHJvdCA9IHt9O1xuICAgIGlmIChqd3MucHJvdGVjdGVkKSB7XG4gICAgICAgIGNvbnN0IHByb3RlY3RlZEhlYWRlciA9ICgwLCBiYXNlNjR1cmxfanNfMS5kZWNvZGUpKGp3cy5wcm90ZWN0ZWQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFyc2VkUHJvdCA9IEpTT04ucGFyc2UoYnVmZmVyX3V0aWxzX2pzXzEuZGVjb2Rlci5kZWNvZGUocHJvdGVjdGVkSGVhZGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXU0ludmFsaWQoJ0pXUyBQcm90ZWN0ZWQgSGVhZGVyIGlzIGludmFsaWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoISgwLCBpc19kaXNqb2ludF9qc18xLmRlZmF1bHQpKHBhcnNlZFByb3QsIGp3cy5oZWFkZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdKV1MgUHJvdGVjdGVkIGFuZCBKV1MgVW5wcm90ZWN0ZWQgSGVhZGVyIFBhcmFtZXRlciBuYW1lcyBtdXN0IGJlIGRpc2pvaW50Jyk7XG4gICAgfVxuICAgIGNvbnN0IGpvc2VIZWFkZXIgPSB7XG4gICAgICAgIC4uLnBhcnNlZFByb3QsXG4gICAgICAgIC4uLmp3cy5oZWFkZXIsXG4gICAgfTtcbiAgICBjb25zdCBleHRlbnNpb25zID0gKDAsIHZhbGlkYXRlX2NyaXRfanNfMS5kZWZhdWx0KShlcnJvcnNfanNfMS5KV1NJbnZhbGlkLCBuZXcgTWFwKFtbJ2I2NCcsIHRydWVdXSksIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcml0LCBwYXJzZWRQcm90LCBqb3NlSGVhZGVyKTtcbiAgICBsZXQgYjY0ID0gdHJ1ZTtcbiAgICBpZiAoZXh0ZW5zaW9ucy5oYXMoJ2I2NCcpKSB7XG4gICAgICAgIGI2NCA9IHBhcnNlZFByb3QuYjY0O1xuICAgICAgICBpZiAodHlwZW9mIGI2NCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnVGhlIFwiYjY0XCIgKGJhc2U2NHVybC1lbmNvZGUgcGF5bG9hZCkgSGVhZGVyIFBhcmFtZXRlciBtdXN0IGJlIGEgYm9vbGVhbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHsgYWxnIH0gPSBqb3NlSGVhZGVyO1xuICAgIGlmICh0eXBlb2YgYWxnICE9PSAnc3RyaW5nJyB8fCAhYWxnKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdKV1MgXCJhbGdcIiAoQWxnb3JpdGhtKSBIZWFkZXIgUGFyYW1ldGVyIG1pc3Npbmcgb3IgaW52YWxpZCcpO1xuICAgIH1cbiAgICBjb25zdCBhbGdvcml0aG1zID0gb3B0aW9ucyAmJiAoMCwgdmFsaWRhdGVfYWxnb3JpdGhtc19qc18xLmRlZmF1bHQpKCdhbGdvcml0aG1zJywgb3B0aW9ucy5hbGdvcml0aG1zKTtcbiAgICBpZiAoYWxnb3JpdGhtcyAmJiAhYWxnb3JpdGhtcy5oYXMoYWxnKSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRUFsZ05vdEFsbG93ZWQoJ1wiYWxnXCIgKEFsZ29yaXRobSkgSGVhZGVyIFBhcmFtZXRlciBub3QgYWxsb3dlZCcpO1xuICAgIH1cbiAgICBpZiAoYjY0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgandzLnBheWxvYWQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnSldTIFBheWxvYWQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBqd3MucGF5bG9hZCAhPT0gJ3N0cmluZycgJiYgIShqd3MucGF5bG9hZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdKV1MgUGF5bG9hZCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIFVpbnQ4QXJyYXkgaW5zdGFuY2UnKTtcbiAgICB9XG4gICAgbGV0IHJlc29sdmVkS2V5ID0gZmFsc2U7XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAga2V5ID0gYXdhaXQga2V5KHBhcnNlZFByb3QsIGp3cyk7XG4gICAgICAgIHJlc29sdmVkS2V5ID0gdHJ1ZTtcbiAgICB9XG4gICAgKDAsIGNoZWNrX2tleV90eXBlX2pzXzEuZGVmYXVsdCkoYWxnLCBrZXksICd2ZXJpZnknKTtcbiAgICBjb25zdCBkYXRhID0gKDAsIGJ1ZmZlcl91dGlsc19qc18xLmNvbmNhdCkoYnVmZmVyX3V0aWxzX2pzXzEuZW5jb2Rlci5lbmNvZGUoKF9hID0gandzLnByb3RlY3RlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJycpLCBidWZmZXJfdXRpbHNfanNfMS5lbmNvZGVyLmVuY29kZSgnLicpLCB0eXBlb2YgandzLnBheWxvYWQgPT09ICdzdHJpbmcnID8gYnVmZmVyX3V0aWxzX2pzXzEuZW5jb2Rlci5lbmNvZGUoandzLnBheWxvYWQpIDogandzLnBheWxvYWQpO1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9ICgwLCBiYXNlNjR1cmxfanNfMS5kZWNvZGUpKGp3cy5zaWduYXR1cmUpO1xuICAgIGNvbnN0IHZlcmlmaWVkID0gYXdhaXQgKDAsIHZlcmlmeV9qc18xLmRlZmF1bHQpKGFsZywga2V5LCBzaWduYXR1cmUsIGRhdGEpO1xuICAgIGlmICghdmVyaWZpZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCgpO1xuICAgIH1cbiAgICBsZXQgcGF5bG9hZDtcbiAgICBpZiAoYjY0KSB7XG4gICAgICAgIHBheWxvYWQgPSAoMCwgYmFzZTY0dXJsX2pzXzEuZGVjb2RlKShqd3MucGF5bG9hZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBqd3MucGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF5bG9hZCA9IGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKGp3cy5wYXlsb2FkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHBheWxvYWQgPSBqd3MucGF5bG9hZDtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0geyBwYXlsb2FkIH07XG4gICAgaWYgKGp3cy5wcm90ZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQucHJvdGVjdGVkSGVhZGVyID0gcGFyc2VkUHJvdDtcbiAgICB9XG4gICAgaWYgKGp3cy5oZWFkZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXN1bHQudW5wcm90ZWN0ZWRIZWFkZXIgPSBqd3MuaGVhZGVyO1xuICAgIH1cbiAgICBpZiAocmVzb2x2ZWRLZXkpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdWx0LCBrZXkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuZmxhdHRlbmVkVmVyaWZ5ID0gZmxhdHRlbmVkVmVyaWZ5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdlbmVyYWxTaWduID0gdm9pZCAwO1xuY29uc3Qgc2lnbl9qc18xID0gcmVxdWlyZShcIi4uL2ZsYXR0ZW5lZC9zaWduLmpzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jbGFzcyBJbmRpdmlkdWFsU2lnbmF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihzaWcsIGtleSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnBhcmVudCA9IHNpZztcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRQcm90ZWN0ZWRIZWFkZXIgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3RlY3RlZEhlYWRlciA9IHByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFVucHJvdGVjdGVkSGVhZGVyKHVucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLnVucHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRVbnByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5wcm90ZWN0ZWRIZWFkZXIgPSB1bnByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFNpZ25hdHVyZSguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5hZGRTaWduYXR1cmUoLi4uYXJncyk7XG4gICAgfVxuICAgIHNpZ24oLi4uYXJncykge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuc2lnbiguLi5hcmdzKTtcbiAgICB9XG4gICAgZG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICAgIH1cbn1cbmNsYXNzIEdlbmVyYWxTaWduIHtcbiAgICBjb25zdHJ1Y3RvcihwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMuX3NpZ25hdHVyZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgfVxuICAgIGFkZFNpZ25hdHVyZShrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gbmV3IEluZGl2aWR1YWxTaWduYXR1cmUodGhpcywga2V5LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fc2lnbmF0dXJlcy5wdXNoKHNpZ25hdHVyZSk7XG4gICAgICAgIHJldHVybiBzaWduYXR1cmU7XG4gICAgfVxuICAgIGFzeW5jIHNpZ24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fc2lnbmF0dXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdhdCBsZWFzdCBvbmUgc2lnbmF0dXJlIG11c3QgYmUgYWRkZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqd3MgPSB7XG4gICAgICAgICAgICBzaWduYXR1cmVzOiBbXSxcbiAgICAgICAgICAgIHBheWxvYWQ6ICcnLFxuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NpZ25hdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IHRoaXMuX3NpZ25hdHVyZXNbaV07XG4gICAgICAgICAgICBjb25zdCBmbGF0dGVuZWQgPSBuZXcgc2lnbl9qc18xLkZsYXR0ZW5lZFNpZ24odGhpcy5fcGF5bG9hZCk7XG4gICAgICAgICAgICBmbGF0dGVuZWQuc2V0UHJvdGVjdGVkSGVhZGVyKHNpZ25hdHVyZS5wcm90ZWN0ZWRIZWFkZXIpO1xuICAgICAgICAgICAgZmxhdHRlbmVkLnNldFVucHJvdGVjdGVkSGVhZGVyKHNpZ25hdHVyZS51bnByb3RlY3RlZEhlYWRlcik7XG4gICAgICAgICAgICBjb25zdCB7IHBheWxvYWQsIC4uLnJlc3QgfSA9IGF3YWl0IGZsYXR0ZW5lZC5zaWduKHNpZ25hdHVyZS5rZXksIHNpZ25hdHVyZS5vcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgandzLnBheWxvYWQgPSBwYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoandzLnBheWxvYWQgIT09IHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnaW5jb25zaXN0ZW50IHVzZSBvZiBKV1MgVW5lbmNvZGVkIFBheWxvYWQgT3B0aW9uIChSRkM3Nzk3KScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgandzLnNpZ25hdHVyZXMucHVzaChyZXN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gandzO1xuICAgIH1cbn1cbmV4cG9ydHMuR2VuZXJhbFNpZ24gPSBHZW5lcmFsU2lnbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmFsVmVyaWZ5ID0gdm9pZCAwO1xuY29uc3QgdmVyaWZ5X2pzXzEgPSByZXF1aXJlKFwiLi4vZmxhdHRlbmVkL3ZlcmlmeS5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgaXNfb2JqZWN0X2pzXzEgPSByZXF1aXJlKFwiLi4vLi4vbGliL2lzX29iamVjdC5qc1wiKTtcbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYWxWZXJpZnkoandzLCBrZXksIG9wdGlvbnMpIHtcbiAgICBpZiAoISgwLCBpc19vYmplY3RfanNfMS5kZWZhdWx0KShqd3MpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NJbnZhbGlkKCdHZW5lcmFsIEpXUyBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoandzLnNpZ25hdHVyZXMpIHx8ICFqd3Muc2lnbmF0dXJlcy5ldmVyeShpc19vYmplY3RfanNfMS5kZWZhdWx0KSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldTSW52YWxpZCgnSldTIFNpZ25hdHVyZXMgbWlzc2luZyBvciBpbmNvcnJlY3QgdHlwZScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHNpZ25hdHVyZSBvZiBqd3Muc2lnbmF0dXJlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0ICgwLCB2ZXJpZnlfanNfMS5mbGF0dGVuZWRWZXJpZnkpKHtcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHNpZ25hdHVyZS5oZWFkZXIsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogandzLnBheWxvYWQsXG4gICAgICAgICAgICAgICAgcHJvdGVjdGVkOiBzaWduYXR1cmUucHJvdGVjdGVkLFxuICAgICAgICAgICAgICAgIHNpZ25hdHVyZTogc2lnbmF0dXJlLnNpZ25hdHVyZSxcbiAgICAgICAgICAgIH0sIGtleSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1NTaWduYXR1cmVWZXJpZmljYXRpb25GYWlsZWQoKTtcbn1cbmV4cG9ydHMuZ2VuZXJhbFZlcmlmeSA9IGdlbmVyYWxWZXJpZnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuand0RGVjcnlwdCA9IHZvaWQgMDtcbmNvbnN0IGRlY3J5cHRfanNfMSA9IHJlcXVpcmUoXCIuLi9qd2UvY29tcGFjdC9kZWNyeXB0LmpzXCIpO1xuY29uc3Qgand0X2NsYWltc19zZXRfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvand0X2NsYWltc19zZXQuanNcIik7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmFzeW5jIGZ1bmN0aW9uIGp3dERlY3J5cHQoand0LCBrZXksIG9wdGlvbnMpIHtcbiAgICBjb25zdCBkZWNyeXB0ZWQgPSBhd2FpdCAoMCwgZGVjcnlwdF9qc18xLmNvbXBhY3REZWNyeXB0KShqd3QsIGtleSwgb3B0aW9ucyk7XG4gICAgY29uc3QgcGF5bG9hZCA9ICgwLCBqd3RfY2xhaW1zX3NldF9qc18xLmRlZmF1bHQpKGRlY3J5cHRlZC5wcm90ZWN0ZWRIZWFkZXIsIGRlY3J5cHRlZC5wbGFpbnRleHQsIG9wdGlvbnMpO1xuICAgIGNvbnN0IHsgcHJvdGVjdGVkSGVhZGVyIH0gPSBkZWNyeXB0ZWQ7XG4gICAgaWYgKHByb3RlY3RlZEhlYWRlci5pc3MgIT09IHVuZGVmaW5lZCAmJiBwcm90ZWN0ZWRIZWFkZXIuaXNzICE9PSBwYXlsb2FkLmlzcykge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCdyZXBsaWNhdGVkIFwiaXNzXCIgY2xhaW0gaGVhZGVyIHBhcmFtZXRlciBtaXNtYXRjaCcsICdpc3MnLCAnbWlzbWF0Y2gnKTtcbiAgICB9XG4gICAgaWYgKHByb3RlY3RlZEhlYWRlci5zdWIgIT09IHVuZGVmaW5lZCAmJiBwcm90ZWN0ZWRIZWFkZXIuc3ViICE9PSBwYXlsb2FkLnN1Yikge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCdyZXBsaWNhdGVkIFwic3ViXCIgY2xhaW0gaGVhZGVyIHBhcmFtZXRlciBtaXNtYXRjaCcsICdzdWInLCAnbWlzbWF0Y2gnKTtcbiAgICB9XG4gICAgaWYgKHByb3RlY3RlZEhlYWRlci5hdWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBKU09OLnN0cmluZ2lmeShwcm90ZWN0ZWRIZWFkZXIuYXVkKSAhPT0gSlNPTi5zdHJpbmdpZnkocGF5bG9hZC5hdWQpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJ3JlcGxpY2F0ZWQgXCJhdWRcIiBjbGFpbSBoZWFkZXIgcGFyYW1ldGVyIG1pc21hdGNoJywgJ2F1ZCcsICdtaXNtYXRjaCcpO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB7IHBheWxvYWQsIHByb3RlY3RlZEhlYWRlciB9O1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnJlc3VsdCwga2V5OiBkZWNyeXB0ZWQua2V5IH07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmp3dERlY3J5cHQgPSBqd3REZWNyeXB0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVuY3J5cHRKV1QgPSB2b2lkIDA7XG5jb25zdCBlbmNyeXB0X2pzXzEgPSByZXF1aXJlKFwiLi4vandlL2NvbXBhY3QvZW5jcnlwdC5qc1wiKTtcbmNvbnN0IGJ1ZmZlcl91dGlsc19qc18xID0gcmVxdWlyZShcIi4uL2xpYi9idWZmZXJfdXRpbHMuanNcIik7XG5jb25zdCBwcm9kdWNlX2pzXzEgPSByZXF1aXJlKFwiLi9wcm9kdWNlLmpzXCIpO1xuY2xhc3MgRW5jcnlwdEpXVCBleHRlbmRzIHByb2R1Y2VfanNfMS5Qcm9kdWNlSldUIHtcbiAgICBzZXRQcm90ZWN0ZWRIZWFkZXIocHJvdGVjdGVkSGVhZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9wcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3NldFByb3RlY3RlZEhlYWRlciBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Byb3RlY3RlZEhlYWRlciA9IHByb3RlY3RlZEhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEtleU1hbmFnZW1lbnRQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2tleU1hbmFnZW1lbnRQYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRLZXlNYW5hZ2VtZW50UGFyYW1ldGVycyBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2tleU1hbmFnZW1lbnRQYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldENvbnRlbnRFbmNyeXB0aW9uS2V5KGNlaykge1xuICAgICAgICBpZiAodGhpcy5fY2VrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZXRDb250ZW50RW5jcnlwdGlvbktleSBjYW4gb25seSBiZSBjYWxsZWQgb25jZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NlayA9IGNlaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEluaXRpYWxpemF0aW9uVmVjdG9yKGl2KSB7XG4gICAgICAgIGlmICh0aGlzLl9pdikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2V0SW5pdGlhbGl6YXRpb25WZWN0b3IgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pdiA9IGl2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVwbGljYXRlSXNzdWVyQXNIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuX3JlcGxpY2F0ZUlzc3VlckFzSGVhZGVyID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlcGxpY2F0ZVN1YmplY3RBc0hlYWRlcigpIHtcbiAgICAgICAgdGhpcy5fcmVwbGljYXRlU3ViamVjdEFzSGVhZGVyID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlcGxpY2F0ZUF1ZGllbmNlQXNIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuX3JlcGxpY2F0ZUF1ZGllbmNlQXNIZWFkZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXN5bmMgZW5jcnlwdChrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZW5jID0gbmV3IGVuY3J5cHRfanNfMS5Db21wYWN0RW5jcnlwdChidWZmZXJfdXRpbHNfanNfMS5lbmNvZGVyLmVuY29kZShKU09OLnN0cmluZ2lmeSh0aGlzLl9wYXlsb2FkKSkpO1xuICAgICAgICBpZiAodGhpcy5fcmVwbGljYXRlSXNzdWVyQXNIZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3RlY3RlZEhlYWRlciA9IHsgLi4udGhpcy5fcHJvdGVjdGVkSGVhZGVyLCBpc3M6IHRoaXMuX3BheWxvYWQuaXNzIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlcGxpY2F0ZVN1YmplY3RBc0hlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0geyAuLi50aGlzLl9wcm90ZWN0ZWRIZWFkZXIsIHN1YjogdGhpcy5fcGF5bG9hZC5zdWIgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVwbGljYXRlQXVkaWVuY2VBc0hlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0geyAuLi50aGlzLl9wcm90ZWN0ZWRIZWFkZXIsIGF1ZDogdGhpcy5fcGF5bG9hZC5hdWQgfTtcbiAgICAgICAgfVxuICAgICAgICBlbmMuc2V0UHJvdGVjdGVkSGVhZGVyKHRoaXMuX3Byb3RlY3RlZEhlYWRlcik7XG4gICAgICAgIGlmICh0aGlzLl9pdikge1xuICAgICAgICAgICAgZW5jLnNldEluaXRpYWxpemF0aW9uVmVjdG9yKHRoaXMuX2l2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2VrKSB7XG4gICAgICAgICAgICBlbmMuc2V0Q29udGVudEVuY3J5cHRpb25LZXkodGhpcy5fY2VrKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fa2V5TWFuYWdlbWVudFBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIGVuYy5zZXRLZXlNYW5hZ2VtZW50UGFyYW1ldGVycyh0aGlzLl9rZXlNYW5hZ2VtZW50UGFyYW1ldGVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVuYy5lbmNyeXB0KGtleSwgb3B0aW9ucyk7XG4gICAgfVxufVxuZXhwb3J0cy5FbmNyeXB0SldUID0gRW5jcnlwdEpXVDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Qcm9kdWNlSldUID0gdm9pZCAwO1xuY29uc3QgZXBvY2hfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvZXBvY2guanNcIik7XG5jb25zdCBpc19vYmplY3RfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvaXNfb2JqZWN0LmpzXCIpO1xuY29uc3Qgc2Vjc19qc18xID0gcmVxdWlyZShcIi4uL2xpYi9zZWNzLmpzXCIpO1xuY2xhc3MgUHJvZHVjZUpXVCB7XG4gICAgY29uc3RydWN0b3IocGF5bG9hZCkge1xuICAgICAgICBpZiAoISgwLCBpc19vYmplY3RfanNfMS5kZWZhdWx0KShwYXlsb2FkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSldUIENsYWltcyBTZXQgTVVTVCBiZSBhbiBvYmplY3QnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXlsb2FkID0gcGF5bG9hZDtcbiAgICB9XG4gICAgc2V0SXNzdWVyKGlzc3Vlcikge1xuICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBpc3M6IGlzc3VlciB9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0U3ViamVjdChzdWJqZWN0KSB7XG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIHN1Yjogc3ViamVjdCB9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0QXVkaWVuY2UoYXVkaWVuY2UpIHtcbiAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgYXVkOiBhdWRpZW5jZSB9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SnRpKGp3dElkKSB7XG4gICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGp0aTogand0SWQgfTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE5vdEJlZm9yZShpbnB1dCkge1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgbmJmOiBpbnB1dCB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGF5bG9hZCA9IHsgLi4udGhpcy5fcGF5bG9hZCwgbmJmOiAoMCwgZXBvY2hfanNfMS5kZWZhdWx0KShuZXcgRGF0ZSgpKSArICgwLCBzZWNzX2pzXzEuZGVmYXVsdCkoaW5wdXQpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEV4cGlyYXRpb25UaW1lKGlucHV0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBleHA6IGlucHV0IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wYXlsb2FkID0geyAuLi50aGlzLl9wYXlsb2FkLCBleHA6ICgwLCBlcG9jaF9qc18xLmRlZmF1bHQpKG5ldyBEYXRlKCkpICsgKDAsIHNlY3NfanNfMS5kZWZhdWx0KShpbnB1dCkgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SXNzdWVkQXQoaW5wdXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGlhdDogKDAsIGVwb2NoX2pzXzEuZGVmYXVsdCkobmV3IERhdGUoKSkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BheWxvYWQgPSB7IC4uLnRoaXMuX3BheWxvYWQsIGlhdDogaW5wdXQgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLlByb2R1Y2VKV1QgPSBQcm9kdWNlSldUO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNpZ25KV1QgPSB2b2lkIDA7XG5jb25zdCBzaWduX2pzXzEgPSByZXF1aXJlKFwiLi4vandzL2NvbXBhY3Qvc2lnbi5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgYnVmZmVyX3V0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2J1ZmZlcl91dGlscy5qc1wiKTtcbmNvbnN0IHByb2R1Y2VfanNfMSA9IHJlcXVpcmUoXCIuL3Byb2R1Y2UuanNcIik7XG5jbGFzcyBTaWduSldUIGV4dGVuZHMgcHJvZHVjZV9qc18xLlByb2R1Y2VKV1Qge1xuICAgIHNldFByb3RlY3RlZEhlYWRlcihwcm90ZWN0ZWRIZWFkZXIpIHtcbiAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyID0gcHJvdGVjdGVkSGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXN5bmMgc2lnbihrZXksIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBzaWcgPSBuZXcgc2lnbl9qc18xLkNvbXBhY3RTaWduKGJ1ZmZlcl91dGlsc19qc18xLmVuY29kZXIuZW5jb2RlKEpTT04uc3RyaW5naWZ5KHRoaXMuX3BheWxvYWQpKSk7XG4gICAgICAgIHNpZy5zZXRQcm90ZWN0ZWRIZWFkZXIodGhpcy5fcHJvdGVjdGVkSGVhZGVyKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoKF9hID0gdGhpcy5fcHJvdGVjdGVkSGVhZGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY3JpdCkgJiZcbiAgICAgICAgICAgIHRoaXMuX3Byb3RlY3RlZEhlYWRlci5jcml0LmluY2x1ZGVzKCdiNjQnKSAmJlxuICAgICAgICAgICAgdGhpcy5fcHJvdGVjdGVkSGVhZGVyLmI2NCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1RJbnZhbGlkKCdKV1RzIE1VU1QgTk9UIHVzZSB1bmVuY29kZWQgcGF5bG9hZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaWcuc2lnbihrZXksIG9wdGlvbnMpO1xuICAgIH1cbn1cbmV4cG9ydHMuU2lnbkpXVCA9IFNpZ25KV1Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVW5zZWN1cmVkSldUID0gdm9pZCAwO1xuY29uc3QgYmFzZTY0dXJsID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzXCIpO1xuY29uc3QgYnVmZmVyX3V0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2J1ZmZlcl91dGlscy5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3Qgand0X2NsYWltc19zZXRfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvand0X2NsYWltc19zZXQuanNcIik7XG5jb25zdCBwcm9kdWNlX2pzXzEgPSByZXF1aXJlKFwiLi9wcm9kdWNlLmpzXCIpO1xuY2xhc3MgVW5zZWN1cmVkSldUIGV4dGVuZHMgcHJvZHVjZV9qc18xLlByb2R1Y2VKV1Qge1xuICAgIGVuY29kZSgpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gYmFzZTY0dXJsLmVuY29kZShKU09OLnN0cmluZ2lmeSh7IGFsZzogJ25vbmUnIH0pKTtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IGJhc2U2NHVybC5lbmNvZGUoSlNPTi5zdHJpbmdpZnkodGhpcy5fcGF5bG9hZCkpO1xuICAgICAgICByZXR1cm4gYCR7aGVhZGVyfS4ke3BheWxvYWR9LmA7XG4gICAgfVxuICAgIHN0YXRpYyBkZWNvZGUoand0LCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygand0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXVEludmFsaWQoJ1Vuc2VjdXJlZCBKV1QgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgMDogZW5jb2RlZEhlYWRlciwgMTogZW5jb2RlZFBheWxvYWQsIDI6IHNpZ25hdHVyZSwgbGVuZ3RoIH0gPSBqd3Quc3BsaXQoJy4nKTtcbiAgICAgICAgaWYgKGxlbmd0aCAhPT0gMyB8fCBzaWduYXR1cmUgIT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUSW52YWxpZCgnSW52YWxpZCBVbnNlY3VyZWQgSldUJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhlYWRlcjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGhlYWRlciA9IEpTT04ucGFyc2UoYnVmZmVyX3V0aWxzX2pzXzEuZGVjb2Rlci5kZWNvZGUoYmFzZTY0dXJsLmRlY29kZShlbmNvZGVkSGVhZGVyKSkpO1xuICAgICAgICAgICAgaWYgKGhlYWRlci5hbGcgIT09ICdub25lJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUSW52YWxpZCgnSW52YWxpZCBVbnNlY3VyZWQgSldUJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF5bG9hZCA9ICgwLCBqd3RfY2xhaW1zX3NldF9qc18xLmRlZmF1bHQpKGhlYWRlciwgYmFzZTY0dXJsLmRlY29kZShlbmNvZGVkUGF5bG9hZCksIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4geyBwYXlsb2FkLCBoZWFkZXIgfTtcbiAgICB9XG59XG5leHBvcnRzLlVuc2VjdXJlZEpXVCA9IFVuc2VjdXJlZEpXVDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5qd3RWZXJpZnkgPSB2b2lkIDA7XG5jb25zdCB2ZXJpZnlfanNfMSA9IHJlcXVpcmUoXCIuLi9qd3MvY29tcGFjdC92ZXJpZnkuanNcIik7XG5jb25zdCBqd3RfY2xhaW1zX3NldF9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9qd3RfY2xhaW1zX3NldC5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuYXN5bmMgZnVuY3Rpb24gand0VmVyaWZ5KGp3dCwga2V5LCBvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHZlcmlmaWVkID0gYXdhaXQgKDAsIHZlcmlmeV9qc18xLmNvbXBhY3RWZXJpZnkpKGp3dCwga2V5LCBvcHRpb25zKTtcbiAgICBpZiAoKChfYSA9IHZlcmlmaWVkLnByb3RlY3RlZEhlYWRlci5jcml0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoJ2I2NCcpKSAmJiB2ZXJpZmllZC5wcm90ZWN0ZWRIZWFkZXIuYjY0ID09PSBmYWxzZSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUSW52YWxpZCgnSldUcyBNVVNUIE5PVCB1c2UgdW5lbmNvZGVkIHBheWxvYWQnKTtcbiAgICB9XG4gICAgY29uc3QgcGF5bG9hZCA9ICgwLCBqd3RfY2xhaW1zX3NldF9qc18xLmRlZmF1bHQpKHZlcmlmaWVkLnByb3RlY3RlZEhlYWRlciwgdmVyaWZpZWQucGF5bG9hZCwgb3B0aW9ucyk7XG4gICAgY29uc3QgcmVzdWx0ID0geyBwYXlsb2FkLCBwcm90ZWN0ZWRIZWFkZXI6IHZlcmlmaWVkLnByb3RlY3RlZEhlYWRlciB9O1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnJlc3VsdCwga2V5OiB2ZXJpZmllZC5rZXkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuand0VmVyaWZ5ID0gand0VmVyaWZ5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4cG9ydEpXSyA9IGV4cG9ydHMuZXhwb3J0UEtDUzggPSBleHBvcnRzLmV4cG9ydFNQS0kgPSB2b2lkIDA7XG5jb25zdCBhc24xX2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9hc24xLmpzXCIpO1xuY29uc3QgYXNuMV9qc18yID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvYXNuMS5qc1wiKTtcbmNvbnN0IGtleV90b19qd2tfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2tleV90b19qd2suanNcIik7XG5hc3luYyBmdW5jdGlvbiBleHBvcnRTUEtJKGtleSkge1xuICAgIHJldHVybiAoMCwgYXNuMV9qc18xLnRvU1BLSSkoa2V5KTtcbn1cbmV4cG9ydHMuZXhwb3J0U1BLSSA9IGV4cG9ydFNQS0k7XG5hc3luYyBmdW5jdGlvbiBleHBvcnRQS0NTOChrZXkpIHtcbiAgICByZXR1cm4gKDAsIGFzbjFfanNfMi50b1BLQ1M4KShrZXkpO1xufVxuZXhwb3J0cy5leHBvcnRQS0NTOCA9IGV4cG9ydFBLQ1M4O1xuYXN5bmMgZnVuY3Rpb24gZXhwb3J0SldLKGtleSkge1xuICAgIHJldHVybiAoMCwga2V5X3RvX2p3a19qc18xLmRlZmF1bHQpKGtleSk7XG59XG5leHBvcnRzLmV4cG9ydEpXSyA9IGV4cG9ydEpXSztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmF0ZUtleVBhaXIgPSB2b2lkIDA7XG5jb25zdCBnZW5lcmF0ZV9qc18xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvZ2VuZXJhdGUuanNcIik7XG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoYWxnLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuICgwLCBnZW5lcmF0ZV9qc18xLmdlbmVyYXRlS2V5UGFpcikoYWxnLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVLZXlQYWlyID0gZ2VuZXJhdGVLZXlQYWlyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlU2VjcmV0ID0gdm9pZCAwO1xuY29uc3QgZ2VuZXJhdGVfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2dlbmVyYXRlLmpzXCIpO1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVTZWNyZXQoYWxnLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuICgwLCBnZW5lcmF0ZV9qc18xLmdlbmVyYXRlU2VjcmV0KShhbGcsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5nZW5lcmF0ZVNlY3JldCA9IGdlbmVyYXRlU2VjcmV0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmltcG9ydEpXSyA9IGV4cG9ydHMuaW1wb3J0UEtDUzggPSBleHBvcnRzLmltcG9ydFg1MDkgPSBleHBvcnRzLmltcG9ydFNQS0kgPSB2b2lkIDA7XG5jb25zdCBiYXNlNjR1cmxfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2Jhc2U2NHVybC5qc1wiKTtcbmNvbnN0IGFzbjFfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2FzbjEuanNcIik7XG5jb25zdCBhc24xX2pzXzIgPSByZXF1aXJlKFwiLi4vcnVudGltZS9hc24xLmpzXCIpO1xuY29uc3QgandrX3RvX2tleV9qc18xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvandrX3RvX2tleS5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgZm9ybWF0X3BlbV9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9mb3JtYXRfcGVtLmpzXCIpO1xuY29uc3QgaXNfb2JqZWN0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2lzX29iamVjdC5qc1wiKTtcbmZ1bmN0aW9uIGdldEVsZW1lbnQoc2VxKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBuZXh0ID0gMDtcbiAgICB3aGlsZSAobmV4dCA8IHNlcS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IG5leHRQYXJ0ID0gcGFyc2VFbGVtZW50KHNlcS5zdWJhcnJheShuZXh0KSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKG5leHRQYXJ0KTtcbiAgICAgICAgbmV4dCArPSBuZXh0UGFydC5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcGFyc2VFbGVtZW50KGJ5dGVzKSB7XG4gICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICBsZXQgdGFnID0gYnl0ZXNbMF0gJiAweDFmO1xuICAgIHBvc2l0aW9uKys7XG4gICAgaWYgKHRhZyA9PT0gMHgxZikge1xuICAgICAgICB0YWcgPSAwO1xuICAgICAgICB3aGlsZSAoYnl0ZXNbcG9zaXRpb25dID49IDB4ODApIHtcbiAgICAgICAgICAgIHRhZyA9IHRhZyAqIDEyOCArIGJ5dGVzW3Bvc2l0aW9uXSAtIDB4ODA7XG4gICAgICAgICAgICBwb3NpdGlvbisrO1xuICAgICAgICB9XG4gICAgICAgIHRhZyA9IHRhZyAqIDEyOCArIGJ5dGVzW3Bvc2l0aW9uXSAtIDB4ODA7XG4gICAgICAgIHBvc2l0aW9uKys7XG4gICAgfVxuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGlmIChieXRlc1twb3NpdGlvbl0gPCAweDgwKSB7XG4gICAgICAgIGxlbmd0aCA9IGJ5dGVzW3Bvc2l0aW9uXTtcbiAgICAgICAgcG9zaXRpb24rKztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxldCBudW1iZXJPZkRpZ2l0cyA9IGJ5dGVzW3Bvc2l0aW9uXSAmIDB4N2Y7XG4gICAgICAgIHBvc2l0aW9uKys7XG4gICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZEaWdpdHM7IGkrKykge1xuICAgICAgICAgICAgbGVuZ3RoID0gbGVuZ3RoICogMjU2ICsgYnl0ZXNbcG9zaXRpb25dO1xuICAgICAgICAgICAgcG9zaXRpb24rKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGVuZ3RoID09PSAweDgwKSB7XG4gICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChieXRlc1twb3NpdGlvbiArIGxlbmd0aF0gIT09IDAgfHwgYnl0ZXNbcG9zaXRpb24gKyBsZW5ndGggKyAxXSAhPT0gMCkge1xuICAgICAgICAgICAgbGVuZ3RoKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnl0ZUxlbmd0aCA9IHBvc2l0aW9uICsgbGVuZ3RoICsgMjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBjb250ZW50czogYnl0ZXMuc3ViYXJyYXkocG9zaXRpb24sIHBvc2l0aW9uICsgbGVuZ3RoKSxcbiAgICAgICAgICAgIHJhdzogYnl0ZXMuc3ViYXJyYXkoMCwgYnl0ZUxlbmd0aCksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBwb3NpdGlvbiArIGxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBieXRlTGVuZ3RoLFxuICAgICAgICBjb250ZW50czogYnl0ZXMuc3ViYXJyYXkocG9zaXRpb24sIGJ5dGVMZW5ndGgpLFxuICAgICAgICByYXc6IGJ5dGVzLnN1YmFycmF5KDAsIGJ5dGVMZW5ndGgpLFxuICAgIH07XG59XG5mdW5jdGlvbiBzcGtpRnJvbVg1MDkoYnVmKSB7XG4gICAgY29uc3QgdGJzQ2VydGlmaWNhdGUgPSBnZXRFbGVtZW50KGdldEVsZW1lbnQocGFyc2VFbGVtZW50KGJ1ZikuY29udGVudHMpWzBdLmNvbnRlbnRzKTtcbiAgICByZXR1cm4gKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZUJhc2U2NCkodGJzQ2VydGlmaWNhdGVbdGJzQ2VydGlmaWNhdGVbMF0ucmF3WzBdID09PSAweGEwID8gNiA6IDVdLnJhdyk7XG59XG5mdW5jdGlvbiBnZXRTUEtJKHg1MDkpIHtcbiAgICBjb25zdCBwZW0gPSB4NTA5LnJlcGxhY2UoLyg/Oi0tLS0tKD86QkVHSU58RU5EKSBDRVJUSUZJQ0FURS0tLS0tfFxccykvZywgJycpO1xuICAgIGNvbnN0IHJhdyA9ICgwLCBiYXNlNjR1cmxfanNfMS5kZWNvZGVCYXNlNjQpKHBlbSk7XG4gICAgcmV0dXJuICgwLCBmb3JtYXRfcGVtX2pzXzEuZGVmYXVsdCkoc3BraUZyb21YNTA5KHJhdyksICdQVUJMSUMgS0VZJyk7XG59XG5hc3luYyBmdW5jdGlvbiBpbXBvcnRTUEtJKHNwa2ksIGFsZywgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygc3BraSAhPT0gJ3N0cmluZycgfHwgc3BraS5pbmRleE9mKCctLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLScpICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic3BraVwiIG11c3QgYmUgU1BLSSBmb3JtYXR0ZWQgc3RyaW5nJyk7XG4gICAgfVxuICAgIHJldHVybiAoMCwgYXNuMV9qc18xLmZyb21TUEtJKShzcGtpLCBhbGcsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5pbXBvcnRTUEtJID0gaW1wb3J0U1BLSTtcbmFzeW5jIGZ1bmN0aW9uIGltcG9ydFg1MDkoeDUwOSwgYWxnLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB4NTA5ICE9PSAnc3RyaW5nJyB8fCB4NTA5LmluZGV4T2YoJy0tLS0tQkVHSU4gQ0VSVElGSUNBVEUtLS0tLScpICE9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wieDUwOVwiIG11c3QgYmUgWC41MDkgZm9ybWF0dGVkIHN0cmluZycpO1xuICAgIH1cbiAgICBjb25zdCBzcGtpID0gZ2V0U1BLSSh4NTA5KTtcbiAgICByZXR1cm4gKDAsIGFzbjFfanNfMS5mcm9tU1BLSSkoc3BraSwgYWxnLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMuaW1wb3J0WDUwOSA9IGltcG9ydFg1MDk7XG5hc3luYyBmdW5jdGlvbiBpbXBvcnRQS0NTOChwa2NzOCwgYWxnLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBwa2NzOCAhPT0gJ3N0cmluZycgfHwgcGtjczguaW5kZXhPZignLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tJykgIT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJwa2NzOFwiIG11c3QgYmUgUENLUzggZm9ybWF0dGVkIHN0cmluZycpO1xuICAgIH1cbiAgICByZXR1cm4gKDAsIGFzbjFfanNfMi5mcm9tUEtDUzgpKHBrY3M4LCBhbGcsIG9wdGlvbnMpO1xufVxuZXhwb3J0cy5pbXBvcnRQS0NTOCA9IGltcG9ydFBLQ1M4O1xuYXN5bmMgZnVuY3Rpb24gaW1wb3J0SldLKGp3aywgYWxnLCBvY3RBc0tleU9iamVjdCkge1xuICAgIGlmICghKDAsIGlzX29iamVjdF9qc18xLmRlZmF1bHQpKGp3aykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSldLIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgfVxuICAgIGFsZyB8fCAoYWxnID0gandrLmFsZyk7XG4gICAgaWYgKHR5cGVvZiBhbGcgIT09ICdzdHJpbmcnIHx8ICFhbGcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJhbGdcIiBhcmd1bWVudCBpcyByZXF1aXJlZCB3aGVuIFwiandrLmFsZ1wiIGlzIG5vdCBwcmVzZW50Jyk7XG4gICAgfVxuICAgIHN3aXRjaCAoandrLmt0eSkge1xuICAgICAgICBjYXNlICdvY3QnOlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBqd2suayAhPT0gJ3N0cmluZycgfHwgIWp3ay5rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWlzc2luZyBcImtcIiAoS2V5IFZhbHVlKSBQYXJhbWV0ZXIgdmFsdWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9jdEFzS2V5T2JqZWN0ICE9PSBudWxsICYmIG9jdEFzS2V5T2JqZWN0ICE9PSB2b2lkIDAgPyBvY3RBc0tleU9iamVjdCA6IChvY3RBc0tleU9iamVjdCA9IGp3ay5leHQgIT09IHRydWUpO1xuICAgICAgICAgICAgaWYgKG9jdEFzS2V5T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgwLCBqd2tfdG9fa2V5X2pzXzEuZGVmYXVsdCkoeyAuLi5qd2ssIGFsZywgZXh0OiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoMCwgYmFzZTY0dXJsX2pzXzEuZGVjb2RlKShqd2suayk7XG4gICAgICAgIGNhc2UgJ1JTQSc6XG4gICAgICAgICAgICBpZiAoandrLm90aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ1JTQSBKV0sgXCJvdGhcIiAoT3RoZXIgUHJpbWVzIEluZm8pIFBhcmFtZXRlciB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0VDJzpcbiAgICAgICAgY2FzZSAnT0tQJzpcbiAgICAgICAgICAgIHJldHVybiAoMCwgandrX3RvX2tleV9qc18xLmRlZmF1bHQpKHsgLi4uandrLCBhbGcgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnVW5zdXBwb3J0ZWQgXCJrdHlcIiAoS2V5IFR5cGUpIFBhcmFtZXRlciB2YWx1ZScpO1xuICAgIH1cbn1cbmV4cG9ydHMuaW1wb3J0SldLID0gaW1wb3J0SldLO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVud3JhcCA9IGV4cG9ydHMud3JhcCA9IHZvaWQgMDtcbmNvbnN0IGVuY3J5cHRfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2VuY3J5cHQuanNcIik7XG5jb25zdCBkZWNyeXB0X2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9kZWNyeXB0LmpzXCIpO1xuY29uc3QgaXZfanNfMSA9IHJlcXVpcmUoXCIuL2l2LmpzXCIpO1xuY29uc3QgYmFzZTY0dXJsX2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9iYXNlNjR1cmwuanNcIik7XG5hc3luYyBmdW5jdGlvbiB3cmFwKGFsZywga2V5LCBjZWssIGl2KSB7XG4gICAgY29uc3QgandlQWxnb3JpdGhtID0gYWxnLnNsaWNlKDAsIDcpO1xuICAgIGl2IHx8IChpdiA9ICgwLCBpdl9qc18xLmRlZmF1bHQpKGp3ZUFsZ29yaXRobSkpO1xuICAgIGNvbnN0IHsgY2lwaGVydGV4dDogZW5jcnlwdGVkS2V5LCB0YWcgfSA9IGF3YWl0ICgwLCBlbmNyeXB0X2pzXzEuZGVmYXVsdCkoandlQWxnb3JpdGhtLCBjZWssIGtleSwgaXYsIG5ldyBVaW50OEFycmF5KDApKTtcbiAgICByZXR1cm4geyBlbmNyeXB0ZWRLZXksIGl2OiAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKShpdiksIHRhZzogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkodGFnKSB9O1xufVxuZXhwb3J0cy53cmFwID0gd3JhcDtcbmFzeW5jIGZ1bmN0aW9uIHVud3JhcChhbGcsIGtleSwgZW5jcnlwdGVkS2V5LCBpdiwgdGFnKSB7XG4gICAgY29uc3QgandlQWxnb3JpdGhtID0gYWxnLnNsaWNlKDAsIDcpO1xuICAgIHJldHVybiAoMCwgZGVjcnlwdF9qc18xLmRlZmF1bHQpKGp3ZUFsZ29yaXRobSwga2V5LCBlbmNyeXB0ZWRLZXksIGl2LCB0YWcsIG5ldyBVaW50OEFycmF5KDApKTtcbn1cbmV4cG9ydHMudW53cmFwID0gdW53cmFwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbmNhdEtkZiA9IGV4cG9ydHMubGVuZ3RoQW5kSW5wdXQgPSBleHBvcnRzLnVpbnQzMmJlID0gZXhwb3J0cy51aW50NjRiZSA9IGV4cG9ydHMucDJzID0gZXhwb3J0cy5jb25jYXQgPSBleHBvcnRzLmRlY29kZXIgPSBleHBvcnRzLmVuY29kZXIgPSB2b2lkIDA7XG5jb25zdCBkaWdlc3RfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2RpZ2VzdC5qc1wiKTtcbmV4cG9ydHMuZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuZXhwb3J0cy5kZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG5jb25zdCBNQVhfSU5UMzIgPSAyICoqIDMyO1xuZnVuY3Rpb24gY29uY2F0KC4uLmJ1ZmZlcnMpIHtcbiAgICBjb25zdCBzaXplID0gYnVmZmVycy5yZWR1Y2UoKGFjYywgeyBsZW5ndGggfSkgPT4gYWNjICsgbGVuZ3RoLCAwKTtcbiAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgYnVmZmVycy5mb3JFYWNoKChidWZmZXIpID0+IHtcbiAgICAgICAgYnVmLnNldChidWZmZXIsIGkpO1xuICAgICAgICBpICs9IGJ1ZmZlci5sZW5ndGg7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1Zjtcbn1cbmV4cG9ydHMuY29uY2F0ID0gY29uY2F0O1xuZnVuY3Rpb24gcDJzKGFsZywgcDJzSW5wdXQpIHtcbiAgICByZXR1cm4gY29uY2F0KGV4cG9ydHMuZW5jb2Rlci5lbmNvZGUoYWxnKSwgbmV3IFVpbnQ4QXJyYXkoWzBdKSwgcDJzSW5wdXQpO1xufVxuZXhwb3J0cy5wMnMgPSBwMnM7XG5mdW5jdGlvbiB3cml0ZVVJbnQzMkJFKGJ1ZiwgdmFsdWUsIG9mZnNldCkge1xuICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPj0gTUFYX0lOVDMyKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGB2YWx1ZSBtdXN0IGJlID49IDAgYW5kIDw9ICR7TUFYX0lOVDMyIC0gMX0uIFJlY2VpdmVkICR7dmFsdWV9YCk7XG4gICAgfVxuICAgIGJ1Zi5zZXQoW3ZhbHVlID4+PiAyNCwgdmFsdWUgPj4+IDE2LCB2YWx1ZSA+Pj4gOCwgdmFsdWUgJiAweGZmXSwgb2Zmc2V0KTtcbn1cbmZ1bmN0aW9uIHVpbnQ2NGJlKHZhbHVlKSB7XG4gICAgY29uc3QgaGlnaCA9IE1hdGguZmxvb3IodmFsdWUgLyBNQVhfSU5UMzIpO1xuICAgIGNvbnN0IGxvdyA9IHZhbHVlICUgTUFYX0lOVDMyO1xuICAgIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KDgpO1xuICAgIHdyaXRlVUludDMyQkUoYnVmLCBoaWdoLCAwKTtcbiAgICB3cml0ZVVJbnQzMkJFKGJ1ZiwgbG93LCA0KTtcbiAgICByZXR1cm4gYnVmO1xufVxuZXhwb3J0cy51aW50NjRiZSA9IHVpbnQ2NGJlO1xuZnVuY3Rpb24gdWludDMyYmUodmFsdWUpIHtcbiAgICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheSg0KTtcbiAgICB3cml0ZVVJbnQzMkJFKGJ1ZiwgdmFsdWUpO1xuICAgIHJldHVybiBidWY7XG59XG5leHBvcnRzLnVpbnQzMmJlID0gdWludDMyYmU7XG5mdW5jdGlvbiBsZW5ndGhBbmRJbnB1dChpbnB1dCkge1xuICAgIHJldHVybiBjb25jYXQodWludDMyYmUoaW5wdXQubGVuZ3RoKSwgaW5wdXQpO1xufVxuZXhwb3J0cy5sZW5ndGhBbmRJbnB1dCA9IGxlbmd0aEFuZElucHV0O1xuYXN5bmMgZnVuY3Rpb24gY29uY2F0S2RmKHNlY3JldCwgYml0cywgdmFsdWUpIHtcbiAgICBjb25zdCBpdGVyYXRpb25zID0gTWF0aC5jZWlsKChiaXRzID4+IDMpIC8gMzIpO1xuICAgIGNvbnN0IHJlcyA9IG5ldyBVaW50OEFycmF5KGl0ZXJhdGlvbnMgKiAzMik7XG4gICAgZm9yIChsZXQgaXRlciA9IDA7IGl0ZXIgPCBpdGVyYXRpb25zOyBpdGVyKyspIHtcbiAgICAgICAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkoNCArIHNlY3JldC5sZW5ndGggKyB2YWx1ZS5sZW5ndGgpO1xuICAgICAgICBidWYuc2V0KHVpbnQzMmJlKGl0ZXIgKyAxKSk7XG4gICAgICAgIGJ1Zi5zZXQoc2VjcmV0LCA0KTtcbiAgICAgICAgYnVmLnNldCh2YWx1ZSwgNCArIHNlY3JldC5sZW5ndGgpO1xuICAgICAgICByZXMuc2V0KGF3YWl0ICgwLCBkaWdlc3RfanNfMS5kZWZhdWx0KSgnc2hhMjU2JywgYnVmKSwgaXRlciAqIDMyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5zbGljZSgwLCBiaXRzID4+IDMpO1xufVxuZXhwb3J0cy5jb25jYXRLZGYgPSBjb25jYXRLZGY7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYml0TGVuZ3RoID0gdm9pZCAwO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCByYW5kb21fanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL3JhbmRvbS5qc1wiKTtcbmZ1bmN0aW9uIGJpdExlbmd0aChhbGcpIHtcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdBMTI4R0NNJzpcbiAgICAgICAgICAgIHJldHVybiAxMjg7XG4gICAgICAgIGNhc2UgJ0ExOTJHQ00nOlxuICAgICAgICAgICAgcmV0dXJuIDE5MjtcbiAgICAgICAgY2FzZSAnQTI1NkdDTSc6XG4gICAgICAgIGNhc2UgJ0ExMjhDQkMtSFMyNTYnOlxuICAgICAgICAgICAgcmV0dXJuIDI1NjtcbiAgICAgICAgY2FzZSAnQTE5MkNCQy1IUzM4NCc6XG4gICAgICAgICAgICByZXR1cm4gMzg0O1xuICAgICAgICBjYXNlICdBMjU2Q0JDLUhTNTEyJzpcbiAgICAgICAgICAgIHJldHVybiA1MTI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZChgVW5zdXBwb3J0ZWQgSldFIEFsZ29yaXRobTogJHthbGd9YCk7XG4gICAgfVxufVxuZXhwb3J0cy5iaXRMZW5ndGggPSBiaXRMZW5ndGg7XG5leHBvcnRzLmRlZmF1bHQgPSAoYWxnKSA9PiAoMCwgcmFuZG9tX2pzXzEuZGVmYXVsdCkobmV3IFVpbnQ4QXJyYXkoYml0TGVuZ3RoKGFsZykgPj4gMykpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IGl2X2pzXzEgPSByZXF1aXJlKFwiLi9pdi5qc1wiKTtcbmNvbnN0IGNoZWNrSXZMZW5ndGggPSAoZW5jLCBpdikgPT4ge1xuICAgIGlmIChpdi5sZW5ndGggPDwgMyAhPT0gKDAsIGl2X2pzXzEuYml0TGVuZ3RoKShlbmMpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdJbnZhbGlkIEluaXRpYWxpemF0aW9uIFZlY3RvciBsZW5ndGgnKTtcbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gY2hlY2tJdkxlbmd0aDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW52YWxpZF9rZXlfaW5wdXRfanNfMSA9IHJlcXVpcmUoXCIuL2ludmFsaWRfa2V5X2lucHV0LmpzXCIpO1xuY29uc3QgaXNfa2V5X2xpa2VfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2lzX2tleV9saWtlLmpzXCIpO1xuY29uc3Qgc3ltbWV0cmljVHlwZUNoZWNrID0gKGtleSkgPT4ge1xuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBVaW50OEFycmF5KVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCEoMCwgaXNfa2V5X2xpa2VfanNfMS5kZWZhdWx0KShrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKDAsIGludmFsaWRfa2V5X2lucHV0X2pzXzEuZGVmYXVsdCkoa2V5LCAuLi5pc19rZXlfbGlrZV9qc18xLnR5cGVzLCAnVWludDhBcnJheScpKTtcbiAgICB9XG4gICAgaWYgKGtleS50eXBlICE9PSAnc2VjcmV0Jykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2lzX2tleV9saWtlX2pzXzEudHlwZXMuam9pbignIG9yICcpfSBpbnN0YW5jZXMgZm9yIHN5bW1ldHJpYyBhbGdvcml0aG1zIG11c3QgYmUgb2YgdHlwZSBcInNlY3JldFwiYCk7XG4gICAgfVxufTtcbmNvbnN0IGFzeW1tZXRyaWNUeXBlQ2hlY2sgPSAoa2V5LCB1c2FnZSkgPT4ge1xuICAgIGlmICghKDAsIGlzX2tleV9saWtlX2pzXzEuZGVmYXVsdCkoa2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCgwLCBpbnZhbGlkX2tleV9pbnB1dF9qc18xLmRlZmF1bHQpKGtleSwgLi4uaXNfa2V5X2xpa2VfanNfMS50eXBlcykpO1xuICAgIH1cbiAgICBpZiAoa2V5LnR5cGUgPT09ICdzZWNyZXQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7aXNfa2V5X2xpa2VfanNfMS50eXBlcy5qb2luKCcgb3IgJyl9IGluc3RhbmNlcyBmb3IgYXN5bW1ldHJpYyBhbGdvcml0aG1zIG11c3Qgbm90IGJlIG9mIHR5cGUgXCJzZWNyZXRcImApO1xuICAgIH1cbiAgICBpZiAodXNhZ2UgPT09ICdzaWduJyAmJiBrZXkudHlwZSA9PT0gJ3B1YmxpYycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtpc19rZXlfbGlrZV9qc18xLnR5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBzaWduaW5nIG11c3QgYmUgb2YgdHlwZSBcInByaXZhdGVcImApO1xuICAgIH1cbiAgICBpZiAodXNhZ2UgPT09ICdkZWNyeXB0JyAmJiBrZXkudHlwZSA9PT0gJ3B1YmxpYycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtpc19rZXlfbGlrZV9qc18xLnR5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBkZWNyeXB0aW9uIG11c3QgYmUgb2YgdHlwZSBcInByaXZhdGVcImApO1xuICAgIH1cbiAgICBpZiAoa2V5LmFsZ29yaXRobSAmJiB1c2FnZSA9PT0gJ3ZlcmlmeScgJiYga2V5LnR5cGUgPT09ICdwcml2YXRlJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2lzX2tleV9saWtlX2pzXzEudHlwZXMuam9pbignIG9yICcpfSBpbnN0YW5jZXMgZm9yIGFzeW1tZXRyaWMgYWxnb3JpdGhtIHZlcmlmeWluZyBtdXN0IGJlIG9mIHR5cGUgXCJwdWJsaWNcImApO1xuICAgIH1cbiAgICBpZiAoa2V5LmFsZ29yaXRobSAmJiB1c2FnZSA9PT0gJ2VuY3J5cHQnICYmIGtleS50eXBlID09PSAncHJpdmF0ZScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtpc19rZXlfbGlrZV9qc18xLnR5cGVzLmpvaW4oJyBvciAnKX0gaW5zdGFuY2VzIGZvciBhc3ltbWV0cmljIGFsZ29yaXRobSBlbmNyeXB0aW9uIG11c3QgYmUgb2YgdHlwZSBcInB1YmxpY1wiYCk7XG4gICAgfVxufTtcbmNvbnN0IGNoZWNrS2V5VHlwZSA9IChhbGcsIGtleSwgdXNhZ2UpID0+IHtcbiAgICBjb25zdCBzeW1tZXRyaWMgPSBhbGcuc3RhcnRzV2l0aCgnSFMnKSB8fFxuICAgICAgICBhbGcgPT09ICdkaXInIHx8XG4gICAgICAgIGFsZy5zdGFydHNXaXRoKCdQQkVTMicpIHx8XG4gICAgICAgIC9eQVxcZHszfSg/OkdDTSk/S1ckLy50ZXN0KGFsZyk7XG4gICAgaWYgKHN5bW1ldHJpYykge1xuICAgICAgICBzeW1tZXRyaWNUeXBlQ2hlY2soa2V5KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFzeW1tZXRyaWNUeXBlQ2hlY2soa2V5LCB1c2FnZSk7XG4gICAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNoZWNrS2V5VHlwZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5mdW5jdGlvbiBjaGVja1AycyhwMnMpIHtcbiAgICBpZiAoIShwMnMgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB8fCBwMnMubGVuZ3RoIDwgOCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnUEJFUzIgU2FsdCBJbnB1dCBtdXN0IGJlIDggb3IgbW9yZSBvY3RldHMnKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjaGVja1AycztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jaGVja0VuY0NyeXB0b0tleSA9IGV4cG9ydHMuY2hlY2tTaWdDcnlwdG9LZXkgPSB2b2lkIDA7XG5jb25zdCBlbnZfanNfMSA9IHJlcXVpcmUoXCIuLi9ydW50aW1lL2Vudi5qc1wiKTtcbmZ1bmN0aW9uIHVudXNhYmxlKG5hbWUsIHByb3AgPSAnYWxnb3JpdGhtLm5hbWUnKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYENyeXB0b0tleSBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgb3BlcmF0aW9uLCBpdHMgJHtwcm9wfSBtdXN0IGJlICR7bmFtZX1gKTtcbn1cbmZ1bmN0aW9uIGlzQWxnb3JpdGhtKGFsZ29yaXRobSwgbmFtZSkge1xuICAgIHJldHVybiBhbGdvcml0aG0ubmFtZSA9PT0gbmFtZTtcbn1cbmZ1bmN0aW9uIGdldEhhc2hMZW5ndGgoaGFzaCkge1xuICAgIHJldHVybiBwYXJzZUludChoYXNoLm5hbWUuc2xpY2UoNCksIDEwKTtcbn1cbmZ1bmN0aW9uIGdldE5hbWVkQ3VydmUoYWxnKSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7XG4gICAgICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgICAgICAgIHJldHVybiAnUC0zODQnO1xuICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICByZXR1cm4gJ1AtNTIxJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWFjaGFibGUnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKSB7XG4gICAgaWYgKHVzYWdlcy5sZW5ndGggJiYgIXVzYWdlcy5zb21lKChleHBlY3RlZCkgPT4ga2V5LnVzYWdlcy5pbmNsdWRlcyhleHBlY3RlZCkpKSB7XG4gICAgICAgIGxldCBtc2cgPSAnQ3J5cHRvS2V5IGRvZXMgbm90IHN1cHBvcnQgdGhpcyBvcGVyYXRpb24sIGl0cyB1c2FnZXMgbXVzdCBpbmNsdWRlICc7XG4gICAgICAgIGlmICh1c2FnZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgY29uc3QgbGFzdCA9IHVzYWdlcy5wb3AoKTtcbiAgICAgICAgICAgIG1zZyArPSBgb25lIG9mICR7dXNhZ2VzLmpvaW4oJywgJyl9LCBvciAke2xhc3R9LmA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXNhZ2VzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgbXNnICs9IGBvbmUgb2YgJHt1c2FnZXNbMF19IG9yICR7dXNhZ2VzWzFdfS5gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbXNnICs9IGAke3VzYWdlc1swXX0uYDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKG1zZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tTaWdDcnlwdG9LZXkoa2V5LCBhbGcsIC4uLnVzYWdlcykge1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ0hTMjU2JzpcbiAgICAgICAgY2FzZSAnSFMzODQnOlxuICAgICAgICBjYXNlICdIUzUxMic6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0hNQUMnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnSE1BQycpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXJzZUludChhbGcuc2xpY2UoMiksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEhhc2hMZW5ndGgoa2V5LmFsZ29yaXRobS5oYXNoKTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGBTSEEtJHtleHBlY3RlZH1gLCAnYWxnb3JpdGhtLmhhc2gnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1JTMjU2JzpcbiAgICAgICAgY2FzZSAnUlMzODQnOlxuICAgICAgICBjYXNlICdSUzUxMic6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ1JTQVNTQS1QS0NTMS12MV81JykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ1JTQVNTQS1QS0NTMS12MV81Jyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zbGljZSgyKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gZ2V0SGFzaExlbmd0aChrZXkuYWxnb3JpdGhtLmhhc2gpO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUFMyNTYnOlxuICAgICAgICBjYXNlICdQUzM4NCc6XG4gICAgICAgIGNhc2UgJ1BTNTEyJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnUlNBLVBTUycpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdSU0EtUFNTJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IHBhcnNlSW50KGFsZy5zbGljZSgyKSwgMTApO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gZ2V0SGFzaExlbmd0aChrZXkuYWxnb3JpdGhtLmhhc2gpO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAoMCwgZW52X2pzXzEuaXNOb2RlSnMpKCkgJiYgJ0VkRFNBJzoge1xuICAgICAgICAgICAgaWYgKGtleS5hbGdvcml0aG0ubmFtZSAhPT0gJ05PREUtRUQyNTUxOScgJiYga2V5LmFsZ29yaXRobS5uYW1lICE9PSAnTk9ERS1FRDQ0OCcpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ05PREUtRUQyNTUxOSBvciBOT0RFLUVENDQ4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICgwLCBlbnZfanNfMS5pc0Nsb3VkZmxhcmVXb3JrZXJzKSgpICYmICdFZERTQSc6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ05PREUtRUQyNTUxOScpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdOT0RFLUVEMjU1MTknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICBjYXNlICdFUzUxMic6IHtcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0VDRFNBJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0VDRFNBJyk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IGdldE5hbWVkQ3VydmUoYWxnKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGtleS5hbGdvcml0aG0ubmFtZWRDdXJ2ZTtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGV4cGVjdGVkLCAnYWxnb3JpdGhtLm5hbWVkQ3VydmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDcnlwdG9LZXkgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIG9wZXJhdGlvbicpO1xuICAgIH1cbiAgICBjaGVja1VzYWdlKGtleSwgdXNhZ2VzKTtcbn1cbmV4cG9ydHMuY2hlY2tTaWdDcnlwdG9LZXkgPSBjaGVja1NpZ0NyeXB0b0tleTtcbmZ1bmN0aW9uIGNoZWNrRW5jQ3J5cHRvS2V5KGtleSwgYWxnLCAuLi51c2FnZXMpIHtcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdBMTI4R0NNJzpcbiAgICAgICAgY2FzZSAnQTE5MkdDTSc6XG4gICAgICAgIGNhc2UgJ0EyNTZHQ00nOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdBRVMtR0NNJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0FFUy1HQ00nKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkID0gcGFyc2VJbnQoYWxnLnNsaWNlKDEsIDQpLCAxMCk7XG4gICAgICAgICAgICBjb25zdCBhY3R1YWwgPSBrZXkuYWxnb3JpdGhtLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKGV4cGVjdGVkLCAnYWxnb3JpdGhtLmxlbmd0aCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnQTEyOEtXJzpcbiAgICAgICAgY2FzZSAnQTE5MktXJzpcbiAgICAgICAgY2FzZSAnQTI1NktXJzoge1xuICAgICAgICAgICAgaWYgKCFpc0FsZ29yaXRobShrZXkuYWxnb3JpdGhtLCAnQUVTLUtXJykpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoJ0FFUy1LVycpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXJzZUludChhbGcuc2xpY2UoMSwgNCksIDEwKTtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbCA9IGtleS5hbGdvcml0aG0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoZXhwZWN0ZWQsICdhbGdvcml0aG0ubGVuZ3RoJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdFQ0RIJzpcbiAgICAgICAgICAgIGlmICghaXNBbGdvcml0aG0oa2V5LmFsZ29yaXRobSwgJ0VDREgnKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnRUNESCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTMjU2K0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTMzg0K0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTNTEyK0EyNTZLVyc6XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdQQktERjInKSlcbiAgICAgICAgICAgICAgICB0aHJvdyB1bnVzYWJsZSgnUEJLREYyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC0yNTYnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC0zODQnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUC01MTInOiB7XG4gICAgICAgICAgICBpZiAoIWlzQWxnb3JpdGhtKGtleS5hbGdvcml0aG0sICdSU0EtT0FFUCcpKVxuICAgICAgICAgICAgICAgIHRocm93IHVudXNhYmxlKCdSU0EtT0FFUCcpO1xuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXJzZUludChhbGcuc2xpY2UoOSksIDEwKSB8fCAxO1xuICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gZ2V0SGFzaExlbmd0aChrZXkuYWxnb3JpdGhtLmhhc2gpO1xuICAgICAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgdW51c2FibGUoYFNIQS0ke2V4cGVjdGVkfWAsICdhbGdvcml0aG0uaGFzaCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NyeXB0b0tleSBkb2VzIG5vdCBzdXBwb3J0IHRoaXMgb3BlcmF0aW9uJyk7XG4gICAgfVxuICAgIGNoZWNrVXNhZ2Uoa2V5LCB1c2FnZXMpO1xufVxuZXhwb3J0cy5jaGVja0VuY0NyeXB0b0tleSA9IGNoZWNrRW5jQ3J5cHRvS2V5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhZXNrd19qc18xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvYWVza3cuanNcIik7XG5jb25zdCBFQ0RIID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvZWNkaGVzLmpzXCIpO1xuY29uc3QgcGJlczJrd19qc18xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvcGJlczJrdy5qc1wiKTtcbmNvbnN0IHJzYWVzX2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9yc2Flcy5qc1wiKTtcbmNvbnN0IGJhc2U2NHVybF9qc18xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBjZWtfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvY2VrLmpzXCIpO1xuY29uc3QgaW1wb3J0X2pzXzEgPSByZXF1aXJlKFwiLi4va2V5L2ltcG9ydC5qc1wiKTtcbmNvbnN0IGNoZWNrX2tleV90eXBlX2pzXzEgPSByZXF1aXJlKFwiLi9jaGVja19rZXlfdHlwZS5qc1wiKTtcbmNvbnN0IGlzX29iamVjdF9qc18xID0gcmVxdWlyZShcIi4vaXNfb2JqZWN0LmpzXCIpO1xuY29uc3QgYWVzZ2Nta3dfanNfMSA9IHJlcXVpcmUoXCIuL2Flc2djbWt3LmpzXCIpO1xuYXN5bmMgZnVuY3Rpb24gZGVjcnlwdEtleU1hbmFnZW1lbnQoYWxnLCBrZXksIGVuY3J5cHRlZEtleSwgam9zZUhlYWRlcikge1xuICAgICgwLCBjaGVja19rZXlfdHlwZV9qc18xLmRlZmF1bHQpKGFsZywga2V5LCAnZGVjcnlwdCcpO1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ2Rpcic6IHtcbiAgICAgICAgICAgIGlmIChlbmNyeXB0ZWRLZXkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnRW5jb3VudGVyZWQgdW5leHBlY3RlZCBKV0UgRW5jcnlwdGVkIEtleScpO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdFQ0RILUVTJzpcbiAgICAgICAgICAgIGlmIChlbmNyeXB0ZWRLZXkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnRW5jb3VudGVyZWQgdW5leHBlY3RlZCBKV0UgRW5jcnlwdGVkIEtleScpO1xuICAgICAgICBjYXNlICdFQ0RILUVTK0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTE5MktXJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMjU2S1cnOiB7XG4gICAgICAgICAgICBpZiAoISgwLCBpc19vYmplY3RfanNfMS5kZWZhdWx0KShqb3NlSGVhZGVyLmVwaykpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoYEpPU0UgSGVhZGVyIFwiZXBrXCIgKEVwaGVtZXJhbCBQdWJsaWMgS2V5KSBtaXNzaW5nIG9yIGludmFsaWRgKTtcbiAgICAgICAgICAgIGlmICghRUNESC5lY2RoQWxsb3dlZChrZXkpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKCdFQ0RIIHdpdGggdGhlIHByb3ZpZGVkIGtleSBpcyBub3QgYWxsb3dlZCBvciBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgamF2YXNjcmlwdCBydW50aW1lJyk7XG4gICAgICAgICAgICBjb25zdCBlcGsgPSBhd2FpdCAoMCwgaW1wb3J0X2pzXzEuaW1wb3J0SldLKShqb3NlSGVhZGVyLmVwaywgYWxnKTtcbiAgICAgICAgICAgIGxldCBwYXJ0eVVJbmZvO1xuICAgICAgICAgICAgbGV0IHBhcnR5VkluZm87XG4gICAgICAgICAgICBpZiAoam9zZUhlYWRlci5hcHUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygam9zZUhlYWRlci5hcHUgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZChgSk9TRSBIZWFkZXIgXCJhcHVcIiAoQWdyZWVtZW50IFBhcnR5VUluZm8pIGludmFsaWRgKTtcbiAgICAgICAgICAgICAgICBwYXJ0eVVJbmZvID0gKDAsIGJhc2U2NHVybF9qc18xLmRlY29kZSkoam9zZUhlYWRlci5hcHUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGpvc2VIZWFkZXIuYXB2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGpvc2VIZWFkZXIuYXB2ICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoYEpPU0UgSGVhZGVyIFwiYXB2XCIgKEFncmVlbWVudCBQYXJ0eVZJbmZvKSBpbnZhbGlkYCk7XG4gICAgICAgICAgICAgICAgcGFydHlWSW5mbyA9ICgwLCBiYXNlNjR1cmxfanNfMS5kZWNvZGUpKGpvc2VIZWFkZXIuYXB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNoYXJlZFNlY3JldCA9IGF3YWl0IEVDREguZGVyaXZlS2V5KGVwaywga2V5LCBhbGcgPT09ICdFQ0RILUVTJyA/IGpvc2VIZWFkZXIuZW5jIDogYWxnLCBhbGcgPT09ICdFQ0RILUVTJyA/ICgwLCBjZWtfanNfMS5iaXRMZW5ndGgpKGpvc2VIZWFkZXIuZW5jKSA6IHBhcnNlSW50KGFsZy5zbGljZSgtNSwgLTIpLCAxMCksIHBhcnR5VUluZm8sIHBhcnR5VkluZm8pO1xuICAgICAgICAgICAgaWYgKGFsZyA9PT0gJ0VDREgtRVMnKVxuICAgICAgICAgICAgICAgIHJldHVybiBzaGFyZWRTZWNyZXQ7XG4gICAgICAgICAgICBpZiAoZW5jcnlwdGVkS2V5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0pXRSBFbmNyeXB0ZWQgS2V5IG1pc3NpbmcnKTtcbiAgICAgICAgICAgIHJldHVybiAoMCwgYWVza3dfanNfMS51bndyYXApKGFsZy5zbGljZSgtNiksIHNoYXJlZFNlY3JldCwgZW5jcnlwdGVkS2V5KTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdSU0ExXzUnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTM4NCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTUxMic6IHtcbiAgICAgICAgICAgIGlmIChlbmNyeXB0ZWRLZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnSldFIEVuY3J5cHRlZCBLZXkgbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuICgwLCByc2Flc19qc18xLmRlY3J5cHQpKGFsZywga2V5LCBlbmNyeXB0ZWRLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTMjU2K0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTMzg0K0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ1BCRVMyLUhTNTEyK0EyNTZLVyc6IHtcbiAgICAgICAgICAgIGlmIChlbmNyeXB0ZWRLZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnSldFIEVuY3J5cHRlZCBLZXkgbWlzc2luZycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBqb3NlSGVhZGVyLnAyYyAhPT0gJ251bWJlcicpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoYEpPU0UgSGVhZGVyIFwicDJjXCIgKFBCRVMyIENvdW50KSBtaXNzaW5nIG9yIGludmFsaWRgKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygam9zZUhlYWRlci5wMnMgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKGBKT1NFIEhlYWRlciBcInAyc1wiIChQQkVTMiBTYWx0KSBtaXNzaW5nIG9yIGludmFsaWRgKTtcbiAgICAgICAgICAgIHJldHVybiAoMCwgcGJlczJrd19qc18xLmRlY3J5cHQpKGFsZywga2V5LCBlbmNyeXB0ZWRLZXksIGpvc2VIZWFkZXIucDJjLCAoMCwgYmFzZTY0dXJsX2pzXzEuZGVjb2RlKShqb3NlSGVhZGVyLnAycykpO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ0EyNTZLVyc6IHtcbiAgICAgICAgICAgIGlmIChlbmNyeXB0ZWRLZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZCgnSldFIEVuY3J5cHRlZCBLZXkgbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuICgwLCBhZXNrd19qc18xLnVud3JhcCkoYWxnLCBrZXksIGVuY3J5cHRlZEtleSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnQTEyOEdDTUtXJzpcbiAgICAgICAgY2FzZSAnQTE5MkdDTUtXJzpcbiAgICAgICAgY2FzZSAnQTI1NkdDTUtXJzoge1xuICAgICAgICAgICAgaWYgKGVuY3J5cHRlZEtleSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKCdKV0UgRW5jcnlwdGVkIEtleSBtaXNzaW5nJyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGpvc2VIZWFkZXIuaXYgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VJbnZhbGlkKGBKT1NFIEhlYWRlciBcIml2XCIgKEluaXRpYWxpemF0aW9uIFZlY3RvcikgbWlzc2luZyBvciBpbnZhbGlkYCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGpvc2VIZWFkZXIudGFnICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldFSW52YWxpZChgSk9TRSBIZWFkZXIgXCJ0YWdcIiAoQXV0aGVudGljYXRpb24gVGFnKSBtaXNzaW5nIG9yIGludmFsaWRgKTtcbiAgICAgICAgICAgIGNvbnN0IGl2ID0gKDAsIGJhc2U2NHVybF9qc18xLmRlY29kZSkoam9zZUhlYWRlci5pdik7XG4gICAgICAgICAgICBjb25zdCB0YWcgPSAoMCwgYmFzZTY0dXJsX2pzXzEuZGVjb2RlKShqb3NlSGVhZGVyLnRhZyk7XG4gICAgICAgICAgICByZXR1cm4gKDAsIGFlc2djbWt3X2pzXzEudW53cmFwKShhbGcsIGtleSwgZW5jcnlwdGVkS2V5LCBpdiwgdGFnKTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBcImFsZ1wiIChKV0UgQWxnb3JpdGhtKSBoZWFkZXIgdmFsdWUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGRlY3J5cHRLZXlNYW5hZ2VtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhZXNrd19qc18xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvYWVza3cuanNcIik7XG5jb25zdCBFQ0RIID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvZWNkaGVzLmpzXCIpO1xuY29uc3QgcGJlczJrd19qc18xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvcGJlczJrdy5qc1wiKTtcbmNvbnN0IHJzYWVzX2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9yc2Flcy5qc1wiKTtcbmNvbnN0IGJhc2U2NHVybF9qc18xID0gcmVxdWlyZShcIi4uL3J1bnRpbWUvYmFzZTY0dXJsLmpzXCIpO1xuY29uc3QgY2VrX2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2Nlay5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgZXhwb3J0X2pzXzEgPSByZXF1aXJlKFwiLi4va2V5L2V4cG9ydC5qc1wiKTtcbmNvbnN0IGNoZWNrX2tleV90eXBlX2pzXzEgPSByZXF1aXJlKFwiLi9jaGVja19rZXlfdHlwZS5qc1wiKTtcbmNvbnN0IGFlc2djbWt3X2pzXzEgPSByZXF1aXJlKFwiLi9hZXNnY21rdy5qc1wiKTtcbmFzeW5jIGZ1bmN0aW9uIGVuY3J5cHRLZXlNYW5hZ2VtZW50KGFsZywgZW5jLCBrZXksIHByb3ZpZGVkQ2VrLCBwcm92aWRlZFBhcmFtZXRlcnMgPSB7fSkge1xuICAgIGxldCBlbmNyeXB0ZWRLZXk7XG4gICAgbGV0IHBhcmFtZXRlcnM7XG4gICAgbGV0IGNlaztcbiAgICAoMCwgY2hlY2tfa2V5X3R5cGVfanNfMS5kZWZhdWx0KShhbGcsIGtleSwgJ2VuY3J5cHQnKTtcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdkaXInOiB7XG4gICAgICAgICAgICBjZWsgPSBrZXk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdFQ0RILUVTJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMTI4S1cnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTI1NktXJzoge1xuICAgICAgICAgICAgaWYgKCFFQ0RILmVjZGhBbGxvd2VkKGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnRUNESCB3aXRoIHRoZSBwcm92aWRlZCBrZXkgaXMgbm90IGFsbG93ZWQgb3Igbm90IHN1cHBvcnRlZCBieSB5b3VyIGphdmFzY3JpcHQgcnVudGltZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBhcHUsIGFwdiB9ID0gcHJvdmlkZWRQYXJhbWV0ZXJzO1xuICAgICAgICAgICAgbGV0IHsgZXBrOiBlcGhlbWVyYWxLZXkgfSA9IHByb3ZpZGVkUGFyYW1ldGVycztcbiAgICAgICAgICAgIGVwaGVtZXJhbEtleSB8fCAoZXBoZW1lcmFsS2V5ID0gKGF3YWl0IEVDREguZ2VuZXJhdGVFcGsoa2V5KSkucHJpdmF0ZUtleSk7XG4gICAgICAgICAgICBjb25zdCB7IHgsIHksIGNydiwga3R5IH0gPSBhd2FpdCAoMCwgZXhwb3J0X2pzXzEuZXhwb3J0SldLKShlcGhlbWVyYWxLZXkpO1xuICAgICAgICAgICAgY29uc3Qgc2hhcmVkU2VjcmV0ID0gYXdhaXQgRUNESC5kZXJpdmVLZXkoa2V5LCBlcGhlbWVyYWxLZXksIGFsZyA9PT0gJ0VDREgtRVMnID8gZW5jIDogYWxnLCBhbGcgPT09ICdFQ0RILUVTJyA/ICgwLCBjZWtfanNfMS5iaXRMZW5ndGgpKGVuYykgOiBwYXJzZUludChhbGcuc2xpY2UoLTUsIC0yKSwgMTApLCBhcHUsIGFwdik7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzID0geyBlcGs6IHsgeCwgY3J2LCBrdHkgfSB9O1xuICAgICAgICAgICAgaWYgKGt0eSA9PT0gJ0VDJylcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLmVway55ID0geTtcbiAgICAgICAgICAgIGlmIChhcHUpXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycy5hcHUgPSAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKShhcHUpO1xuICAgICAgICAgICAgaWYgKGFwdilcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLmFwdiA9ICgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKGFwdik7XG4gICAgICAgICAgICBpZiAoYWxnID09PSAnRUNESC1FUycpIHtcbiAgICAgICAgICAgICAgICBjZWsgPSBzaGFyZWRTZWNyZXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZWsgPSBwcm92aWRlZENlayB8fCAoMCwgY2VrX2pzXzEuZGVmYXVsdCkoZW5jKTtcbiAgICAgICAgICAgIGNvbnN0IGt3QWxnID0gYWxnLnNsaWNlKC02KTtcbiAgICAgICAgICAgIGVuY3J5cHRlZEtleSA9IGF3YWl0ICgwLCBhZXNrd19qc18xLndyYXApKGt3QWxnLCBzaGFyZWRTZWNyZXQsIGNlayk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdSU0ExXzUnOlxuICAgICAgICBjYXNlICdSU0EtT0FFUCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTM4NCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTUxMic6IHtcbiAgICAgICAgICAgIGNlayA9IHByb3ZpZGVkQ2VrIHx8ICgwLCBjZWtfanNfMS5kZWZhdWx0KShlbmMpO1xuICAgICAgICAgICAgZW5jcnlwdGVkS2V5ID0gYXdhaXQgKDAsIHJzYWVzX2pzXzEuZW5jcnlwdCkoYWxnLCBrZXksIGNlayk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdQQkVTMi1IUzI1NitBMTI4S1cnOlxuICAgICAgICBjYXNlICdQQkVTMi1IUzM4NCtBMTkyS1cnOlxuICAgICAgICBjYXNlICdQQkVTMi1IUzUxMitBMjU2S1cnOiB7XG4gICAgICAgICAgICBjZWsgPSBwcm92aWRlZENlayB8fCAoMCwgY2VrX2pzXzEuZGVmYXVsdCkoZW5jKTtcbiAgICAgICAgICAgIGNvbnN0IHsgcDJjLCBwMnMgfSA9IHByb3ZpZGVkUGFyYW1ldGVycztcbiAgICAgICAgICAgICh7IGVuY3J5cHRlZEtleSwgLi4ucGFyYW1ldGVycyB9ID0gYXdhaXQgKDAsIHBiZXMya3dfanNfMS5lbmNyeXB0KShhbGcsIGtleSwgY2VrLCBwMmMsIHAycykpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnQTEyOEtXJzpcbiAgICAgICAgY2FzZSAnQTE5MktXJzpcbiAgICAgICAgY2FzZSAnQTI1NktXJzoge1xuICAgICAgICAgICAgY2VrID0gcHJvdmlkZWRDZWsgfHwgKDAsIGNla19qc18xLmRlZmF1bHQpKGVuYyk7XG4gICAgICAgICAgICBlbmNyeXB0ZWRLZXkgPSBhd2FpdCAoMCwgYWVza3dfanNfMS53cmFwKShhbGcsIGtleSwgY2VrKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0ExMjhHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0EyNTZHQ01LVyc6IHtcbiAgICAgICAgICAgIGNlayA9IHByb3ZpZGVkQ2VrIHx8ICgwLCBjZWtfanNfMS5kZWZhdWx0KShlbmMpO1xuICAgICAgICAgICAgY29uc3QgeyBpdiB9ID0gcHJvdmlkZWRQYXJhbWV0ZXJzO1xuICAgICAgICAgICAgKHsgZW5jcnlwdGVkS2V5LCAuLi5wYXJhbWV0ZXJzIH0gPSBhd2FpdCAoMCwgYWVzZ2Nta3dfanNfMS53cmFwKShhbGcsIGtleSwgY2VrLCBpdikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgXCJhbGdcIiAoSldFIEFsZ29yaXRobSkgaGVhZGVyIHZhbHVlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgY2VrLCBlbmNyeXB0ZWRLZXksIHBhcmFtZXRlcnMgfTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGVuY3J5cHRLZXlNYW5hZ2VtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSAoZGF0ZSkgPT4gTWF0aC5mbG9vcihkYXRlLmdldFRpbWUoKSAvIDEwMDApO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSAoYjY0LCBkZXNjcmlwdG9yKSA9PiB7XG4gICAgY29uc3QgbmV3bGluZWQgPSAoYjY0Lm1hdGNoKC8uezEsNjR9L2cpIHx8IFtdKS5qb2luKCdcXG4nKTtcbiAgICByZXR1cm4gYC0tLS0tQkVHSU4gJHtkZXNjcmlwdG9yfS0tLS0tXFxuJHtuZXdsaW5lZH1cXG4tLS0tLUVORCAke2Rlc2NyaXB0b3J9LS0tLS1gO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gKGFjdHVhbCwgLi4udHlwZXMpID0+IHtcbiAgICBsZXQgbXNnID0gJ0tleSBtdXN0IGJlICc7XG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgY29uc3QgbGFzdCA9IHR5cGVzLnBvcCgpO1xuICAgICAgICBtc2cgKz0gYG9uZSBvZiB0eXBlICR7dHlwZXMuam9pbignLCAnKX0sIG9yICR7bGFzdH0uYDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIG1zZyArPSBgb25lIG9mIHR5cGUgJHt0eXBlc1swXX0gb3IgJHt0eXBlc1sxXX0uYDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1zZyArPSBgb2YgdHlwZSAke3R5cGVzWzBdfS5gO1xuICAgIH1cbiAgICBpZiAoYWN0dWFsID09IG51bGwpIHtcbiAgICAgICAgbXNnICs9IGAgUmVjZWl2ZWQgJHthY3R1YWx9YDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGFjdHVhbCA9PT0gJ2Z1bmN0aW9uJyAmJiBhY3R1YWwubmFtZSkge1xuICAgICAgICBtc2cgKz0gYCBSZWNlaXZlZCBmdW5jdGlvbiAke2FjdHVhbC5uYW1lfWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhY3R1YWwgPT09ICdvYmplY3QnICYmIGFjdHVhbCAhPSBudWxsKSB7XG4gICAgICAgIGlmIChhY3R1YWwuY29uc3RydWN0b3IgJiYgYWN0dWFsLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgICAgICAgIG1zZyArPSBgIFJlY2VpdmVkIGFuIGluc3RhbmNlIG9mICR7YWN0dWFsLmNvbnN0cnVjdG9yLm5hbWV9YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbXNnO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaXNEaXNqb2ludCA9ICguLi5oZWFkZXJzKSA9PiB7XG4gICAgY29uc3Qgc291cmNlcyA9IGhlYWRlcnMuZmlsdGVyKEJvb2xlYW4pO1xuICAgIGlmIChzb3VyY2VzLmxlbmd0aCA9PT0gMCB8fCBzb3VyY2VzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IGFjYztcbiAgICBmb3IgKGNvbnN0IGhlYWRlciBvZiBzb3VyY2VzKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBPYmplY3Qua2V5cyhoZWFkZXIpO1xuICAgICAgICBpZiAoIWFjYyB8fCBhY2Muc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgYWNjID0gbmV3IFNldChwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgIGlmIChhY2MuaGFzKHBhcmFtZXRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY2MuYWRkKHBhcmFtZXRlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNEaXNqb2ludDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XG59XG5mdW5jdGlvbiBpc09iamVjdChpbnB1dCkge1xuICAgIGlmICghaXNPYmplY3RMaWtlKGlucHV0KSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQgcHJvdG8gPSBpbnB1dDtcbiAgICB3aGlsZSAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKSAhPT0gbnVsbCkge1xuICAgICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5wdXQpID09PSBwcm90bztcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGlzT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJpdExlbmd0aCA9IHZvaWQgMDtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgcmFuZG9tX2pzXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS9yYW5kb20uanNcIik7XG5mdW5jdGlvbiBiaXRMZW5ndGgoYWxnKSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnQTEyOEdDTSc6XG4gICAgICAgIGNhc2UgJ0ExMjhHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJHQ00nOlxuICAgICAgICBjYXNlICdBMTkyR0NNS1cnOlxuICAgICAgICBjYXNlICdBMjU2R0NNJzpcbiAgICAgICAgY2FzZSAnQTI1NkdDTUtXJzpcbiAgICAgICAgICAgIHJldHVybiA5NjtcbiAgICAgICAgY2FzZSAnQTEyOENCQy1IUzI1Nic6XG4gICAgICAgIGNhc2UgJ0ExOTJDQkMtSFMzODQnOlxuICAgICAgICBjYXNlICdBMjU2Q0JDLUhTNTEyJzpcbiAgICAgICAgICAgIHJldHVybiAxMjg7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZChgVW5zdXBwb3J0ZWQgSldFIEFsZ29yaXRobTogJHthbGd9YCk7XG4gICAgfVxufVxuZXhwb3J0cy5iaXRMZW5ndGggPSBiaXRMZW5ndGg7XG5leHBvcnRzLmRlZmF1bHQgPSAoYWxnKSA9PiAoMCwgcmFuZG9tX2pzXzEuZGVmYXVsdCkobmV3IFVpbnQ4QXJyYXkoYml0TGVuZ3RoKGFsZykgPj4gMykpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IGJ1ZmZlcl91dGlsc19qc18xID0gcmVxdWlyZShcIi4vYnVmZmVyX3V0aWxzLmpzXCIpO1xuY29uc3QgZXBvY2hfanNfMSA9IHJlcXVpcmUoXCIuL2Vwb2NoLmpzXCIpO1xuY29uc3Qgc2Vjc19qc18xID0gcmVxdWlyZShcIi4vc2Vjcy5qc1wiKTtcbmNvbnN0IGlzX29iamVjdF9qc18xID0gcmVxdWlyZShcIi4vaXNfb2JqZWN0LmpzXCIpO1xuY29uc3Qgbm9ybWFsaXplVHlwID0gKHZhbHVlKSA9PiB2YWx1ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL15hcHBsaWNhdGlvblxcLy8sICcnKTtcbmNvbnN0IGNoZWNrQXVkaWVuY2VQcmVzZW5jZSA9IChhdWRQYXlsb2FkLCBhdWRPcHRpb24pID0+IHtcbiAgICBpZiAodHlwZW9mIGF1ZFBheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBhdWRPcHRpb24uaW5jbHVkZXMoYXVkUGF5bG9hZCk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGF1ZFBheWxvYWQpKSB7XG4gICAgICAgIHJldHVybiBhdWRPcHRpb24uc29tZShTZXQucHJvdG90eXBlLmhhcy5iaW5kKG5ldyBTZXQoYXVkUGF5bG9hZCkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IChwcm90ZWN0ZWRIZWFkZXIsIGVuY29kZWRQYXlsb2FkLCBvcHRpb25zID0ge30pID0+IHtcbiAgICBjb25zdCB7IHR5cCB9ID0gb3B0aW9ucztcbiAgICBpZiAodHlwICYmXG4gICAgICAgICh0eXBlb2YgcHJvdGVjdGVkSGVhZGVyLnR5cCAhPT0gJ3N0cmluZycgfHxcbiAgICAgICAgICAgIG5vcm1hbGl6ZVR5cChwcm90ZWN0ZWRIZWFkZXIudHlwKSAhPT0gbm9ybWFsaXplVHlwKHR5cCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJ3VuZXhwZWN0ZWQgXCJ0eXBcIiBKV1QgaGVhZGVyIHZhbHVlJywgJ3R5cCcsICdjaGVja19mYWlsZWQnKTtcbiAgICB9XG4gICAgbGV0IHBheWxvYWQ7XG4gICAgdHJ5IHtcbiAgICAgICAgcGF5bG9hZCA9IEpTT04ucGFyc2UoYnVmZmVyX3V0aWxzX2pzXzEuZGVjb2Rlci5kZWNvZGUoZW5jb2RlZFBheWxvYWQpKTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgIH1cbiAgICBpZiAoISgwLCBpc19vYmplY3RfanNfMS5kZWZhdWx0KShwYXlsb2FkKSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUSW52YWxpZCgnSldUIENsYWltcyBTZXQgbXVzdCBiZSBhIHRvcC1sZXZlbCBKU09OIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCB7IGlzc3VlciB9ID0gb3B0aW9ucztcbiAgICBpZiAoaXNzdWVyICYmICEoQXJyYXkuaXNBcnJheShpc3N1ZXIpID8gaXNzdWVyIDogW2lzc3Vlcl0pLmluY2x1ZGVzKHBheWxvYWQuaXNzKSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCd1bmV4cGVjdGVkIFwiaXNzXCIgY2xhaW0gdmFsdWUnLCAnaXNzJywgJ2NoZWNrX2ZhaWxlZCcpO1xuICAgIH1cbiAgICBjb25zdCB7IHN1YmplY3QgfSA9IG9wdGlvbnM7XG4gICAgaWYgKHN1YmplY3QgJiYgcGF5bG9hZC5zdWIgIT09IHN1YmplY3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgndW5leHBlY3RlZCBcInN1YlwiIGNsYWltIHZhbHVlJywgJ3N1YicsICdjaGVja19mYWlsZWQnKTtcbiAgICB9XG4gICAgY29uc3QgeyBhdWRpZW5jZSB9ID0gb3B0aW9ucztcbiAgICBpZiAoYXVkaWVuY2UgJiZcbiAgICAgICAgIWNoZWNrQXVkaWVuY2VQcmVzZW5jZShwYXlsb2FkLmF1ZCwgdHlwZW9mIGF1ZGllbmNlID09PSAnc3RyaW5nJyA/IFthdWRpZW5jZV0gOiBhdWRpZW5jZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgndW5leHBlY3RlZCBcImF1ZFwiIGNsYWltIHZhbHVlJywgJ2F1ZCcsICdjaGVja19mYWlsZWQnKTtcbiAgICB9XG4gICAgbGV0IHRvbGVyYW5jZTtcbiAgICBzd2l0Y2ggKHR5cGVvZiBvcHRpb25zLmNsb2NrVG9sZXJhbmNlKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICB0b2xlcmFuY2UgPSAoMCwgc2Vjc19qc18xLmRlZmF1bHQpKG9wdGlvbnMuY2xvY2tUb2xlcmFuY2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICB0b2xlcmFuY2UgPSBvcHRpb25zLmNsb2NrVG9sZXJhbmNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgICAgICB0b2xlcmFuY2UgPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNsb2NrVG9sZXJhbmNlIG9wdGlvbiB0eXBlJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgY3VycmVudERhdGUgfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qgbm93ID0gKDAsIGVwb2NoX2pzXzEuZGVmYXVsdCkoY3VycmVudERhdGUgfHwgbmV3IERhdGUoKSk7XG4gICAgaWYgKChwYXlsb2FkLmlhdCAhPT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMubWF4VG9rZW5BZ2UpICYmIHR5cGVvZiBwYXlsb2FkLmlhdCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXVENsYWltVmFsaWRhdGlvbkZhaWxlZCgnXCJpYXRcIiBjbGFpbSBtdXN0IGJlIGEgbnVtYmVyJywgJ2lhdCcsICdpbnZhbGlkJyk7XG4gICAgfVxuICAgIGlmIChwYXlsb2FkLm5iZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcGF5bG9hZC5uYmYgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCdcIm5iZlwiIGNsYWltIG11c3QgYmUgYSBudW1iZXInLCAnbmJmJywgJ2ludmFsaWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5uYmYgPiBub3cgKyB0b2xlcmFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJ1wibmJmXCIgY2xhaW0gdGltZXN0YW1wIGNoZWNrIGZhaWxlZCcsICduYmYnLCAnY2hlY2tfZmFpbGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBheWxvYWQuZXhwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXlsb2FkLmV4cCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1RDbGFpbVZhbGlkYXRpb25GYWlsZWQoJ1wiZXhwXCIgY2xhaW0gbXVzdCBiZSBhIG51bWJlcicsICdleHAnLCAnaW52YWxpZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmV4cCA8PSBub3cgLSB0b2xlcmFuY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1RFeHBpcmVkKCdcImV4cFwiIGNsYWltIHRpbWVzdGFtcCBjaGVjayBmYWlsZWQnLCAnZXhwJywgJ2NoZWNrX2ZhaWxlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm1heFRva2VuQWdlKSB7XG4gICAgICAgIGNvbnN0IGFnZSA9IG5vdyAtIHBheWxvYWQuaWF0O1xuICAgICAgICBjb25zdCBtYXggPSB0eXBlb2Ygb3B0aW9ucy5tYXhUb2tlbkFnZSA9PT0gJ251bWJlcicgPyBvcHRpb25zLm1heFRva2VuQWdlIDogKDAsIHNlY3NfanNfMS5kZWZhdWx0KShvcHRpb25zLm1heFRva2VuQWdlKTtcbiAgICAgICAgaWYgKGFnZSAtIHRvbGVyYW5jZSA+IG1heCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXVEV4cGlyZWQoJ1wiaWF0XCIgY2xhaW0gdGltZXN0YW1wIGNoZWNrIGZhaWxlZCAodG9vIGZhciBpbiB0aGUgcGFzdCknLCAnaWF0JywgJ2NoZWNrX2ZhaWxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhZ2UgPCAwIC0gdG9sZXJhbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkKCdcImlhdFwiIGNsYWltIHRpbWVzdGFtcCBjaGVjayBmYWlsZWQgKGl0IHNob3VsZCBiZSBpbiB0aGUgcGFzdCknLCAnaWF0JywgJ2NoZWNrX2ZhaWxlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXlsb2FkO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbWludXRlID0gNjA7XG5jb25zdCBob3VyID0gbWludXRlICogNjA7XG5jb25zdCBkYXkgPSBob3VyICogMjQ7XG5jb25zdCB3ZWVrID0gZGF5ICogNztcbmNvbnN0IHllYXIgPSBkYXkgKiAzNjUuMjU7XG5jb25zdCBSRUdFWCA9IC9eKFxcZCt8XFxkK1xcLlxcZCspID8oc2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KSQvaTtcbmV4cG9ydHMuZGVmYXVsdCA9IChzdHIpID0+IHtcbiAgICBjb25zdCBtYXRjaGVkID0gUkVHRVguZXhlYyhzdHIpO1xuICAgIGlmICghbWF0Y2hlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRpbWUgcGVyaW9kIGZvcm1hdCcpO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQobWF0Y2hlZFsxXSk7XG4gICAgY29uc3QgdW5pdCA9IG1hdGNoZWRbMl0udG9Mb3dlckNhc2UoKTtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgY2FzZSAnc2VjJzpcbiAgICAgICAgY2FzZSAnc2Vjcyc6XG4gICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgIGNhc2UgJ21pbnMnOlxuICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogbWludXRlKTtcbiAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgICAgY2FzZSAnaHInOlxuICAgICAgICBjYXNlICdocnMnOlxuICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogaG91cik7XG4gICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogZGF5KTtcbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgIGNhc2UgJ3dlZWtzJzpcbiAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIHdlZWspO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiB5ZWFyKTtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2YWxpZGF0ZUFsZ29yaXRobXMgPSAob3B0aW9uLCBhbGdvcml0aG1zKSA9PiB7XG4gICAgaWYgKGFsZ29yaXRobXMgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAoIUFycmF5LmlzQXJyYXkoYWxnb3JpdGhtcykgfHwgYWxnb3JpdGhtcy5zb21lKChzKSA9PiB0eXBlb2YgcyAhPT0gJ3N0cmluZycpKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBcIiR7b3B0aW9ufVwiIG9wdGlvbiBtdXN0IGJlIGFuIGFycmF5IG9mIHN0cmluZ3NgKTtcbiAgICB9XG4gICAgaWYgKCFhbGdvcml0aG1zKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2V0KGFsZ29yaXRobXMpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZhbGlkYXRlQWxnb3JpdGhtcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5mdW5jdGlvbiB2YWxpZGF0ZUNyaXQoRXJyLCByZWNvZ25pemVkRGVmYXVsdCwgcmVjb2duaXplZE9wdGlvbiwgcHJvdGVjdGVkSGVhZGVyLCBqb3NlSGVhZGVyKSB7XG4gICAgaWYgKGpvc2VIZWFkZXIuY3JpdCAhPT0gdW5kZWZpbmVkICYmIHByb3RlY3RlZEhlYWRlci5jcml0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycignXCJjcml0XCIgKENyaXRpY2FsKSBIZWFkZXIgUGFyYW1ldGVyIE1VU1QgYmUgaW50ZWdyaXR5IHByb3RlY3RlZCcpO1xuICAgIH1cbiAgICBpZiAoIXByb3RlY3RlZEhlYWRlciB8fCBwcm90ZWN0ZWRIZWFkZXIuY3JpdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KCk7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShwcm90ZWN0ZWRIZWFkZXIuY3JpdCkgfHxcbiAgICAgICAgcHJvdGVjdGVkSGVhZGVyLmNyaXQubGVuZ3RoID09PSAwIHx8XG4gICAgICAgIHByb3RlY3RlZEhlYWRlci5jcml0LnNvbWUoKGlucHV0KSA9PiB0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnIHx8IGlucHV0Lmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycignXCJjcml0XCIgKENyaXRpY2FsKSBIZWFkZXIgUGFyYW1ldGVyIE1VU1QgYmUgYW4gYXJyYXkgb2Ygbm9uLWVtcHR5IHN0cmluZ3Mgd2hlbiBwcmVzZW50Jyk7XG4gICAgfVxuICAgIGxldCByZWNvZ25pemVkO1xuICAgIGlmIChyZWNvZ25pemVkT3B0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVjb2duaXplZCA9IG5ldyBNYXAoWy4uLk9iamVjdC5lbnRyaWVzKHJlY29nbml6ZWRPcHRpb24pLCAuLi5yZWNvZ25pemVkRGVmYXVsdC5lbnRyaWVzKCldKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlY29nbml6ZWQgPSByZWNvZ25pemVkRGVmYXVsdDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBwYXJhbWV0ZXIgb2YgcHJvdGVjdGVkSGVhZGVyLmNyaXQpIHtcbiAgICAgICAgaWYgKCFyZWNvZ25pemVkLmhhcyhwYXJhbWV0ZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZChgRXh0ZW5zaW9uIEhlYWRlciBQYXJhbWV0ZXIgXCIke3BhcmFtZXRlcn1cIiBpcyBub3QgcmVjb2duaXplZGApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqb3NlSGVhZGVyW3BhcmFtZXRlcl0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycihgRXh0ZW5zaW9uIEhlYWRlciBQYXJhbWV0ZXIgXCIke3BhcmFtZXRlcn1cIiBpcyBtaXNzaW5nYCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVjb2duaXplZC5nZXQocGFyYW1ldGVyKSAmJiBwcm90ZWN0ZWRIZWFkZXJbcGFyYW1ldGVyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyKGBFeHRlbnNpb24gSGVhZGVyIFBhcmFtZXRlciBcIiR7cGFyYW1ldGVyfVwiIE1VU1QgYmUgaW50ZWdyaXR5IHByb3RlY3RlZGApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2V0KHByb3RlY3RlZEhlYWRlci5jcml0KTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IHZhbGlkYXRlQ3JpdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51bndyYXAgPSBleHBvcnRzLndyYXAgPSB2b2lkIDA7XG5jb25zdCBidWZmZXJfMSA9IHJlcXVpcmUoXCJidWZmZXJcIik7XG5jb25zdCBjcnlwdG9fMSA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IGJ1ZmZlcl91dGlsc19qc18xID0gcmVxdWlyZShcIi4uL2xpYi9idWZmZXJfdXRpbHMuanNcIik7XG5jb25zdCB3ZWJjcnlwdG9fanNfMSA9IHJlcXVpcmUoXCIuL3dlYmNyeXB0by5qc1wiKTtcbmNvbnN0IGNyeXB0b19rZXlfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvY3J5cHRvX2tleS5qc1wiKTtcbmNvbnN0IGlzX2tleV9vYmplY3RfanNfMSA9IHJlcXVpcmUoXCIuL2lzX2tleV9vYmplY3QuanNcIik7XG5jb25zdCBpbnZhbGlkX2tleV9pbnB1dF9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qc1wiKTtcbmNvbnN0IGNpcGhlcnNfanNfMSA9IHJlcXVpcmUoXCIuL2NpcGhlcnMuanNcIik7XG5jb25zdCBpc19rZXlfbGlrZV9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X2xpa2UuanNcIik7XG5mdW5jdGlvbiBjaGVja0tleVNpemUoa2V5LCBhbGcpIHtcbiAgICBpZiAoa2V5LnN5bW1ldHJpY0tleVNpemUgPDwgMyAhPT0gcGFyc2VJbnQoYWxnLnNsaWNlKDEsIDQpLCAxMCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBrZXkgc2l6ZSBmb3IgYWxnOiAke2FsZ31gKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlbnN1cmVLZXlPYmplY3Qoa2V5LCBhbGcsIHVzYWdlKSB7XG4gICAgaWYgKCgwLCBpc19rZXlfb2JqZWN0X2pzXzEuZGVmYXVsdCkoa2V5KSkge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICByZXR1cm4gKDAsIGNyeXB0b18xLmNyZWF0ZVNlY3JldEtleSkoa2V5KTtcbiAgICB9XG4gICAgaWYgKCgwLCB3ZWJjcnlwdG9fanNfMS5pc0NyeXB0b0tleSkoa2V5KSkge1xuICAgICAgICAoMCwgY3J5cHRvX2tleV9qc18xLmNoZWNrRW5jQ3J5cHRvS2V5KShrZXksIGFsZywgdXNhZ2UpO1xuICAgICAgICByZXR1cm4gY3J5cHRvXzEuS2V5T2JqZWN0LmZyb20oa2V5KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigoMCwgaW52YWxpZF9rZXlfaW5wdXRfanNfMS5kZWZhdWx0KShrZXksIC4uLmlzX2tleV9saWtlX2pzXzEudHlwZXMsICdVaW50OEFycmF5JykpO1xufVxuY29uc3Qgd3JhcCA9IChhbGcsIGtleSwgY2VrKSA9PiB7XG4gICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KGFsZy5zbGljZSgxLCA0KSwgMTApO1xuICAgIGNvbnN0IGFsZ29yaXRobSA9IGBhZXMke3NpemV9LXdyYXBgO1xuICAgIGlmICghKDAsIGNpcGhlcnNfanNfMS5kZWZhdWx0KShhbGdvcml0aG0pKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKGBhbGcgJHthbGd9IGlzIG5vdCBzdXBwb3J0ZWQgZWl0aGVyIGJ5IEpPU0Ugb3IgeW91ciBqYXZhc2NyaXB0IHJ1bnRpbWVgKTtcbiAgICB9XG4gICAgY29uc3Qga2V5T2JqZWN0ID0gZW5zdXJlS2V5T2JqZWN0KGtleSwgYWxnLCAnd3JhcEtleScpO1xuICAgIGNoZWNrS2V5U2l6ZShrZXlPYmplY3QsIGFsZyk7XG4gICAgY29uc3QgY2lwaGVyID0gKDAsIGNyeXB0b18xLmNyZWF0ZUNpcGhlcml2KShhbGdvcml0aG0sIGtleU9iamVjdCwgYnVmZmVyXzEuQnVmZmVyLmFsbG9jKDgsIDB4YTYpKTtcbiAgICByZXR1cm4gKDAsIGJ1ZmZlcl91dGlsc19qc18xLmNvbmNhdCkoY2lwaGVyLnVwZGF0ZShjZWspLCBjaXBoZXIuZmluYWwoKSk7XG59O1xuZXhwb3J0cy53cmFwID0gd3JhcDtcbmNvbnN0IHVud3JhcCA9IChhbGcsIGtleSwgZW5jcnlwdGVkS2V5KSA9PiB7XG4gICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KGFsZy5zbGljZSgxLCA0KSwgMTApO1xuICAgIGNvbnN0IGFsZ29yaXRobSA9IGBhZXMke3NpemV9LXdyYXBgO1xuICAgIGlmICghKDAsIGNpcGhlcnNfanNfMS5kZWZhdWx0KShhbGdvcml0aG0pKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKGBhbGcgJHthbGd9IGlzIG5vdCBzdXBwb3J0ZWQgZWl0aGVyIGJ5IEpPU0Ugb3IgeW91ciBqYXZhc2NyaXB0IHJ1bnRpbWVgKTtcbiAgICB9XG4gICAgY29uc3Qga2V5T2JqZWN0ID0gZW5zdXJlS2V5T2JqZWN0KGtleSwgYWxnLCAndW53cmFwS2V5Jyk7XG4gICAgY2hlY2tLZXlTaXplKGtleU9iamVjdCwgYWxnKTtcbiAgICBjb25zdCBjaXBoZXIgPSAoMCwgY3J5cHRvXzEuY3JlYXRlRGVjaXBoZXJpdikoYWxnb3JpdGhtLCBrZXlPYmplY3QsIGJ1ZmZlcl8xLkJ1ZmZlci5hbGxvYyg4LCAweGE2KSk7XG4gICAgcmV0dXJuICgwLCBidWZmZXJfdXRpbHNfanNfMS5jb25jYXQpKGNpcGhlci51cGRhdGUoZW5jcnlwdGVkS2V5KSwgY2lwaGVyLmZpbmFsKCkpO1xufTtcbmV4cG9ydHMudW53cmFwID0gdW53cmFwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZyb21TUEtJID0gZXhwb3J0cy5mcm9tUEtDUzggPSBleHBvcnRzLnRvUEtDUzggPSBleHBvcnRzLnRvU1BLSSA9IHZvaWQgMDtcbmNvbnN0IGNyeXB0b18xID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IGJ1ZmZlcl8xID0gcmVxdWlyZShcImJ1ZmZlclwiKTtcbmNvbnN0IHdlYmNyeXB0b19qc18xID0gcmVxdWlyZShcIi4vd2ViY3J5cHRvLmpzXCIpO1xuY29uc3QgaXNfa2V5X29iamVjdF9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X29iamVjdC5qc1wiKTtcbmNvbnN0IGludmFsaWRfa2V5X2lucHV0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzXCIpO1xuY29uc3QgaXNfa2V5X2xpa2VfanNfMSA9IHJlcXVpcmUoXCIuL2lzX2tleV9saWtlLmpzXCIpO1xuY29uc3QgZ2VuZXJpY0V4cG9ydCA9IChrZXlUeXBlLCBrZXlGb3JtYXQsIGtleSkgPT4ge1xuICAgIGxldCBrZXlPYmplY3Q7XG4gICAgaWYgKCgwLCB3ZWJjcnlwdG9fanNfMS5pc0NyeXB0b0tleSkoa2V5KSkge1xuICAgICAgICBpZiAoIWtleS5leHRyYWN0YWJsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3J5cHRvS2V5IGlzIG5vdCBleHRyYWN0YWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGtleU9iamVjdCA9IGNyeXB0b18xLktleU9iamVjdC5mcm9tKGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCgwLCBpc19rZXlfb2JqZWN0X2pzXzEuZGVmYXVsdCkoa2V5KSkge1xuICAgICAgICBrZXlPYmplY3QgPSBrZXk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCgwLCBpbnZhbGlkX2tleV9pbnB1dF9qc18xLmRlZmF1bHQpKGtleSwgLi4uaXNfa2V5X2xpa2VfanNfMS50eXBlcykpO1xuICAgIH1cbiAgICBpZiAoa2V5T2JqZWN0LnR5cGUgIT09IGtleVR5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihga2V5IGlzIG5vdCBhICR7a2V5VHlwZX0ga2V5YCk7XG4gICAgfVxuICAgIHJldHVybiBrZXlPYmplY3QuZXhwb3J0KHsgZm9ybWF0OiAncGVtJywgdHlwZToga2V5Rm9ybWF0IH0pO1xufTtcbmNvbnN0IHRvU1BLSSA9IChrZXkpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0V4cG9ydCgncHVibGljJywgJ3Nwa2knLCBrZXkpO1xufTtcbmV4cG9ydHMudG9TUEtJID0gdG9TUEtJO1xuY29uc3QgdG9QS0NTOCA9IChrZXkpID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpY0V4cG9ydCgncHJpdmF0ZScsICdwa2NzOCcsIGtleSk7XG59O1xuZXhwb3J0cy50b1BLQ1M4ID0gdG9QS0NTODtcbmNvbnN0IGZyb21QS0NTOCA9IChwZW0pID0+ICgwLCBjcnlwdG9fMS5jcmVhdGVQcml2YXRlS2V5KSh7XG4gICAga2V5OiBidWZmZXJfMS5CdWZmZXIuZnJvbShwZW0ucmVwbGFjZSgvKD86LS0tLS0oPzpCRUdJTnxFTkQpIFBSSVZBVEUgS0VZLS0tLS18XFxzKS9nLCAnJyksICdiYXNlNjQnKSxcbiAgICB0eXBlOiAncGtjczgnLFxuICAgIGZvcm1hdDogJ2RlcicsXG59KTtcbmV4cG9ydHMuZnJvbVBLQ1M4ID0gZnJvbVBLQ1M4O1xuY29uc3QgZnJvbVNQS0kgPSAocGVtKSA9PiAoMCwgY3J5cHRvXzEuY3JlYXRlUHVibGljS2V5KSh7XG4gICAga2V5OiBidWZmZXJfMS5CdWZmZXIuZnJvbShwZW0ucmVwbGFjZSgvKD86LS0tLS0oPzpCRUdJTnxFTkQpIFBVQkxJQyBLRVktLS0tLXxcXHMpL2csICcnKSwgJ2Jhc2U2NCcpLFxuICAgIHR5cGU6ICdzcGtpJyxcbiAgICBmb3JtYXQ6ICdkZXInLFxufSk7XG5leHBvcnRzLmZyb21TUEtJID0gZnJvbVNQS0k7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHRhZ0ludGVnZXIgPSAweDAyO1xuY29uc3QgdGFnU2VxdWVuY2UgPSAweDMwO1xuY2xhc3MgQXNuMVNlcXVlbmNlRGVjb2RlciB7XG4gICAgY29uc3RydWN0b3IoYnVmZmVyKSB7XG4gICAgICAgIGlmIChidWZmZXJbMF0gIT09IHRhZ1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMTtcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5kZWNvZGVMZW5ndGgoKTtcbiAgICAgICAgaWYgKGxlbiAhPT0gYnVmZmVyLmxlbmd0aCAtIHRoaXMub2Zmc2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVjb2RlTGVuZ3RoKCkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5idWZmZXJbdGhpcy5vZmZzZXQrK107XG4gICAgICAgIGlmIChsZW5ndGggJiAweDgwKSB7XG4gICAgICAgICAgICBjb25zdCBuQnl0ZXMgPSBsZW5ndGggJiB+MHg4MDtcbiAgICAgICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5CeXRlczsgaSsrKVxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IChsZW5ndGggPDwgOCkgfCB0aGlzLmJ1ZmZlclt0aGlzLm9mZnNldCArIGldO1xuICAgICAgICAgICAgdGhpcy5vZmZzZXQgKz0gbkJ5dGVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICAgIHVuc2lnbmVkSW50ZWdlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVyW3RoaXMub2Zmc2V0KytdICE9PSB0YWdJbnRlZ2VyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMuZGVjb2RlTGVuZ3RoKCk7XG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlclt0aGlzLm9mZnNldF0gPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0Kys7XG4gICAgICAgICAgICBsZW5ndGgtLTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmJ1ZmZlci5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSBsZW5ndGg7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0ICE9PSB0aGlzLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEFzbjFTZXF1ZW5jZURlY29kZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGJ1ZmZlcl8xID0gcmVxdWlyZShcImJ1ZmZlclwiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgdGFnSW50ZWdlciA9IDB4MDI7XG5jb25zdCB0YWdCaXRTdHIgPSAweDAzO1xuY29uc3QgdGFnT2N0U3RyID0gMHgwNDtcbmNvbnN0IHRhZ1NlcXVlbmNlID0gMHgzMDtcbmNvbnN0IGJaZXJvID0gYnVmZmVyXzEuQnVmZmVyLmZyb20oWzB4MDBdKTtcbmNvbnN0IGJUYWdJbnRlZ2VyID0gYnVmZmVyXzEuQnVmZmVyLmZyb20oW3RhZ0ludGVnZXJdKTtcbmNvbnN0IGJUYWdCaXRTdHIgPSBidWZmZXJfMS5CdWZmZXIuZnJvbShbdGFnQml0U3RyXSk7XG5jb25zdCBiVGFnU2VxdWVuY2UgPSBidWZmZXJfMS5CdWZmZXIuZnJvbShbdGFnU2VxdWVuY2VdKTtcbmNvbnN0IGJUYWdPY3RTdHIgPSBidWZmZXJfMS5CdWZmZXIuZnJvbShbdGFnT2N0U3RyXSk7XG5jb25zdCBlbmNvZGVMZW5ndGggPSAobGVuKSA9PiB7XG4gICAgaWYgKGxlbiA8IDEyOClcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKFtsZW5dKTtcbiAgICBjb25zdCBidWZmZXIgPSBidWZmZXJfMS5CdWZmZXIuYWxsb2MoNSk7XG4gICAgYnVmZmVyLndyaXRlVUludDMyQkUobGVuLCAxKTtcbiAgICBsZXQgb2Zmc2V0ID0gMTtcbiAgICB3aGlsZSAoYnVmZmVyW29mZnNldF0gPT09IDApXG4gICAgICAgIG9mZnNldCsrO1xuICAgIGJ1ZmZlcltvZmZzZXQgLSAxXSA9IDB4ODAgfCAoNSAtIG9mZnNldCk7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZShvZmZzZXQgLSAxKTtcbn07XG5jb25zdCBvaWRzID0gbmV3IE1hcChbXG4gICAgWydQLTI1NicsIGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKCcwNiAwOCAyQSA4NiA0OCBDRSAzRCAwMyAwMSAwNycucmVwbGFjZSgvIC9nLCAnJyksICdoZXgnKV0sXG4gICAgWydzZWNwMjU2azEnLCBidWZmZXJfMS5CdWZmZXIuZnJvbSgnMDYgMDUgMkIgODEgMDQgMDAgMEEnLnJlcGxhY2UoLyAvZywgJycpLCAnaGV4JyldLFxuICAgIFsnUC0zODQnLCBidWZmZXJfMS5CdWZmZXIuZnJvbSgnMDYgMDUgMkIgODEgMDQgMDAgMjInLnJlcGxhY2UoLyAvZywgJycpLCAnaGV4JyldLFxuICAgIFsnUC01MjEnLCBidWZmZXJfMS5CdWZmZXIuZnJvbSgnMDYgMDUgMkIgODEgMDQgMDAgMjMnLnJlcGxhY2UoLyAvZywgJycpLCAnaGV4JyldLFxuICAgIFsnZWNQdWJsaWNLZXknLCBidWZmZXJfMS5CdWZmZXIuZnJvbSgnMDYgMDcgMkEgODYgNDggQ0UgM0QgMDIgMDEnLnJlcGxhY2UoLyAvZywgJycpLCAnaGV4JyldLFxuICAgIFsnWDI1NTE5JywgYnVmZmVyXzEuQnVmZmVyLmZyb20oJzA2IDAzIDJCIDY1IDZFJy5yZXBsYWNlKC8gL2csICcnKSwgJ2hleCcpXSxcbiAgICBbJ1g0NDgnLCBidWZmZXJfMS5CdWZmZXIuZnJvbSgnMDYgMDMgMkIgNjUgNkYnLnJlcGxhY2UoLyAvZywgJycpLCAnaGV4JyldLFxuICAgIFsnRWQyNTUxOScsIGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKCcwNiAwMyAyQiA2NSA3MCcucmVwbGFjZSgvIC9nLCAnJyksICdoZXgnKV0sXG4gICAgWydFZDQ0OCcsIGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKCcwNiAwMyAyQiA2NSA3MScucmVwbGFjZSgvIC9nLCAnJyksICdoZXgnKV0sXG5dKTtcbmNsYXNzIER1bWJBc24xRW5jb2RlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgIH1cbiAgICBvaWRGb3Iob2lkKSB7XG4gICAgICAgIGNvbnN0IGJPaWQgPSBvaWRzLmdldChvaWQpO1xuICAgICAgICBpZiAoIWJPaWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIE9JRCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudHMucHVzaChiT2lkKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKz0gYk9pZC5sZW5ndGg7XG4gICAgfVxuICAgIHplcm8oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMucHVzaChiVGFnSW50ZWdlciwgYnVmZmVyXzEuQnVmZmVyLmZyb20oWzB4MDFdKSwgYlplcm8pO1xuICAgICAgICB0aGlzLmxlbmd0aCArPSAzO1xuICAgIH1cbiAgICBvbmUoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMucHVzaChiVGFnSW50ZWdlciwgYnVmZmVyXzEuQnVmZmVyLmZyb20oWzB4MDFdKSwgYnVmZmVyXzEuQnVmZmVyLmZyb20oWzB4MDFdKSk7XG4gICAgICAgIHRoaXMubGVuZ3RoICs9IDM7XG4gICAgfVxuICAgIHVuc2lnbmVkSW50ZWdlcihpbnRlZ2VyKSB7XG4gICAgICAgIGlmIChpbnRlZ2VyWzBdICYgMHg4MCkge1xuICAgICAgICAgICAgY29uc3QgbGVuID0gZW5jb2RlTGVuZ3RoKGludGVnZXIubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnB1c2goYlRhZ0ludGVnZXIsIGxlbiwgYlplcm8sIGludGVnZXIpO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggKz0gMiArIGxlbi5sZW5ndGggKyBpbnRlZ2VyLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpbnRlZ2VyW2ldID09PSAwICYmIChpbnRlZ2VyW2kgKyAxXSAmIDB4ODApID09PSAwKVxuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IGVuY29kZUxlbmd0aChpbnRlZ2VyLmxlbmd0aCAtIGkpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGJUYWdJbnRlZ2VyLCBlbmNvZGVMZW5ndGgoaW50ZWdlci5sZW5ndGggLSBpKSwgaW50ZWdlci5zbGljZShpKSk7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCArPSAxICsgbGVuLmxlbmd0aCArIGludGVnZXIubGVuZ3RoIC0gaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvY3RTdHIob2N0U3RyKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IGVuY29kZUxlbmd0aChvY3RTdHIubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGJUYWdPY3RTdHIsIGVuY29kZUxlbmd0aChvY3RTdHIubGVuZ3RoKSwgb2N0U3RyKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKz0gMSArIGxlbi5sZW5ndGggKyBvY3RTdHIubGVuZ3RoO1xuICAgIH1cbiAgICBiaXRTdHIoYml0Uykge1xuICAgICAgICBjb25zdCBsZW4gPSBlbmNvZGVMZW5ndGgoYml0Uy5sZW5ndGggKyAxKTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGJUYWdCaXRTdHIsIGVuY29kZUxlbmd0aChiaXRTLmxlbmd0aCArIDEpLCBiWmVybywgYml0Uyk7XG4gICAgICAgIHRoaXMubGVuZ3RoICs9IDEgKyBsZW4ubGVuZ3RoICsgYml0Uy5sZW5ndGggKyAxO1xuICAgIH1cbiAgICBhZGQoc2VxKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMucHVzaChzZXEpO1xuICAgICAgICB0aGlzLmxlbmd0aCArPSBzZXEubGVuZ3RoO1xuICAgIH1cbiAgICBlbmQodGFnID0gYlRhZ1NlcXVlbmNlKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IGVuY29kZUxlbmd0aCh0aGlzLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBidWZmZXJfMS5CdWZmZXIuY29uY2F0KFt0YWcsIGxlbiwgLi4udGhpcy5lbGVtZW50c10sIDEgKyBsZW4ubGVuZ3RoICsgdGhpcy5sZW5ndGgpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IER1bWJBc24xRW5jb2RlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuZW5jb2RlQmFzZTY0ID0gZXhwb3J0cy5kZWNvZGVCYXNlNjQgPSB2b2lkIDA7XG5jb25zdCBidWZmZXJfMSA9IHJlcXVpcmUoXCJidWZmZXJcIik7XG5jb25zdCBidWZmZXJfdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvYnVmZmVyX3V0aWxzLmpzXCIpO1xubGV0IGVuY29kZTtcbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xuZnVuY3Rpb24gbm9ybWFsaXplKGlucHV0KSB7XG4gICAgbGV0IGVuY29kZWQgPSBpbnB1dDtcbiAgICBpZiAoZW5jb2RlZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgZW5jb2RlZCA9IGJ1ZmZlcl91dGlsc19qc18xLmRlY29kZXIuZGVjb2RlKGVuY29kZWQpO1xuICAgIH1cbiAgICByZXR1cm4gZW5jb2RlZDtcbn1cbmlmIChidWZmZXJfMS5CdWZmZXIuaXNFbmNvZGluZygnYmFzZTY0dXJsJykpIHtcbiAgICBleHBvcnRzLmVuY29kZSA9IGVuY29kZSA9IChpbnB1dCkgPT4gYnVmZmVyXzEuQnVmZmVyLmZyb20oaW5wdXQpLnRvU3RyaW5nKCdiYXNlNjR1cmwnKTtcbn1cbmVsc2Uge1xuICAgIGV4cG9ydHMuZW5jb2RlID0gZW5jb2RlID0gKGlucHV0KSA9PiBidWZmZXJfMS5CdWZmZXIuZnJvbShpbnB1dCkudG9TdHJpbmcoJ2Jhc2U2NCcpLnJlcGxhY2UoLz0vZywgJycpLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpO1xufVxuY29uc3QgZGVjb2RlQmFzZTY0ID0gKGlucHV0KSA9PiBidWZmZXJfMS5CdWZmZXIuZnJvbShpbnB1dCwgJ2Jhc2U2NCcpO1xuZXhwb3J0cy5kZWNvZGVCYXNlNjQgPSBkZWNvZGVCYXNlNjQ7XG5jb25zdCBlbmNvZGVCYXNlNjQgPSAoaW5wdXQpID0+IGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKGlucHV0KS50b1N0cmluZygnYmFzZTY0Jyk7XG5leHBvcnRzLmVuY29kZUJhc2U2NCA9IGVuY29kZUJhc2U2NDtcbmNvbnN0IGRlY29kZSA9IChpbnB1dCkgPT4gYnVmZmVyXzEuQnVmZmVyLmZyb20obm9ybWFsaXplKGlucHV0KSwgJ2Jhc2U2NCcpO1xuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNyeXB0b18xID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IGJ1ZmZlcl91dGlsc19qc18xID0gcmVxdWlyZShcIi4uL2xpYi9idWZmZXJfdXRpbHMuanNcIik7XG5mdW5jdGlvbiBjYmNUYWcoYWFkLCBpdiwgY2lwaGVydGV4dCwgbWFjU2l6ZSwgbWFjS2V5LCBrZXlTaXplKSB7XG4gICAgY29uc3QgbWFjRGF0YSA9ICgwLCBidWZmZXJfdXRpbHNfanNfMS5jb25jYXQpKGFhZCwgaXYsIGNpcGhlcnRleHQsICgwLCBidWZmZXJfdXRpbHNfanNfMS51aW50NjRiZSkoYWFkLmxlbmd0aCA8PCAzKSk7XG4gICAgY29uc3QgaG1hYyA9ICgwLCBjcnlwdG9fMS5jcmVhdGVIbWFjKShgc2hhJHttYWNTaXplfWAsIG1hY0tleSk7XG4gICAgaG1hYy51cGRhdGUobWFjRGF0YSk7XG4gICAgcmV0dXJuIGhtYWMuZGlnZXN0KCkuc2xpY2UoMCwga2V5U2l6ZSA+PiAzKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGNiY1RhZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBpc19rZXlfb2JqZWN0X2pzXzEgPSByZXF1aXJlKFwiLi9pc19rZXlfb2JqZWN0LmpzXCIpO1xuY29uc3QgY2hlY2tDZWtMZW5ndGggPSAoZW5jLCBjZWspID0+IHtcbiAgICBsZXQgZXhwZWN0ZWQ7XG4gICAgc3dpdGNoIChlbmMpIHtcbiAgICAgICAgY2FzZSAnQTEyOENCQy1IUzI1Nic6XG4gICAgICAgIGNhc2UgJ0ExOTJDQkMtSFMzODQnOlxuICAgICAgICBjYXNlICdBMjU2Q0JDLUhTNTEyJzpcbiAgICAgICAgICAgIGV4cGVjdGVkID0gcGFyc2VJbnQoZW5jLnNsaWNlKC0zKSwgMTApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0ExMjhHQ00nOlxuICAgICAgICBjYXNlICdBMTkyR0NNJzpcbiAgICAgICAgY2FzZSAnQTI1NkdDTSc6XG4gICAgICAgICAgICBleHBlY3RlZCA9IHBhcnNlSW50KGVuYy5zbGljZSgxLCA0KSwgMTApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZChgQ29udGVudCBFbmNyeXB0aW9uIEFsZ29yaXRobSAke2VuY30gaXMgbm90IHN1cHBvcnRlZCBlaXRoZXIgYnkgSk9TRSBvciB5b3VyIGphdmFzY3JpcHQgcnVudGltZWApO1xuICAgIH1cbiAgICBpZiAoY2VrIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICBpZiAoY2VrLmxlbmd0aCA8PCAzICE9PSBleHBlY3RlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0ludmFsaWQgQ29udGVudCBFbmNyeXB0aW9uIEtleSBsZW5ndGgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICgoMCwgaXNfa2V5X29iamVjdF9qc18xLmRlZmF1bHQpKGNlaykgJiYgY2VrLnR5cGUgPT09ICdzZWNyZXQnKSB7XG4gICAgICAgIGlmIChjZWsuc3ltbWV0cmljS2V5U2l6ZSA8PCAzICE9PSBleHBlY3RlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRUludmFsaWQoJ0ludmFsaWQgQ29udGVudCBFbmNyeXB0aW9uIEtleSBsZW5ndGgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgQ29udGVudCBFbmNyeXB0aW9uIEtleSB0eXBlJyk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gY2hlY2tDZWtMZW5ndGg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0TW9kdWx1c0xlbmd0aCA9IGV4cG9ydHMud2Vha01hcCA9IHZvaWQgMDtcbmV4cG9ydHMud2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCBnZXRMZW5ndGggPSAoYnVmLCBpbmRleCkgPT4ge1xuICAgIGxldCBsZW4gPSBidWYucmVhZFVJbnQ4KDEpO1xuICAgIGlmICgobGVuICYgMHg4MCkgPT09IDApIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbGVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXRMZW5ndGgoYnVmLnN1YmFycmF5KDIgKyBsZW4pLCBpbmRleCAtIDEpO1xuICAgIH1cbiAgICBjb25zdCBudW0gPSBsZW4gJiAweDdmO1xuICAgIGxlbiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBsZW4gPDw9IDg7XG4gICAgICAgIGNvbnN0IGogPSBidWYucmVhZFVJbnQ4KDIgKyBpKTtcbiAgICAgICAgbGVuIHw9IGo7XG4gICAgfVxuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbGVuO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0TGVuZ3RoKGJ1Zi5zdWJhcnJheSgyICsgbGVuKSwgaW5kZXggLSAxKTtcbn07XG5jb25zdCBnZXRMZW5ndGhPZlNlcUluZGV4ID0gKHNlcXVlbmNlLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGxlbiA9IHNlcXVlbmNlLnJlYWRVSW50OCgxKTtcbiAgICBpZiAoKGxlbiAmIDB4ODApID09PSAwKSB7XG4gICAgICAgIHJldHVybiBnZXRMZW5ndGgoc2VxdWVuY2Uuc3ViYXJyYXkoMiksIGluZGV4KTtcbiAgICB9XG4gICAgY29uc3QgbnVtID0gbGVuICYgMHg3ZjtcbiAgICByZXR1cm4gZ2V0TGVuZ3RoKHNlcXVlbmNlLnN1YmFycmF5KDIgKyBudW0pLCBpbmRleCk7XG59O1xuY29uc3QgZ2V0TW9kdWx1c0xlbmd0aCA9IChrZXkpID0+IHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGlmIChleHBvcnRzLndlYWtNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMud2Vha01hcC5nZXQoa2V5KTtcbiAgICB9XG4gICAgY29uc3QgbW9kdWx1c0xlbmd0aCA9IChfYiA9IChfYSA9IGtleS5hc3ltbWV0cmljS2V5RGV0YWlscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1vZHVsdXNMZW5ndGgpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IChnZXRMZW5ndGhPZlNlcUluZGV4KGtleS5leHBvcnQoeyBmb3JtYXQ6ICdkZXInLCB0eXBlOiAncGtjczEnIH0pLCBrZXkudHlwZSA9PT0gJ3ByaXZhdGUnID8gMSA6IDApIC1cbiAgICAgICAgMSkgPDxcbiAgICAgICAgMztcbiAgICBleHBvcnRzLndlYWtNYXAuc2V0KGtleSwgbW9kdWx1c0xlbmd0aCk7XG4gICAgcmV0dXJuIG1vZHVsdXNMZW5ndGg7XG59O1xuY29uc3Qgc2V0TW9kdWx1c0xlbmd0aCA9IChrZXlPYmplY3QsIG1vZHVsdXNMZW5ndGgpID0+IHtcbiAgICBleHBvcnRzLndlYWtNYXAuc2V0KGtleU9iamVjdCwgbW9kdWx1c0xlbmd0aCk7XG59O1xuZXhwb3J0cy5zZXRNb2R1bHVzTGVuZ3RoID0gc2V0TW9kdWx1c0xlbmd0aDtcbmV4cG9ydHMuZGVmYXVsdCA9IChrZXksIGFsZykgPT4ge1xuICAgIGlmIChnZXRNb2R1bHVzTGVuZ3RoKGtleSkgPCAyMDQ4KSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7YWxnfSByZXF1aXJlcyBrZXkgbW9kdWx1c0xlbmd0aCB0byBiZSAyMDQ4IGJpdHMgb3IgbGFyZ2VyYCk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY3J5cHRvXzEgPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xubGV0IGNpcGhlcnM7XG5leHBvcnRzLmRlZmF1bHQgPSAoYWxnb3JpdGhtKSA9PiB7XG4gICAgY2lwaGVycyB8fCAoY2lwaGVycyA9IG5ldyBTZXQoKDAsIGNyeXB0b18xLmdldENpcGhlcnMpKCkpKTtcbiAgICByZXR1cm4gY2lwaGVycy5oYXMoYWxnb3JpdGhtKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNyeXB0b18xID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IGNoZWNrX2l2X2xlbmd0aF9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9jaGVja19pdl9sZW5ndGguanNcIik7XG5jb25zdCBjaGVja19jZWtfbGVuZ3RoX2pzXzEgPSByZXF1aXJlKFwiLi9jaGVja19jZWtfbGVuZ3RoLmpzXCIpO1xuY29uc3QgYnVmZmVyX3V0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2J1ZmZlcl91dGlscy5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgdGltaW5nX3NhZmVfZXF1YWxfanNfMSA9IHJlcXVpcmUoXCIuL3RpbWluZ19zYWZlX2VxdWFsLmpzXCIpO1xuY29uc3QgY2JjX3RhZ19qc18xID0gcmVxdWlyZShcIi4vY2JjX3RhZy5qc1wiKTtcbmNvbnN0IHdlYmNyeXB0b19qc18xID0gcmVxdWlyZShcIi4vd2ViY3J5cHRvLmpzXCIpO1xuY29uc3QgY3J5cHRvX2tleV9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9jcnlwdG9fa2V5LmpzXCIpO1xuY29uc3QgaXNfa2V5X29iamVjdF9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X29iamVjdC5qc1wiKTtcbmNvbnN0IGludmFsaWRfa2V5X2lucHV0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzXCIpO1xuY29uc3QgY2lwaGVyc19qc18xID0gcmVxdWlyZShcIi4vY2lwaGVycy5qc1wiKTtcbmNvbnN0IGlzX2tleV9saWtlX2pzXzEgPSByZXF1aXJlKFwiLi9pc19rZXlfbGlrZS5qc1wiKTtcbmZ1bmN0aW9uIGNiY0RlY3J5cHQoZW5jLCBjZWssIGNpcGhlcnRleHQsIGl2LCB0YWcsIGFhZCkge1xuICAgIGNvbnN0IGtleVNpemUgPSBwYXJzZUludChlbmMuc2xpY2UoMSwgNCksIDEwKTtcbiAgICBpZiAoKDAsIGlzX2tleV9vYmplY3RfanNfMS5kZWZhdWx0KShjZWspKSB7XG4gICAgICAgIGNlayA9IGNlay5leHBvcnQoKTtcbiAgICB9XG4gICAgY29uc3QgZW5jS2V5ID0gY2VrLnN1YmFycmF5KGtleVNpemUgPj4gMyk7XG4gICAgY29uc3QgbWFjS2V5ID0gY2VrLnN1YmFycmF5KDAsIGtleVNpemUgPj4gMyk7XG4gICAgY29uc3QgbWFjU2l6ZSA9IHBhcnNlSW50KGVuYy5zbGljZSgtMyksIDEwKTtcbiAgICBjb25zdCBhbGdvcml0aG0gPSBgYWVzLSR7a2V5U2l6ZX0tY2JjYDtcbiAgICBpZiAoISgwLCBjaXBoZXJzX2pzXzEuZGVmYXVsdCkoYWxnb3JpdGhtKSkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZChgYWxnICR7ZW5jfSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHlvdXIgamF2YXNjcmlwdCBydW50aW1lYCk7XG4gICAgfVxuICAgIGNvbnN0IGV4cGVjdGVkVGFnID0gKDAsIGNiY190YWdfanNfMS5kZWZhdWx0KShhYWQsIGl2LCBjaXBoZXJ0ZXh0LCBtYWNTaXplLCBtYWNLZXksIGtleVNpemUpO1xuICAgIGxldCBtYWNDaGVja1Bhc3NlZDtcbiAgICB0cnkge1xuICAgICAgICBtYWNDaGVja1Bhc3NlZCA9ICgwLCB0aW1pbmdfc2FmZV9lcXVhbF9qc18xLmRlZmF1bHQpKHRhZywgZXhwZWN0ZWRUYWcpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgfVxuICAgIGlmICghbWFjQ2hlY2tQYXNzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXRURlY3J5cHRpb25GYWlsZWQoKTtcbiAgICB9XG4gICAgbGV0IHBsYWludGV4dDtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkZWNpcGhlciA9ICgwLCBjcnlwdG9fMS5jcmVhdGVEZWNpcGhlcml2KShhbGdvcml0aG0sIGVuY0tleSwgaXYpO1xuICAgICAgICBwbGFpbnRleHQgPSAoMCwgYnVmZmVyX3V0aWxzX2pzXzEuY29uY2F0KShkZWNpcGhlci51cGRhdGUoY2lwaGVydGV4dCksIGRlY2lwaGVyLmZpbmFsKCkpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgfVxuICAgIGlmICghcGxhaW50ZXh0KSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VEZWNyeXB0aW9uRmFpbGVkKCk7XG4gICAgfVxuICAgIHJldHVybiBwbGFpbnRleHQ7XG59XG5mdW5jdGlvbiBnY21EZWNyeXB0KGVuYywgY2VrLCBjaXBoZXJ0ZXh0LCBpdiwgdGFnLCBhYWQpIHtcbiAgICBjb25zdCBrZXlTaXplID0gcGFyc2VJbnQoZW5jLnNsaWNlKDEsIDQpLCAxMCk7XG4gICAgY29uc3QgYWxnb3JpdGhtID0gYGFlcy0ke2tleVNpemV9LWdjbWA7XG4gICAgaWYgKCEoMCwgY2lwaGVyc19qc18xLmRlZmF1bHQpKGFsZ29yaXRobSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoYGFsZyAke2VuY30gaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGphdmFzY3JpcHQgcnVudGltZWApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkZWNpcGhlciA9ICgwLCBjcnlwdG9fMS5jcmVhdGVEZWNpcGhlcml2KShhbGdvcml0aG0sIGNlaywgaXYsIHsgYXV0aFRhZ0xlbmd0aDogMTYgfSk7XG4gICAgICAgIGRlY2lwaGVyLnNldEF1dGhUYWcodGFnKTtcbiAgICAgICAgaWYgKGFhZC5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWNpcGhlci5zZXRBQUQoYWFkLCB7IHBsYWludGV4dExlbmd0aDogY2lwaGVydGV4dC5sZW5ndGggfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGxhaW50ZXh0ID0gZGVjaXBoZXIudXBkYXRlKGNpcGhlcnRleHQpO1xuICAgICAgICBkZWNpcGhlci5maW5hbCgpO1xuICAgICAgICByZXR1cm4gcGxhaW50ZXh0O1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV0VEZWNyeXB0aW9uRmFpbGVkKCk7XG4gICAgfVxufVxuY29uc3QgZGVjcnlwdCA9IChlbmMsIGNlaywgY2lwaGVydGV4dCwgaXYsIHRhZywgYWFkKSA9PiB7XG4gICAgbGV0IGtleTtcbiAgICBpZiAoKDAsIHdlYmNyeXB0b19qc18xLmlzQ3J5cHRvS2V5KShjZWspKSB7XG4gICAgICAgICgwLCBjcnlwdG9fa2V5X2pzXzEuY2hlY2tFbmNDcnlwdG9LZXkpKGNlaywgZW5jLCAnZGVjcnlwdCcpO1xuICAgICAgICBrZXkgPSBjcnlwdG9fMS5LZXlPYmplY3QuZnJvbShjZWspO1xuICAgIH1cbiAgICBlbHNlIGlmIChjZWsgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8ICgwLCBpc19rZXlfb2JqZWN0X2pzXzEuZGVmYXVsdCkoY2VrKSkge1xuICAgICAgICBrZXkgPSBjZWs7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCgwLCBpbnZhbGlkX2tleV9pbnB1dF9qc18xLmRlZmF1bHQpKGNlaywgLi4uaXNfa2V5X2xpa2VfanNfMS50eXBlcywgJ1VpbnQ4QXJyYXknKSk7XG4gICAgfVxuICAgICgwLCBjaGVja19jZWtfbGVuZ3RoX2pzXzEuZGVmYXVsdCkoZW5jLCBrZXkpO1xuICAgICgwLCBjaGVja19pdl9sZW5ndGhfanNfMS5kZWZhdWx0KShlbmMsIGl2KTtcbiAgICBzd2l0Y2ggKGVuYykge1xuICAgICAgICBjYXNlICdBMTI4Q0JDLUhTMjU2JzpcbiAgICAgICAgY2FzZSAnQTE5MkNCQy1IUzM4NCc6XG4gICAgICAgIGNhc2UgJ0EyNTZDQkMtSFM1MTInOlxuICAgICAgICAgICAgcmV0dXJuIGNiY0RlY3J5cHQoZW5jLCBrZXksIGNpcGhlcnRleHQsIGl2LCB0YWcsIGFhZCk7XG4gICAgICAgIGNhc2UgJ0ExMjhHQ00nOlxuICAgICAgICBjYXNlICdBMTkyR0NNJzpcbiAgICAgICAgY2FzZSAnQTI1NkdDTSc6XG4gICAgICAgICAgICByZXR1cm4gZ2NtRGVjcnlwdChlbmMsIGtleSwgY2lwaGVydGV4dCwgaXYsIHRhZywgYWFkKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKCdVbnN1cHBvcnRlZCBKV0UgQ29udGVudCBFbmNyeXB0aW9uIEFsZ29yaXRobScpO1xuICAgIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWNyeXB0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjcnlwdG9fMSA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCBkaWdlc3QgPSAoYWxnb3JpdGhtLCBkYXRhKSA9PiAoMCwgY3J5cHRvXzEuY3JlYXRlSGFzaCkoYWxnb3JpdGhtKS51cGRhdGUoZGF0YSkuZGlnZXN0KCk7XG5leHBvcnRzLmRlZmF1bHQgPSBkaWdlc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuZnVuY3Rpb24gZHNhRGlnZXN0KGFsZykge1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ1BTMjU2JzpcbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgIGNhc2UgJ0VTMjU2Syc6XG4gICAgICAgICAgICByZXR1cm4gJ3NoYTI1Nic7XG4gICAgICAgIGNhc2UgJ1BTMzg0JzpcbiAgICAgICAgY2FzZSAnUlMzODQnOlxuICAgICAgICBjYXNlICdFUzM4NCc6XG4gICAgICAgICAgICByZXR1cm4gJ3NoYTM4NCc7XG4gICAgICAgIGNhc2UgJ1BTNTEyJzpcbiAgICAgICAgY2FzZSAnUlM1MTInOlxuICAgICAgICBjYXNlICdFUzUxMic6XG4gICAgICAgICAgICByZXR1cm4gJ3NoYTUxMic7XG4gICAgICAgIGNhc2UgJ0VkRFNBJzpcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZChgYWxnICR7YWxnfSBpcyBub3Qgc3VwcG9ydGVkIGVpdGhlciBieSBKT1NFIG9yIHlvdXIgamF2YXNjcmlwdCBydW50aW1lYCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gZHNhRGlnZXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmVjZGhBbGxvd2VkID0gZXhwb3J0cy5nZW5lcmF0ZUVwayA9IGV4cG9ydHMuZGVyaXZlS2V5ID0gdm9pZCAwO1xuY29uc3QgY3J5cHRvXzEgPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcInV0aWxcIik7XG5jb25zdCBnZXRfbmFtZWRfY3VydmVfanNfMSA9IHJlcXVpcmUoXCIuL2dldF9uYW1lZF9jdXJ2ZS5qc1wiKTtcbmNvbnN0IGJ1ZmZlcl91dGlsc19qc18xID0gcmVxdWlyZShcIi4uL2xpYi9idWZmZXJfdXRpbHMuanNcIik7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IHdlYmNyeXB0b19qc18xID0gcmVxdWlyZShcIi4vd2ViY3J5cHRvLmpzXCIpO1xuY29uc3QgY3J5cHRvX2tleV9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9jcnlwdG9fa2V5LmpzXCIpO1xuY29uc3QgaXNfa2V5X29iamVjdF9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X29iamVjdC5qc1wiKTtcbmNvbnN0IGludmFsaWRfa2V5X2lucHV0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzXCIpO1xuY29uc3QgaXNfa2V5X2xpa2VfanNfMSA9IHJlcXVpcmUoXCIuL2lzX2tleV9saWtlLmpzXCIpO1xuY29uc3QgZ2VuZXJhdGVLZXlQYWlyID0gKDAsIHV0aWxfMS5wcm9taXNpZnkpKGNyeXB0b18xLmdlbmVyYXRlS2V5UGFpcik7XG5hc3luYyBmdW5jdGlvbiBkZXJpdmVLZXkocHVibGljS2VlLCBwcml2YXRlS2VlLCBhbGdvcml0aG0sIGtleUxlbmd0aCwgYXB1ID0gbmV3IFVpbnQ4QXJyYXkoMCksIGFwdiA9IG5ldyBVaW50OEFycmF5KDApKSB7XG4gICAgbGV0IHB1YmxpY0tleTtcbiAgICBpZiAoKDAsIHdlYmNyeXB0b19qc18xLmlzQ3J5cHRvS2V5KShwdWJsaWNLZWUpKSB7XG4gICAgICAgICgwLCBjcnlwdG9fa2V5X2pzXzEuY2hlY2tFbmNDcnlwdG9LZXkpKHB1YmxpY0tlZSwgJ0VDREgnKTtcbiAgICAgICAgcHVibGljS2V5ID0gY3J5cHRvXzEuS2V5T2JqZWN0LmZyb20ocHVibGljS2VlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKDAsIGlzX2tleV9vYmplY3RfanNfMS5kZWZhdWx0KShwdWJsaWNLZWUpKSB7XG4gICAgICAgIHB1YmxpY0tleSA9IHB1YmxpY0tlZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKDAsIGludmFsaWRfa2V5X2lucHV0X2pzXzEuZGVmYXVsdCkocHVibGljS2VlLCAuLi5pc19rZXlfbGlrZV9qc18xLnR5cGVzKSk7XG4gICAgfVxuICAgIGxldCBwcml2YXRlS2V5O1xuICAgIGlmICgoMCwgd2ViY3J5cHRvX2pzXzEuaXNDcnlwdG9LZXkpKHByaXZhdGVLZWUpKSB7XG4gICAgICAgICgwLCBjcnlwdG9fa2V5X2pzXzEuY2hlY2tFbmNDcnlwdG9LZXkpKHByaXZhdGVLZWUsICdFQ0RIJywgJ2Rlcml2ZUJpdHMnKTtcbiAgICAgICAgcHJpdmF0ZUtleSA9IGNyeXB0b18xLktleU9iamVjdC5mcm9tKHByaXZhdGVLZWUpO1xuICAgIH1cbiAgICBlbHNlIGlmICgoMCwgaXNfa2V5X29iamVjdF9qc18xLmRlZmF1bHQpKHByaXZhdGVLZWUpKSB7XG4gICAgICAgIHByaXZhdGVLZXkgPSBwcml2YXRlS2VlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigoMCwgaW52YWxpZF9rZXlfaW5wdXRfanNfMS5kZWZhdWx0KShwcml2YXRlS2VlLCAuLi5pc19rZXlfbGlrZV9qc18xLnR5cGVzKSk7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gKDAsIGJ1ZmZlcl91dGlsc19qc18xLmNvbmNhdCkoKDAsIGJ1ZmZlcl91dGlsc19qc18xLmxlbmd0aEFuZElucHV0KShidWZmZXJfdXRpbHNfanNfMS5lbmNvZGVyLmVuY29kZShhbGdvcml0aG0pKSwgKDAsIGJ1ZmZlcl91dGlsc19qc18xLmxlbmd0aEFuZElucHV0KShhcHUpLCAoMCwgYnVmZmVyX3V0aWxzX2pzXzEubGVuZ3RoQW5kSW5wdXQpKGFwdiksICgwLCBidWZmZXJfdXRpbHNfanNfMS51aW50MzJiZSkoa2V5TGVuZ3RoKSk7XG4gICAgY29uc3Qgc2hhcmVkU2VjcmV0ID0gKDAsIGNyeXB0b18xLmRpZmZpZUhlbGxtYW4pKHsgcHJpdmF0ZUtleSwgcHVibGljS2V5IH0pO1xuICAgIHJldHVybiAoMCwgYnVmZmVyX3V0aWxzX2pzXzEuY29uY2F0S2RmKShzaGFyZWRTZWNyZXQsIGtleUxlbmd0aCwgdmFsdWUpO1xufVxuZXhwb3J0cy5kZXJpdmVLZXkgPSBkZXJpdmVLZXk7XG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUVwayhrZWUpIHtcbiAgICBsZXQga2V5O1xuICAgIGlmICgoMCwgd2ViY3J5cHRvX2pzXzEuaXNDcnlwdG9LZXkpKGtlZSkpIHtcbiAgICAgICAga2V5ID0gY3J5cHRvXzEuS2V5T2JqZWN0LmZyb20oa2VlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKDAsIGlzX2tleV9vYmplY3RfanNfMS5kZWZhdWx0KShrZWUpKSB7XG4gICAgICAgIGtleSA9IGtlZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKDAsIGludmFsaWRfa2V5X2lucHV0X2pzXzEuZGVmYXVsdCkoa2VlLCAuLi5pc19rZXlfbGlrZV9qc18xLnR5cGVzKSk7XG4gICAgfVxuICAgIHN3aXRjaCAoa2V5LmFzeW1tZXRyaWNLZXlUeXBlKSB7XG4gICAgICAgIGNhc2UgJ3gyNTUxOSc6XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVLZXlQYWlyKCd4MjU1MTknKTtcbiAgICAgICAgY2FzZSAneDQ0OCc6IHtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZUtleVBhaXIoJ3g0NDgnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdlYyc6IHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWVkQ3VydmUgPSAoMCwgZ2V0X25hbWVkX2N1cnZlX2pzXzEuZGVmYXVsdCkoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZUtleVBhaXIoJ2VjJywgeyBuYW1lZEN1cnZlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBFUEsnKTtcbiAgICB9XG59XG5leHBvcnRzLmdlbmVyYXRlRXBrID0gZ2VuZXJhdGVFcGs7XG5jb25zdCBlY2RoQWxsb3dlZCA9IChrZXkpID0+IFsnUC0yNTYnLCAnUC0zODQnLCAnUC01MjEnLCAnWDI1NTE5JywgJ1g0NDgnXS5pbmNsdWRlcygoMCwgZ2V0X25hbWVkX2N1cnZlX2pzXzEuZGVmYXVsdCkoa2V5KSk7XG5leHBvcnRzLmVjZGhBbGxvd2VkID0gZWNkaEFsbG93ZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNyeXB0b18xID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IGNoZWNrX2l2X2xlbmd0aF9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9jaGVja19pdl9sZW5ndGguanNcIik7XG5jb25zdCBjaGVja19jZWtfbGVuZ3RoX2pzXzEgPSByZXF1aXJlKFwiLi9jaGVja19jZWtfbGVuZ3RoLmpzXCIpO1xuY29uc3QgYnVmZmVyX3V0aWxzX2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2J1ZmZlcl91dGlscy5qc1wiKTtcbmNvbnN0IGNiY190YWdfanNfMSA9IHJlcXVpcmUoXCIuL2NiY190YWcuanNcIik7XG5jb25zdCB3ZWJjcnlwdG9fanNfMSA9IHJlcXVpcmUoXCIuL3dlYmNyeXB0by5qc1wiKTtcbmNvbnN0IGNyeXB0b19rZXlfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvY3J5cHRvX2tleS5qc1wiKTtcbmNvbnN0IGlzX2tleV9vYmplY3RfanNfMSA9IHJlcXVpcmUoXCIuL2lzX2tleV9vYmplY3QuanNcIik7XG5jb25zdCBpbnZhbGlkX2tleV9pbnB1dF9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4uL3V0aWwvZXJyb3JzLmpzXCIpO1xuY29uc3QgY2lwaGVyc19qc18xID0gcmVxdWlyZShcIi4vY2lwaGVycy5qc1wiKTtcbmNvbnN0IGlzX2tleV9saWtlX2pzXzEgPSByZXF1aXJlKFwiLi9pc19rZXlfbGlrZS5qc1wiKTtcbmZ1bmN0aW9uIGNiY0VuY3J5cHQoZW5jLCBwbGFpbnRleHQsIGNlaywgaXYsIGFhZCkge1xuICAgIGNvbnN0IGtleVNpemUgPSBwYXJzZUludChlbmMuc2xpY2UoMSwgNCksIDEwKTtcbiAgICBpZiAoKDAsIGlzX2tleV9vYmplY3RfanNfMS5kZWZhdWx0KShjZWspKSB7XG4gICAgICAgIGNlayA9IGNlay5leHBvcnQoKTtcbiAgICB9XG4gICAgY29uc3QgZW5jS2V5ID0gY2VrLnN1YmFycmF5KGtleVNpemUgPj4gMyk7XG4gICAgY29uc3QgbWFjS2V5ID0gY2VrLnN1YmFycmF5KDAsIGtleVNpemUgPj4gMyk7XG4gICAgY29uc3QgYWxnb3JpdGhtID0gYGFlcy0ke2tleVNpemV9LWNiY2A7XG4gICAgaWYgKCEoMCwgY2lwaGVyc19qc18xLmRlZmF1bHQpKGFsZ29yaXRobSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoYGFsZyAke2VuY30gaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGphdmFzY3JpcHQgcnVudGltZWApO1xuICAgIH1cbiAgICBjb25zdCBjaXBoZXIgPSAoMCwgY3J5cHRvXzEuY3JlYXRlQ2lwaGVyaXYpKGFsZ29yaXRobSwgZW5jS2V5LCBpdik7XG4gICAgY29uc3QgY2lwaGVydGV4dCA9ICgwLCBidWZmZXJfdXRpbHNfanNfMS5jb25jYXQpKGNpcGhlci51cGRhdGUocGxhaW50ZXh0KSwgY2lwaGVyLmZpbmFsKCkpO1xuICAgIGNvbnN0IG1hY1NpemUgPSBwYXJzZUludChlbmMuc2xpY2UoLTMpLCAxMCk7XG4gICAgY29uc3QgdGFnID0gKDAsIGNiY190YWdfanNfMS5kZWZhdWx0KShhYWQsIGl2LCBjaXBoZXJ0ZXh0LCBtYWNTaXplLCBtYWNLZXksIGtleVNpemUpO1xuICAgIHJldHVybiB7IGNpcGhlcnRleHQsIHRhZyB9O1xufVxuZnVuY3Rpb24gZ2NtRW5jcnlwdChlbmMsIHBsYWludGV4dCwgY2VrLCBpdiwgYWFkKSB7XG4gICAgY29uc3Qga2V5U2l6ZSA9IHBhcnNlSW50KGVuYy5zbGljZSgxLCA0KSwgMTApO1xuICAgIGNvbnN0IGFsZ29yaXRobSA9IGBhZXMtJHtrZXlTaXplfS1nY21gO1xuICAgIGlmICghKDAsIGNpcGhlcnNfanNfMS5kZWZhdWx0KShhbGdvcml0aG0pKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKGBhbGcgJHtlbmN9IGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBqYXZhc2NyaXB0IHJ1bnRpbWVgKTtcbiAgICB9XG4gICAgY29uc3QgY2lwaGVyID0gKDAsIGNyeXB0b18xLmNyZWF0ZUNpcGhlcml2KShhbGdvcml0aG0sIGNlaywgaXYsIHsgYXV0aFRhZ0xlbmd0aDogMTYgfSk7XG4gICAgaWYgKGFhZC5ieXRlTGVuZ3RoKSB7XG4gICAgICAgIGNpcGhlci5zZXRBQUQoYWFkLCB7IHBsYWludGV4dExlbmd0aDogcGxhaW50ZXh0Lmxlbmd0aCB9KTtcbiAgICB9XG4gICAgY29uc3QgY2lwaGVydGV4dCA9IGNpcGhlci51cGRhdGUocGxhaW50ZXh0KTtcbiAgICBjaXBoZXIuZmluYWwoKTtcbiAgICBjb25zdCB0YWcgPSBjaXBoZXIuZ2V0QXV0aFRhZygpO1xuICAgIHJldHVybiB7IGNpcGhlcnRleHQsIHRhZyB9O1xufVxuY29uc3QgZW5jcnlwdCA9IChlbmMsIHBsYWludGV4dCwgY2VrLCBpdiwgYWFkKSA9PiB7XG4gICAgbGV0IGtleTtcbiAgICBpZiAoKDAsIHdlYmNyeXB0b19qc18xLmlzQ3J5cHRvS2V5KShjZWspKSB7XG4gICAgICAgICgwLCBjcnlwdG9fa2V5X2pzXzEuY2hlY2tFbmNDcnlwdG9LZXkpKGNlaywgZW5jLCAnZW5jcnlwdCcpO1xuICAgICAgICBrZXkgPSBjcnlwdG9fMS5LZXlPYmplY3QuZnJvbShjZWspO1xuICAgIH1cbiAgICBlbHNlIGlmIChjZWsgaW5zdGFuY2VvZiBVaW50OEFycmF5IHx8ICgwLCBpc19rZXlfb2JqZWN0X2pzXzEuZGVmYXVsdCkoY2VrKSkge1xuICAgICAgICBrZXkgPSBjZWs7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCgwLCBpbnZhbGlkX2tleV9pbnB1dF9qc18xLmRlZmF1bHQpKGNlaywgLi4uaXNfa2V5X2xpa2VfanNfMS50eXBlcywgJ1VpbnQ4QXJyYXknKSk7XG4gICAgfVxuICAgICgwLCBjaGVja19jZWtfbGVuZ3RoX2pzXzEuZGVmYXVsdCkoZW5jLCBrZXkpO1xuICAgICgwLCBjaGVja19pdl9sZW5ndGhfanNfMS5kZWZhdWx0KShlbmMsIGl2KTtcbiAgICBzd2l0Y2ggKGVuYykge1xuICAgICAgICBjYXNlICdBMTI4Q0JDLUhTMjU2JzpcbiAgICAgICAgY2FzZSAnQTE5MkNCQy1IUzM4NCc6XG4gICAgICAgIGNhc2UgJ0EyNTZDQkMtSFM1MTInOlxuICAgICAgICAgICAgcmV0dXJuIGNiY0VuY3J5cHQoZW5jLCBwbGFpbnRleHQsIGtleSwgaXYsIGFhZCk7XG4gICAgICAgIGNhc2UgJ0ExMjhHQ00nOlxuICAgICAgICBjYXNlICdBMTkyR0NNJzpcbiAgICAgICAgY2FzZSAnQTI1NkdDTSc6XG4gICAgICAgICAgICByZXR1cm4gZ2NtRW5jcnlwdChlbmMsIHBsYWludGV4dCwga2V5LCBpdiwgYWFkKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKCdVbnN1cHBvcnRlZCBKV0UgQ29udGVudCBFbmNyeXB0aW9uIEFsZ29yaXRobScpO1xuICAgIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBlbmNyeXB0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzTm9kZUpzID0gZXhwb3J0cy5pc0Nsb3VkZmxhcmVXb3JrZXJzID0gdm9pZCAwO1xuZnVuY3Rpb24gaXNDbG91ZGZsYXJlV29ya2VycygpIHtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLmlzQ2xvdWRmbGFyZVdvcmtlcnMgPSBpc0Nsb3VkZmxhcmVXb3JrZXJzO1xuZnVuY3Rpb24gaXNOb2RlSnMoKSB7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLmlzTm9kZUpzID0gaXNOb2RlSnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xuY29uc3QgZXZlbnRzXzEgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBidWZmZXJfdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvYnVmZmVyX3V0aWxzLmpzXCIpO1xuY29uc3QgZmV0Y2hKd2tzID0gYXN5bmMgKHVybCwgdGltZW91dCwgb3B0aW9ucykgPT4ge1xuICAgIGxldCBnZXQ7XG4gICAgc3dpdGNoICh1cmwucHJvdG9jb2wpIHtcbiAgICAgICAgY2FzZSAnaHR0cHM6JzpcbiAgICAgICAgICAgIGdldCA9IGh0dHBzLmdldDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdodHRwOic6XG4gICAgICAgICAgICBnZXQgPSBodHRwLmdldDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5zdXBwb3J0ZWQgVVJMIHByb3RvY29sLicpO1xuICAgIH1cbiAgICBjb25zdCB7IGFnZW50LCBoZWFkZXJzIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHJlcSA9IGdldCh1cmwuaHJlZiwge1xuICAgICAgICBhZ2VudCxcbiAgICAgICAgdGltZW91dCxcbiAgICAgICAgaGVhZGVycyxcbiAgICB9KTtcbiAgICBjb25zdCBbcmVzcG9uc2VdID0gKGF3YWl0IFByb21pc2UucmFjZShbKDAsIGV2ZW50c18xLm9uY2UpKHJlcSwgJ3Jlc3BvbnNlJyksICgwLCBldmVudHNfMS5vbmNlKShyZXEsICd0aW1lb3V0JyldKSk7XG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICByZXEuZGVzdHJveSgpO1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldLU1RpbWVvdXQoKTtcbiAgICB9XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRUVycm9yKCdFeHBlY3RlZCAyMDAgT0sgZnJvbSB0aGUgSlNPTiBXZWIgS2V5IFNldCBIVFRQIHJlc3BvbnNlJyk7XG4gICAgfVxuICAgIGNvbnN0IHBhcnRzID0gW107XG4gICAgZm9yIGF3YWl0IChjb25zdCBwYXJ0IG9mIHJlc3BvbnNlKSB7XG4gICAgICAgIHBhcnRzLnB1c2gocGFydCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGJ1ZmZlcl91dGlsc19qc18xLmRlY29kZXIuZGVjb2RlKCgwLCBidWZmZXJfdXRpbHNfanNfMS5jb25jYXQpKC4uLnBhcnRzKSkpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFRXJyb3IoJ0ZhaWxlZCB0byBwYXJzZSB0aGUgSlNPTiBXZWIgS2V5IFNldCBIVFRQIHJlc3BvbnNlIGFzIEpTT04nKTtcbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZmV0Y2hKd2tzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlS2V5UGFpciA9IGV4cG9ydHMuZ2VuZXJhdGVTZWNyZXQgPSB2b2lkIDA7XG5jb25zdCBjcnlwdG9fMSA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwidXRpbFwiKTtcbmNvbnN0IHJhbmRvbV9qc18xID0gcmVxdWlyZShcIi4vcmFuZG9tLmpzXCIpO1xuY29uc3QgY2hlY2tfbW9kdWx1c19sZW5ndGhfanNfMSA9IHJlcXVpcmUoXCIuL2NoZWNrX21vZHVsdXNfbGVuZ3RoLmpzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBnZW5lcmF0ZSA9ICgwLCB1dGlsXzEucHJvbWlzaWZ5KShjcnlwdG9fMS5nZW5lcmF0ZUtleVBhaXIpO1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVTZWNyZXQoYWxnLCBvcHRpb25zKSB7XG4gICAgbGV0IGxlbmd0aDtcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdIUzI1Nic6XG4gICAgICAgIGNhc2UgJ0hTMzg0JzpcbiAgICAgICAgY2FzZSAnSFM1MTInOlxuICAgICAgICBjYXNlICdBMTI4Q0JDLUhTMjU2JzpcbiAgICAgICAgY2FzZSAnQTE5MkNCQy1IUzM4NCc6XG4gICAgICAgIGNhc2UgJ0EyNTZDQkMtSFM1MTInOlxuICAgICAgICAgICAgbGVuZ3RoID0gcGFyc2VJbnQoYWxnLnNsaWNlKC0zKSwgMTApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0ExMjhLVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ0EyNTZLVyc6XG4gICAgICAgIGNhc2UgJ0ExMjhHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0ExOTJHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0EyNTZHQ01LVyc6XG4gICAgICAgIGNhc2UgJ0ExMjhHQ00nOlxuICAgICAgICBjYXNlICdBMTkyR0NNJzpcbiAgICAgICAgY2FzZSAnQTI1NkdDTSc6XG4gICAgICAgICAgICBsZW5ndGggPSBwYXJzZUludChhbGcuc2xpY2UoMSwgNCksIDEwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiYWxnXCIgKEFsZ29yaXRobSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxuICAgIHJldHVybiAoMCwgY3J5cHRvXzEuY3JlYXRlU2VjcmV0S2V5KSgoMCwgcmFuZG9tX2pzXzEuZGVmYXVsdCkobmV3IFVpbnQ4QXJyYXkobGVuZ3RoID4+IDMpKSk7XG59XG5leHBvcnRzLmdlbmVyYXRlU2VjcmV0ID0gZ2VuZXJhdGVTZWNyZXQ7XG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleVBhaXIoYWxnLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdSUzI1Nic6XG4gICAgICAgIGNhc2UgJ1JTMzg0JzpcbiAgICAgICAgY2FzZSAnUlM1MTInOlxuICAgICAgICBjYXNlICdQUzI1Nic6XG4gICAgICAgIGNhc2UgJ1BTMzg0JzpcbiAgICAgICAgY2FzZSAnUFM1MTInOlxuICAgICAgICBjYXNlICdSU0EtT0FFUCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTI1Nic6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTM4NCc6XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQLTUxMic6XG4gICAgICAgIGNhc2UgJ1JTQTFfNSc6IHtcbiAgICAgICAgICAgIGNvbnN0IG1vZHVsdXNMZW5ndGggPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubW9kdWx1c0xlbmd0aCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMjA0ODtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbW9kdWx1c0xlbmd0aCAhPT0gJ251bWJlcicgfHwgbW9kdWx1c0xlbmd0aCA8IDIwNDgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnSW52YWxpZCBvciB1bnN1cHBvcnRlZCBtb2R1bHVzTGVuZ3RoIG9wdGlvbiBwcm92aWRlZCwgMjA0OCBiaXRzIG9yIGxhcmdlciBrZXlzIG11c3QgYmUgdXNlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qga2V5cGFpciA9IGF3YWl0IGdlbmVyYXRlKCdyc2EnLCB7XG4gICAgICAgICAgICAgICAgbW9kdWx1c0xlbmd0aCxcbiAgICAgICAgICAgICAgICBwdWJsaWNFeHBvbmVudDogMHgxMDAwMSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgKDAsIGNoZWNrX21vZHVsdXNfbGVuZ3RoX2pzXzEuc2V0TW9kdWx1c0xlbmd0aCkoa2V5cGFpci5wcml2YXRlS2V5LCBtb2R1bHVzTGVuZ3RoKTtcbiAgICAgICAgICAgICgwLCBjaGVja19tb2R1bHVzX2xlbmd0aF9qc18xLnNldE1vZHVsdXNMZW5ndGgpKGtleXBhaXIucHVibGljS2V5LCBtb2R1bHVzTGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiBrZXlwYWlyO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZSgnZWMnLCB7IG5hbWVkQ3VydmU6ICdQLTI1NicgfSk7XG4gICAgICAgIGNhc2UgJ0VTMjU2Syc6XG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGUoJ2VjJywgeyBuYW1lZEN1cnZlOiAnc2VjcDI1NmsxJyB9KTtcbiAgICAgICAgY2FzZSAnRVMzODQnOlxuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKCdlYycsIHsgbmFtZWRDdXJ2ZTogJ1AtMzg0JyB9KTtcbiAgICAgICAgY2FzZSAnRVM1MTInOlxuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKCdlYycsIHsgbmFtZWRDdXJ2ZTogJ1AtNTIxJyB9KTtcbiAgICAgICAgY2FzZSAnRWREU0EnOiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcnYpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgICAgICAgICBjYXNlICdFZDI1NTE5JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKCdlZDI1NTE5Jyk7XG4gICAgICAgICAgICAgICAgY2FzZSAnRWQ0NDgnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGUoJ2VkNDQ4Jyk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgY3J2IG9wdGlvbiBwcm92aWRlZCwgc3VwcG9ydGVkIHZhbHVlcyBhcmUgRWQyNTUxOSBhbmQgRWQ0NDgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXNlICdFQ0RILUVTJzpcbiAgICAgICAgY2FzZSAnRUNESC1FUytBMTI4S1cnOlxuICAgICAgICBjYXNlICdFQ0RILUVTK0ExOTJLVyc6XG4gICAgICAgIGNhc2UgJ0VDREgtRVMrQTI1NktXJzpcbiAgICAgICAgICAgIGNvbnN0IGNydiA9IChfYiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcnYpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICdQLTI1Nic7XG4gICAgICAgICAgICBzd2l0Y2ggKGNydikge1xuICAgICAgICAgICAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1AtMjU2JzpcbiAgICAgICAgICAgICAgICBjYXNlICdQLTM4NCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnUC01MjEnOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGUoJ2VjJywgeyBuYW1lZEN1cnZlOiBjcnYgfSk7XG4gICAgICAgICAgICAgICAgY2FzZSAnWDI1NTE5JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKCd4MjU1MTknKTtcbiAgICAgICAgICAgICAgICBjYXNlICdYNDQ4JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlKCd4NDQ4Jyk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgY3J2IG9wdGlvbiBwcm92aWRlZCwgc3VwcG9ydGVkIHZhbHVlcyBhcmUgUC0yNTYsIFAtMzg0LCBQLTUyMSwgWDI1NTE5LCBhbmQgWDQ0OCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ0ludmFsaWQgb3IgdW5zdXBwb3J0ZWQgSldLIFwiYWxnXCIgKEFsZ29yaXRobSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxufVxuZXhwb3J0cy5nZW5lcmF0ZUtleVBhaXIgPSBnZW5lcmF0ZUtleVBhaXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc2V0Q3VydmUgPSBleHBvcnRzLndlYWtNYXAgPSB2b2lkIDA7XG5jb25zdCBidWZmZXJfMSA9IHJlcXVpcmUoXCJidWZmZXJcIik7XG5jb25zdCBjcnlwdG9fMSA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IHdlYmNyeXB0b19qc18xID0gcmVxdWlyZShcIi4vd2ViY3J5cHRvLmpzXCIpO1xuY29uc3QgaXNfa2V5X29iamVjdF9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X29iamVjdC5qc1wiKTtcbmNvbnN0IGludmFsaWRfa2V5X2lucHV0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzXCIpO1xuY29uc3QgaXNfa2V5X2xpa2VfanNfMSA9IHJlcXVpcmUoXCIuL2lzX2tleV9saWtlLmpzXCIpO1xuY29uc3QgcDI1NiA9IGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKFs0MiwgMTM0LCA3MiwgMjA2LCA2MSwgMywgMSwgN10pO1xuY29uc3QgcDM4NCA9IGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKFs0MywgMTI5LCA0LCAwLCAzNF0pO1xuY29uc3QgcDUyMSA9IGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKFs0MywgMTI5LCA0LCAwLCAzNV0pO1xuY29uc3Qgc2VjcDI1NmsxID0gYnVmZmVyXzEuQnVmZmVyLmZyb20oWzQzLCAxMjksIDQsIDAsIDEwXSk7XG5leHBvcnRzLndlYWtNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgbmFtZWRDdXJ2ZVRvSk9TRSA9IChuYW1lZEN1cnZlKSA9PiB7XG4gICAgc3dpdGNoIChuYW1lZEN1cnZlKSB7XG4gICAgICAgIGNhc2UgJ3ByaW1lMjU2djEnOlxuICAgICAgICAgICAgcmV0dXJuICdQLTI1Nic7XG4gICAgICAgIGNhc2UgJ3NlY3AzODRyMSc6XG4gICAgICAgICAgICByZXR1cm4gJ1AtMzg0JztcbiAgICAgICAgY2FzZSAnc2VjcDUyMXIxJzpcbiAgICAgICAgICAgIHJldHVybiAnUC01MjEnO1xuICAgICAgICBjYXNlICdzZWNwMjU2azEnOlxuICAgICAgICAgICAgcmV0dXJuICdzZWNwMjU2azEnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ1Vuc3VwcG9ydGVkIGtleSBjdXJ2ZSBmb3IgdGhpcyBvcGVyYXRpb24nKTtcbiAgICB9XG59O1xuY29uc3QgZ2V0TmFtZWRDdXJ2ZSA9IChrZWUsIHJhdykgPT4ge1xuICAgIHZhciBfYTtcbiAgICBsZXQga2V5O1xuICAgIGlmICgoMCwgd2ViY3J5cHRvX2pzXzEuaXNDcnlwdG9LZXkpKGtlZSkpIHtcbiAgICAgICAga2V5ID0gY3J5cHRvXzEuS2V5T2JqZWN0LmZyb20oa2VlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKDAsIGlzX2tleV9vYmplY3RfanNfMS5kZWZhdWx0KShrZWUpKSB7XG4gICAgICAgIGtleSA9IGtlZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKDAsIGludmFsaWRfa2V5X2lucHV0X2pzXzEuZGVmYXVsdCkoa2VlLCAuLi5pc19rZXlfbGlrZV9qc18xLnR5cGVzKSk7XG4gICAgfVxuICAgIGlmIChrZXkudHlwZSA9PT0gJ3NlY3JldCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb25seSBcInByaXZhdGVcIiBvciBcInB1YmxpY1wiIHR5cGUga2V5cyBjYW4gYmUgdXNlZCBmb3IgdGhpcyBvcGVyYXRpb24nKTtcbiAgICB9XG4gICAgc3dpdGNoIChrZXkuYXN5bW1ldHJpY0tleVR5cGUpIHtcbiAgICAgICAgY2FzZSAnZWQyNTUxOSc6XG4gICAgICAgIGNhc2UgJ2VkNDQ4JzpcbiAgICAgICAgICAgIHJldHVybiBgRWQke2tleS5hc3ltbWV0cmljS2V5VHlwZS5zbGljZSgyKX1gO1xuICAgICAgICBjYXNlICd4MjU1MTknOlxuICAgICAgICBjYXNlICd4NDQ4JzpcbiAgICAgICAgICAgIHJldHVybiBgWCR7a2V5LmFzeW1tZXRyaWNLZXlUeXBlLnNsaWNlKDEpfWA7XG4gICAgICAgIGNhc2UgJ2VjJzoge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMud2Vha01hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHBvcnRzLndlYWtNYXAuZ2V0KGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmFtZWRDdXJ2ZSA9IChfYSA9IGtleS5hc3ltbWV0cmljS2V5RGV0YWlscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWVkQ3VydmU7XG4gICAgICAgICAgICBpZiAoIW5hbWVkQ3VydmUgJiYga2V5LnR5cGUgPT09ICdwcml2YXRlJykge1xuICAgICAgICAgICAgICAgIG5hbWVkQ3VydmUgPSBnZXROYW1lZEN1cnZlKCgwLCBjcnlwdG9fMS5jcmVhdGVQdWJsaWNLZXkpKGtleSksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIW5hbWVkQ3VydmUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBidWYgPSBrZXkuZXhwb3J0KHsgZm9ybWF0OiAnZGVyJywgdHlwZTogJ3Nwa2knIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBidWZbMV0gPCAxMjggPyAxNCA6IDE1O1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IGJ1ZltpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJ2ZU9pZCA9IGJ1Zi5zbGljZShpICsgMSwgaSArIDEgKyBsZW4pO1xuICAgICAgICAgICAgICAgIGlmIChjdXJ2ZU9pZC5lcXVhbHMocDI1NikpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZWRDdXJ2ZSA9ICdwcmltZTI1NnYxJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VydmVPaWQuZXF1YWxzKHAzODQpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVkQ3VydmUgPSAnc2VjcDM4NHIxJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VydmVPaWQuZXF1YWxzKHA1MjEpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVkQ3VydmUgPSAnc2VjcDUyMXIxJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VydmVPaWQuZXF1YWxzKHNlY3AyNTZrMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZWRDdXJ2ZSA9ICdzZWNwMjU2azEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpPU0VOb3RTdXBwb3J0ZWQoJ1Vuc3VwcG9ydGVkIGtleSBjdXJ2ZSBmb3IgdGhpcyBvcGVyYXRpb24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmF3KVxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lZEN1cnZlO1xuICAgICAgICAgICAgY29uc3QgY3VydmUgPSBuYW1lZEN1cnZlVG9KT1NFKG5hbWVkQ3VydmUpO1xuICAgICAgICAgICAgZXhwb3J0cy53ZWFrTWFwLnNldChrZXksIGN1cnZlKTtcbiAgICAgICAgICAgIHJldHVybiBjdXJ2ZTtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhc3ltbWV0cmljIGtleSB0eXBlIGZvciB0aGlzIG9wZXJhdGlvbicpO1xuICAgIH1cbn07XG5mdW5jdGlvbiBzZXRDdXJ2ZShrZXlPYmplY3QsIGN1cnZlKSB7XG4gICAgZXhwb3J0cy53ZWFrTWFwLnNldChrZXlPYmplY3QsIGN1cnZlKTtcbn1cbmV4cG9ydHMuc2V0Q3VydmUgPSBzZXRDdXJ2ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdldE5hbWVkQ3VydmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNyeXB0b18xID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IHdlYmNyeXB0b19qc18xID0gcmVxdWlyZShcIi4vd2ViY3J5cHRvLmpzXCIpO1xuY29uc3QgY3J5cHRvX2tleV9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9jcnlwdG9fa2V5LmpzXCIpO1xuY29uc3QgaW52YWxpZF9rZXlfaW5wdXRfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvaW52YWxpZF9rZXlfaW5wdXQuanNcIik7XG5jb25zdCBpc19rZXlfbGlrZV9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X2xpa2UuanNcIik7XG5mdW5jdGlvbiBnZXRTaWduVmVyaWZ5S2V5KGFsZywga2V5LCB1c2FnZSkge1xuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIGlmICghYWxnLnN0YXJ0c1dpdGgoJ0hTJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKDAsIGludmFsaWRfa2V5X2lucHV0X2pzXzEuZGVmYXVsdCkoa2V5LCAuLi5pc19rZXlfbGlrZV9qc18xLnR5cGVzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgwLCBjcnlwdG9fMS5jcmVhdGVTZWNyZXRLZXkpKGtleSk7XG4gICAgfVxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBjcnlwdG9fMS5LZXlPYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgaWYgKCgwLCB3ZWJjcnlwdG9fanNfMS5pc0NyeXB0b0tleSkoa2V5KSkge1xuICAgICAgICAoMCwgY3J5cHRvX2tleV9qc18xLmNoZWNrU2lnQ3J5cHRvS2V5KShrZXksIGFsZywgdXNhZ2UpO1xuICAgICAgICByZXR1cm4gY3J5cHRvXzEuS2V5T2JqZWN0LmZyb20oa2V5KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigoMCwgaW52YWxpZF9rZXlfaW5wdXRfanNfMS5kZWZhdWx0KShrZXksIC4uLmlzX2tleV9saWtlX2pzXzEudHlwZXMsICdVaW50OEFycmF5JykpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gZ2V0U2lnblZlcmlmeUtleTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5mdW5jdGlvbiBobWFjRGlnZXN0KGFsZykge1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ0hTMjU2JzpcbiAgICAgICAgICAgIHJldHVybiAnc2hhMjU2JztcbiAgICAgICAgY2FzZSAnSFMzODQnOlxuICAgICAgICAgICAgcmV0dXJuICdzaGEzODQnO1xuICAgICAgICBjYXNlICdIUzUxMic6XG4gICAgICAgICAgICByZXR1cm4gJ3NoYTUxMic7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZChgYWxnICR7YWxnfSBpcyBub3Qgc3VwcG9ydGVkIGVpdGhlciBieSBKT1NFIG9yIHlvdXIgamF2YXNjcmlwdCBydW50aW1lYCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gaG1hY0RpZ2VzdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy50eXBlcyA9IHZvaWQgMDtcbmNvbnN0IHdlYmNyeXB0b19qc18xID0gcmVxdWlyZShcIi4vd2ViY3J5cHRvLmpzXCIpO1xuY29uc3QgaXNfa2V5X29iamVjdF9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X29iamVjdC5qc1wiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IChrZXkpID0+ICgwLCBpc19rZXlfb2JqZWN0X2pzXzEuZGVmYXVsdCkoa2V5KSB8fCAoMCwgd2ViY3J5cHRvX2pzXzEuaXNDcnlwdG9LZXkpKGtleSk7XG5jb25zdCB0eXBlcyA9IFsnS2V5T2JqZWN0J107XG5leHBvcnRzLnR5cGVzID0gdHlwZXM7XG5pZiAocGFyc2VJbnQocHJvY2Vzcy52ZXJzaW9ucy5ub2RlKSA+PSAxNikge1xuICAgIHR5cGVzLnB1c2goJ0NyeXB0b0tleScpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjcnlwdG9fMSA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCB1dGlsID0gcmVxdWlyZShcInV0aWxcIik7XG5leHBvcnRzLmRlZmF1bHQgPSB1dGlsLnR5cGVzLmlzS2V5T2JqZWN0XG4gICAgPyAob2JqKSA9PiB1dGlsLnR5cGVzLmlzS2V5T2JqZWN0KG9iailcbiAgICA6IChvYmopID0+IG9iaiAhPSBudWxsICYmIG9iaiBpbnN0YW5jZW9mIGNyeXB0b18xLktleU9iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYnVmZmVyXzEgPSByZXF1aXJlKFwiYnVmZmVyXCIpO1xuY29uc3QgY3J5cHRvXzEgPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgYmFzZTY0dXJsX2pzXzEgPSByZXF1aXJlKFwiLi9iYXNlNjR1cmwuanNcIik7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IGdldF9uYW1lZF9jdXJ2ZV9qc18xID0gcmVxdWlyZShcIi4vZ2V0X25hbWVkX2N1cnZlLmpzXCIpO1xuY29uc3QgY2hlY2tfbW9kdWx1c19sZW5ndGhfanNfMSA9IHJlcXVpcmUoXCIuL2NoZWNrX21vZHVsdXNfbGVuZ3RoLmpzXCIpO1xuY29uc3QgYXNuMV9zZXF1ZW5jZV9lbmNvZGVyX2pzXzEgPSByZXF1aXJlKFwiLi9hc24xX3NlcXVlbmNlX2VuY29kZXIuanNcIik7XG5jb25zdCBbbWFqb3IsIG1pbm9yXSA9IHByb2Nlc3MudmVyc2lvblxuICAgIC5zbGljZSgxKVxuICAgIC5zcGxpdCgnLicpXG4gICAgLm1hcCgoc3RyKSA9PiBwYXJzZUludChzdHIsIDEwKSk7XG5jb25zdCBqd2tJbXBvcnRTdXBwb3J0ZWQgPSBtYWpvciA+PSAxNiB8fCAobWFqb3IgPT09IDE1ICYmIG1pbm9yID49IDEyKTtcbmNvbnN0IHBhcnNlID0gKGp3aykgPT4ge1xuICAgIGlmIChqd2tJbXBvcnRTdXBwb3J0ZWQgJiYgandrLmt0eSAhPT0gJ29jdCcpIHtcbiAgICAgICAgcmV0dXJuIGp3ay5kXG4gICAgICAgICAgICA/ICgwLCBjcnlwdG9fMS5jcmVhdGVQcml2YXRlS2V5KSh7IGZvcm1hdDogJ2p3aycsIGtleTogandrIH0pXG4gICAgICAgICAgICA6ICgwLCBjcnlwdG9fMS5jcmVhdGVQdWJsaWNLZXkpKHsgZm9ybWF0OiAnandrJywga2V5OiBqd2sgfSk7XG4gICAgfVxuICAgIHN3aXRjaCAoandrLmt0eSkge1xuICAgICAgICBjYXNlICdvY3QnOiB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNyeXB0b18xLmNyZWF0ZVNlY3JldEtleSkoKDAsIGJhc2U2NHVybF9qc18xLmRlY29kZSkoandrLmspKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdSU0EnOiB7XG4gICAgICAgICAgICBjb25zdCBlbmMgPSBuZXcgYXNuMV9zZXF1ZW5jZV9lbmNvZGVyX2pzXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgaXNQcml2YXRlID0gandrLmQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IG1vZHVsdXMgPSBidWZmZXJfMS5CdWZmZXIuZnJvbShqd2subiwgJ2Jhc2U2NCcpO1xuICAgICAgICAgICAgY29uc3QgZXhwb25lbnQgPSBidWZmZXJfMS5CdWZmZXIuZnJvbShqd2suZSwgJ2Jhc2U2NCcpO1xuICAgICAgICAgICAgaWYgKGlzUHJpdmF0ZSkge1xuICAgICAgICAgICAgICAgIGVuYy56ZXJvKCk7XG4gICAgICAgICAgICAgICAgZW5jLnVuc2lnbmVkSW50ZWdlcihtb2R1bHVzKTtcbiAgICAgICAgICAgICAgICBlbmMudW5zaWduZWRJbnRlZ2VyKGV4cG9uZW50KTtcbiAgICAgICAgICAgICAgICBlbmMudW5zaWduZWRJbnRlZ2VyKGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKGp3ay5kLCAnYmFzZTY0JykpO1xuICAgICAgICAgICAgICAgIGVuYy51bnNpZ25lZEludGVnZXIoYnVmZmVyXzEuQnVmZmVyLmZyb20oandrLnAsICdiYXNlNjQnKSk7XG4gICAgICAgICAgICAgICAgZW5jLnVuc2lnbmVkSW50ZWdlcihidWZmZXJfMS5CdWZmZXIuZnJvbShqd2sucSwgJ2Jhc2U2NCcpKTtcbiAgICAgICAgICAgICAgICBlbmMudW5zaWduZWRJbnRlZ2VyKGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKGp3ay5kcCwgJ2Jhc2U2NCcpKTtcbiAgICAgICAgICAgICAgICBlbmMudW5zaWduZWRJbnRlZ2VyKGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKGp3ay5kcSwgJ2Jhc2U2NCcpKTtcbiAgICAgICAgICAgICAgICBlbmMudW5zaWduZWRJbnRlZ2VyKGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKGp3ay5xaSwgJ2Jhc2U2NCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuYy51bnNpZ25lZEludGVnZXIobW9kdWx1cyk7XG4gICAgICAgICAgICAgICAgZW5jLnVuc2lnbmVkSW50ZWdlcihleHBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkZXIgPSBlbmMuZW5kKCk7XG4gICAgICAgICAgICBjb25zdCBjcmVhdGVJbnB1dCA9IHtcbiAgICAgICAgICAgICAgICBrZXk6IGRlcixcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICdkZXInLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwa2NzMScsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3Qga2V5T2JqZWN0ID0gaXNQcml2YXRlID8gKDAsIGNyeXB0b18xLmNyZWF0ZVByaXZhdGVLZXkpKGNyZWF0ZUlucHV0KSA6ICgwLCBjcnlwdG9fMS5jcmVhdGVQdWJsaWNLZXkpKGNyZWF0ZUlucHV0KTtcbiAgICAgICAgICAgICgwLCBjaGVja19tb2R1bHVzX2xlbmd0aF9qc18xLnNldE1vZHVsdXNMZW5ndGgpKGtleU9iamVjdCwgbW9kdWx1cy5sZW5ndGggPDwgMyk7XG4gICAgICAgICAgICByZXR1cm4ga2V5T2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ0VDJzoge1xuICAgICAgICAgICAgY29uc3QgZW5jID0gbmV3IGFzbjFfc2VxdWVuY2VfZW5jb2Rlcl9qc18xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGlzUHJpdmF0ZSA9IGp3ay5kICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBwdWIgPSBidWZmZXJfMS5CdWZmZXIuY29uY2F0KFtcbiAgICAgICAgICAgICAgICBidWZmZXJfMS5CdWZmZXIuYWxsb2MoMSwgNCksXG4gICAgICAgICAgICAgICAgYnVmZmVyXzEuQnVmZmVyLmZyb20oandrLngsICdiYXNlNjQnKSxcbiAgICAgICAgICAgICAgICBidWZmZXJfMS5CdWZmZXIuZnJvbShqd2sueSwgJ2Jhc2U2NCcpLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBpZiAoaXNQcml2YXRlKSB7XG4gICAgICAgICAgICAgICAgZW5jLnplcm8oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmMkMSA9IG5ldyBhc24xX3NlcXVlbmNlX2VuY29kZXJfanNfMS5kZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZW5jJDEub2lkRm9yKCdlY1B1YmxpY0tleScpO1xuICAgICAgICAgICAgICAgIGVuYyQxLm9pZEZvcihqd2suY3J2KTtcbiAgICAgICAgICAgICAgICBlbmMuYWRkKGVuYyQxLmVuZCgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmMkMiA9IG5ldyBhc24xX3NlcXVlbmNlX2VuY29kZXJfanNfMS5kZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZW5jJDIub25lKCk7XG4gICAgICAgICAgICAgICAgZW5jJDIub2N0U3RyKGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKGp3ay5kLCAnYmFzZTY0JykpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuYyQzID0gbmV3IGFzbjFfc2VxdWVuY2VfZW5jb2Rlcl9qc18xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbmMkMy5iaXRTdHIocHViKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmMiA9IGVuYyQzLmVuZChidWZmZXJfMS5CdWZmZXIuZnJvbShbMHhhMV0pKTtcbiAgICAgICAgICAgICAgICBlbmMkMi5hZGQoZjIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGYgPSBlbmMkMi5lbmQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmMkNCA9IG5ldyBhc24xX3NlcXVlbmNlX2VuY29kZXJfanNfMS5kZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZW5jJDQuYWRkKGYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGYzID0gZW5jJDQuZW5kKGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKFsweDA0XSkpO1xuICAgICAgICAgICAgICAgIGVuYy5hZGQoZjMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlciA9IGVuYy5lbmQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlPYmplY3QgPSAoMCwgY3J5cHRvXzEuY3JlYXRlUHJpdmF0ZUtleSkoeyBrZXk6IGRlciwgZm9ybWF0OiAnZGVyJywgdHlwZTogJ3BrY3M4JyB9KTtcbiAgICAgICAgICAgICAgICAoMCwgZ2V0X25hbWVkX2N1cnZlX2pzXzEuc2V0Q3VydmUpKGtleU9iamVjdCwgandrLmNydik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleU9iamVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVuYyQxID0gbmV3IGFzbjFfc2VxdWVuY2VfZW5jb2Rlcl9qc18xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIGVuYyQxLm9pZEZvcignZWNQdWJsaWNLZXknKTtcbiAgICAgICAgICAgIGVuYyQxLm9pZEZvcihqd2suY3J2KTtcbiAgICAgICAgICAgIGVuYy5hZGQoZW5jJDEuZW5kKCkpO1xuICAgICAgICAgICAgZW5jLmJpdFN0cihwdWIpO1xuICAgICAgICAgICAgY29uc3QgZGVyID0gZW5jLmVuZCgpO1xuICAgICAgICAgICAgY29uc3Qga2V5T2JqZWN0ID0gKDAsIGNyeXB0b18xLmNyZWF0ZVB1YmxpY0tleSkoeyBrZXk6IGRlciwgZm9ybWF0OiAnZGVyJywgdHlwZTogJ3Nwa2knIH0pO1xuICAgICAgICAgICAgKDAsIGdldF9uYW1lZF9jdXJ2ZV9qc18xLnNldEN1cnZlKShrZXlPYmplY3QsIGp3ay5jcnYpO1xuICAgICAgICAgICAgcmV0dXJuIGtleU9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdPS1AnOiB7XG4gICAgICAgICAgICBjb25zdCBlbmMgPSBuZXcgYXNuMV9zZXF1ZW5jZV9lbmNvZGVyX2pzXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgaXNQcml2YXRlID0gandrLmQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChpc1ByaXZhdGUpIHtcbiAgICAgICAgICAgICAgICBlbmMuemVybygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuYyQxID0gbmV3IGFzbjFfc2VxdWVuY2VfZW5jb2Rlcl9qc18xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbmMkMS5vaWRGb3IoandrLmNydik7XG4gICAgICAgICAgICAgICAgZW5jLmFkZChlbmMkMS5lbmQoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5jJDIgPSBuZXcgYXNuMV9zZXF1ZW5jZV9lbmNvZGVyX2pzXzEuZGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVuYyQyLm9jdFN0cihidWZmZXJfMS5CdWZmZXIuZnJvbShqd2suZCwgJ2Jhc2U2NCcpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmID0gZW5jJDIuZW5kKGJ1ZmZlcl8xLkJ1ZmZlci5mcm9tKFsweDA0XSkpO1xuICAgICAgICAgICAgICAgIGVuYy5hZGQoZik7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVyID0gZW5jLmVuZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY3J5cHRvXzEuY3JlYXRlUHJpdmF0ZUtleSkoeyBrZXk6IGRlciwgZm9ybWF0OiAnZGVyJywgdHlwZTogJ3BrY3M4JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVuYyQxID0gbmV3IGFzbjFfc2VxdWVuY2VfZW5jb2Rlcl9qc18xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIGVuYyQxLm9pZEZvcihqd2suY3J2KTtcbiAgICAgICAgICAgIGVuYy5hZGQoZW5jJDEuZW5kKCkpO1xuICAgICAgICAgICAgZW5jLmJpdFN0cihidWZmZXJfMS5CdWZmZXIuZnJvbShqd2sueCwgJ2Jhc2U2NCcpKTtcbiAgICAgICAgICAgIGNvbnN0IGRlciA9IGVuYy5lbmQoKTtcbiAgICAgICAgICAgIHJldHVybiAoMCwgY3J5cHRvXzEuY3JlYXRlUHVibGljS2V5KSh7IGtleTogZGVyLCBmb3JtYXQ6ICdkZXInLCB0eXBlOiAnc3BraScgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKCdJbnZhbGlkIG9yIHVuc3VwcG9ydGVkIEpXSyBcImt0eVwiIChLZXkgVHlwZSkgUGFyYW1ldGVyIHZhbHVlJyk7XG4gICAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHBhcnNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjcnlwdG9fMSA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCBiYXNlNjR1cmxfanNfMSA9IHJlcXVpcmUoXCIuL2Jhc2U2NHVybC5qc1wiKTtcbmNvbnN0IGFzbjFfc2VxdWVuY2VfZGVjb2Rlcl9qc18xID0gcmVxdWlyZShcIi4vYXNuMV9zZXF1ZW5jZV9kZWNvZGVyLmpzXCIpO1xuY29uc3QgZXJyb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC9lcnJvcnMuanNcIik7XG5jb25zdCBnZXRfbmFtZWRfY3VydmVfanNfMSA9IHJlcXVpcmUoXCIuL2dldF9uYW1lZF9jdXJ2ZS5qc1wiKTtcbmNvbnN0IHdlYmNyeXB0b19qc18xID0gcmVxdWlyZShcIi4vd2ViY3J5cHRvLmpzXCIpO1xuY29uc3QgaXNfa2V5X29iamVjdF9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X29iamVjdC5qc1wiKTtcbmNvbnN0IGludmFsaWRfa2V5X2lucHV0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2ludmFsaWRfa2V5X2lucHV0LmpzXCIpO1xuY29uc3QgaXNfa2V5X2xpa2VfanNfMSA9IHJlcXVpcmUoXCIuL2lzX2tleV9saWtlLmpzXCIpO1xuY29uc3QgW21ham9yLCBtaW5vcl0gPSBwcm9jZXNzLnZlcnNpb25cbiAgICAuc2xpY2UoMSlcbiAgICAuc3BsaXQoJy4nKVxuICAgIC5tYXAoKHN0cikgPT4gcGFyc2VJbnQoc3RyLCAxMCkpO1xuY29uc3QgandrRXhwb3J0U3VwcG9ydGVkID0gbWFqb3IgPj0gMTYgfHwgKG1ham9yID09PSAxNSAmJiBtaW5vciA+PSA5KTtcbmNvbnN0IGtleVRvSldLID0gKGtleSkgPT4ge1xuICAgIGxldCBrZXlPYmplY3Q7XG4gICAgaWYgKCgwLCB3ZWJjcnlwdG9fanNfMS5pc0NyeXB0b0tleSkoa2V5KSkge1xuICAgICAgICBpZiAoIWtleS5leHRyYWN0YWJsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3J5cHRvS2V5IGlzIG5vdCBleHRyYWN0YWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIGtleU9iamVjdCA9IGNyeXB0b18xLktleU9iamVjdC5mcm9tKGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCgwLCBpc19rZXlfb2JqZWN0X2pzXzEuZGVmYXVsdCkoa2V5KSkge1xuICAgICAgICBrZXlPYmplY3QgPSBrZXk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGt0eTogJ29jdCcsXG4gICAgICAgICAgICBrOiAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKShrZXkpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigoMCwgaW52YWxpZF9rZXlfaW5wdXRfanNfMS5kZWZhdWx0KShrZXksIC4uLmlzX2tleV9saWtlX2pzXzEudHlwZXMsICdVaW50OEFycmF5JykpO1xuICAgIH1cbiAgICBpZiAoandrRXhwb3J0U3VwcG9ydGVkKSB7XG4gICAgICAgIHJldHVybiBrZXlPYmplY3QuZXhwb3J0KHsgZm9ybWF0OiAnandrJyB9KTtcbiAgICB9XG4gICAgc3dpdGNoIChrZXlPYmplY3QudHlwZSkge1xuICAgICAgICBjYXNlICdzZWNyZXQnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBrdHk6ICdvY3QnLFxuICAgICAgICAgICAgICAgIGs6ICgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKGtleU9iamVjdC5leHBvcnQoKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICdwcml2YXRlJzpcbiAgICAgICAgY2FzZSAncHVibGljJzoge1xuICAgICAgICAgICAgc3dpdGNoIChrZXlPYmplY3QuYXN5bW1ldHJpY0tleVR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdyc2EnOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlciA9IGtleU9iamVjdC5leHBvcnQoeyBmb3JtYXQ6ICdkZXInLCB0eXBlOiAncGtjczEnIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWMgPSBuZXcgYXNuMV9zZXF1ZW5jZV9kZWNvZGVyX2pzXzEuZGVmYXVsdChkZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5T2JqZWN0LnR5cGUgPT09ICdwcml2YXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVjLnVuc2lnbmVkSW50ZWdlcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG4gPSAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKShkZWMudW5zaWduZWRJbnRlZ2VyKCkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlID0gKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVjLnVuc2lnbmVkSW50ZWdlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGp3aztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleU9iamVjdC50eXBlID09PSAncHJpdmF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGp3ayA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkOiAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKShkZWMudW5zaWduZWRJbnRlZ2VyKCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHA6ICgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKGRlYy51bnNpZ25lZEludGVnZXIoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcTogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVjLnVuc2lnbmVkSW50ZWdlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcDogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVjLnVuc2lnbmVkSW50ZWdlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcTogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVjLnVuc2lnbmVkSW50ZWdlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxaTogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVjLnVuc2lnbmVkSW50ZWdlcigpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGVjLmVuZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrdHk6ICdSU0EnLCBuLCBlLCAuLi5qd2sgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSAnZWMnOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNydiA9ICgwLCBnZXRfbmFtZWRfY3VydmVfanNfMS5kZWZhdWx0KShrZXlPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29ycmVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjcnYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlY3AyNTZrMSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gNjQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMzEgKyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3Rpb24gPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ1AtMjU2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4gPSA2NDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAzNCArIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ycmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnUC0zODQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbiA9IDk2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IDMzICsgMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0aW9uID0gLTM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdQLTUyMSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuID0gMTMyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IDMzICsgMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3JyZWN0aW9uID0gLTM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKCdVbnN1cHBvcnRlZCBjdXJ2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlPYmplY3QudHlwZSA9PT0gJ3B1YmxpYycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlciA9IGtleU9iamVjdC5leHBvcnQoeyB0eXBlOiAnc3BraScsIGZvcm1hdDogJ2RlcicgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0eTogJ0VDJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcnYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVyLnN1YmFycmF5KC1sZW4sIC1sZW4gLyAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVyLnN1YmFycmF5KC1sZW4gLyAyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlciA9IGtleU9iamVjdC5leHBvcnQoeyB0eXBlOiAncGtjczgnLCBmb3JtYXQ6ICdkZXInIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVyLmxlbmd0aCA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGNvcnJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmtleVRvSldLKCgwLCBjcnlwdG9fMS5jcmVhdGVQdWJsaWNLZXkpKGtleU9iamVjdCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZDogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVyLnN1YmFycmF5KG9mZnNldCwgb2Zmc2V0ICsgbGVuIC8gMikpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICdlZDI1NTE5JzpcbiAgICAgICAgICAgICAgICBjYXNlICd4MjU1MTknOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNydiA9ICgwLCBnZXRfbmFtZWRfY3VydmVfanNfMS5kZWZhdWx0KShrZXlPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5T2JqZWN0LnR5cGUgPT09ICdwdWJsaWMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXIgPSBrZXlPYmplY3QuZXhwb3J0KHsgdHlwZTogJ3Nwa2knLCBmb3JtYXQ6ICdkZXInIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdHk6ICdPS1AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNydixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKShkZXIuc3ViYXJyYXkoLTMyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlciA9IGtleU9iamVjdC5leHBvcnQoeyB0eXBlOiAncGtjczgnLCBmb3JtYXQ6ICdkZXInIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4ua2V5VG9KV0soKDAsIGNyeXB0b18xLmNyZWF0ZVB1YmxpY0tleSkoa2V5T2JqZWN0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICBkOiAoMCwgYmFzZTY0dXJsX2pzXzEuZW5jb2RlKShkZXIuc3ViYXJyYXkoLTMyKSksXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgJ2VkNDQ4JzpcbiAgICAgICAgICAgICAgICBjYXNlICd4NDQ4Jzoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjcnYgPSAoMCwgZ2V0X25hbWVkX2N1cnZlX2pzXzEuZGVmYXVsdCkoa2V5T2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleU9iamVjdC50eXBlID09PSAncHVibGljJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVyID0ga2V5T2JqZWN0LmV4cG9ydCh7IHR5cGU6ICdzcGtpJywgZm9ybWF0OiAnZGVyJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga3R5OiAnT0tQJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcnYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVyLnN1YmFycmF5KGNydiA9PT0gJ0VkNDQ4JyA/IC01NyA6IC01NikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXIgPSBrZXlPYmplY3QuZXhwb3J0KHsgdHlwZTogJ3BrY3M4JywgZm9ybWF0OiAnZGVyJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmtleVRvSldLKCgwLCBjcnlwdG9fMS5jcmVhdGVQdWJsaWNLZXkpKGtleU9iamVjdCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZDogKDAsIGJhc2U2NHVybF9qc18xLmVuY29kZSkoZGVyLnN1YmFycmF5KGNydiA9PT0gJ0VkNDQ4JyA/IC01NyA6IC01NikpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSk9TRU5vdFN1cHBvcnRlZCgnVW5zdXBwb3J0ZWQga2V5IGFzeW1tZXRyaWNLZXlUeXBlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKCdVbnN1cHBvcnRlZCBrZXkgdHlwZScpO1xuICAgIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBrZXlUb0pXSztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY3J5cHRvXzEgPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgZ2V0X25hbWVkX2N1cnZlX2pzXzEgPSByZXF1aXJlKFwiLi9nZXRfbmFtZWRfY3VydmUuanNcIik7XG5jb25zdCBlcnJvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsL2Vycm9ycy5qc1wiKTtcbmNvbnN0IGNoZWNrX21vZHVsdXNfbGVuZ3RoX2pzXzEgPSByZXF1aXJlKFwiLi9jaGVja19tb2R1bHVzX2xlbmd0aC5qc1wiKTtcbmNvbnN0IFttYWpvciwgbWlub3JdID0gcHJvY2Vzcy52ZXJzaW9uXG4gICAgLnNsaWNlKDEpXG4gICAgLnNwbGl0KCcuJylcbiAgICAubWFwKChzdHIpID0+IHBhcnNlSW50KHN0ciwgMTApKTtcbmNvbnN0IGVsZWN0cm9uID0gJ2VsZWN0cm9uJyBpbiBwcm9jZXNzLnZlcnNpb25zO1xuY29uc3QgcnNhUHNzUGFyYW1zID0gIWVsZWN0cm9uICYmIChtYWpvciA+PSAxNyB8fCAobWFqb3IgPT09IDE2ICYmIG1pbm9yID49IDkpKTtcbmNvbnN0IFBTUyA9IHtcbiAgICBwYWRkaW5nOiBjcnlwdG9fMS5jb25zdGFudHMuUlNBX1BLQ1MxX1BTU19QQURESU5HLFxuICAgIHNhbHRMZW5ndGg6IGNyeXB0b18xLmNvbnN0YW50cy5SU0FfUFNTX1NBTFRMRU5fRElHRVNULFxufTtcbmNvbnN0IGVjQ3VydmVBbGdNYXAgPSBuZXcgTWFwKFtcbiAgICBbJ0VTMjU2JywgJ1AtMjU2J10sXG4gICAgWydFUzI1NksnLCAnc2VjcDI1NmsxJ10sXG4gICAgWydFUzM4NCcsICdQLTM4NCddLFxuICAgIFsnRVM1MTInLCAnUC01MjEnXSxcbl0pO1xuZnVuY3Rpb24ga2V5Rm9yQ3J5cHRvKGFsZywga2V5KSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnRWREU0EnOlxuICAgICAgICAgICAgaWYgKCFbJ2VkMjU1MTknLCAnZWQ0NDgnXS5pbmNsdWRlcyhrZXkuYXN5bW1ldHJpY0tleVR5cGUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBrZXkgZm9yIHRoaXMgb3BlcmF0aW9uLCBpdHMgYXN5bW1ldHJpY0tleVR5cGUgbXVzdCBiZSBlZDI1NTE5IG9yIGVkNDQ4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICBjYXNlICdSUzI1Nic6XG4gICAgICAgIGNhc2UgJ1JTMzg0JzpcbiAgICAgICAgY2FzZSAnUlM1MTInOlxuICAgICAgICAgICAgaWYgKGtleS5hc3ltbWV0cmljS2V5VHlwZSAhPT0gJ3JzYScpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGtleSBmb3IgdGhpcyBvcGVyYXRpb24sIGl0cyBhc3ltbWV0cmljS2V5VHlwZSBtdXN0IGJlIHJzYScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKDAsIGNoZWNrX21vZHVsdXNfbGVuZ3RoX2pzXzEuZGVmYXVsdCkoa2V5LCBhbGcpO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgY2FzZSByc2FQc3NQYXJhbXMgJiYgJ1BTMjU2JzpcbiAgICAgICAgY2FzZSByc2FQc3NQYXJhbXMgJiYgJ1BTMzg0JzpcbiAgICAgICAgY2FzZSByc2FQc3NQYXJhbXMgJiYgJ1BTNTEyJzpcbiAgICAgICAgICAgIGlmIChrZXkuYXN5bW1ldHJpY0tleVR5cGUgPT09ICdyc2EtcHNzJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgaGFzaEFsZ29yaXRobSwgbWdmMUhhc2hBbGdvcml0aG0sIHNhbHRMZW5ndGggfSA9IGtleS5hc3ltbWV0cmljS2V5RGV0YWlscztcbiAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBwYXJzZUludChhbGcuc2xpY2UoLTMpLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc2hBbGdvcml0aG0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAoaGFzaEFsZ29yaXRobSAhPT0gYHNoYSR7bGVuZ3RofWAgfHwgbWdmMUhhc2hBbGdvcml0aG0gIT09IGhhc2hBbGdvcml0aG0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQga2V5IGZvciB0aGlzIG9wZXJhdGlvbiwgaXRzIFJTQS1QU1MgcGFyYW1ldGVycyBkbyBub3QgbWVldCB0aGUgcmVxdWlyZW1lbnRzIG9mIFwiYWxnXCIgJHthbGd9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzYWx0TGVuZ3RoICE9PSB1bmRlZmluZWQgJiYgc2FsdExlbmd0aCA+IGxlbmd0aCA+PiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQga2V5IGZvciB0aGlzIG9wZXJhdGlvbiwgaXRzIFJTQS1QU1MgcGFyYW1ldGVyIHNhbHRMZW5ndGggZG9lcyBub3QgbWVldCB0aGUgcmVxdWlyZW1lbnRzIG9mIFwiYWxnXCIgJHthbGd9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5LmFzeW1tZXRyaWNLZXlUeXBlICE9PSAncnNhJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQga2V5IGZvciB0aGlzIG9wZXJhdGlvbiwgaXRzIGFzeW1tZXRyaWNLZXlUeXBlIG11c3QgYmUgcnNhIG9yIHJzYS1wc3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICgwLCBjaGVja19tb2R1bHVzX2xlbmd0aF9qc18xLmRlZmF1bHQpKGtleSwgYWxnKTtcbiAgICAgICAgICAgIHJldHVybiB7IGtleSwgLi4uUFNTIH07XG4gICAgICAgIGNhc2UgIXJzYVBzc1BhcmFtcyAmJiAnUFMyNTYnOlxuICAgICAgICBjYXNlICFyc2FQc3NQYXJhbXMgJiYgJ1BTMzg0JzpcbiAgICAgICAgY2FzZSAhcnNhUHNzUGFyYW1zICYmICdQUzUxMic6XG4gICAgICAgICAgICBpZiAoa2V5LmFzeW1tZXRyaWNLZXlUeXBlICE9PSAncnNhJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQga2V5IGZvciB0aGlzIG9wZXJhdGlvbiwgaXRzIGFzeW1tZXRyaWNLZXlUeXBlIG11c3QgYmUgcnNhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoMCwgY2hlY2tfbW9kdWx1c19sZW5ndGhfanNfMS5kZWZhdWx0KShrZXksIGFsZyk7XG4gICAgICAgICAgICByZXR1cm4geyBrZXksIC4uLlBTUyB9O1xuICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgIGNhc2UgJ0VTMjU2Syc6XG4gICAgICAgIGNhc2UgJ0VTMzg0JzpcbiAgICAgICAgY2FzZSAnRVM1MTInOiB7XG4gICAgICAgICAgICBpZiAoa2V5LmFzeW1tZXRyaWNLZXlUeXBlICE9PSAnZWMnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBrZXkgZm9yIHRoaXMgb3BlcmF0aW9uLCBpdHMgYXN5bW1ldHJpY0tleVR5cGUgbXVzdCBiZSBlYycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWN0dWFsID0gKDAsIGdldF9uYW1lZF9jdXJ2ZV9qc18xLmRlZmF1bHQpKGtleSk7XG4gICAgICAgICAgICBjb25zdCBleHBlY3RlZCA9IGVjQ3VydmVBbGdNYXAuZ2V0KGFsZyk7XG4gICAgICAgICAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQga2V5IGN1cnZlIGZvciB0aGUgYWxnb3JpdGhtLCBpdHMgY3VydmUgbXVzdCBiZSAke2V4cGVjdGVkfSwgZ290ICR7YWN0dWFsfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZHNhRW5jb2Rpbmc6ICdpZWVlLXAxMzYzJywga2V5IH07XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KT1NFTm90U3VwcG9ydGVkKGBhbGcgJHthbGd9IGlzIG5vdCBzdXBwb3J0ZWQgZWl0aGVyIGJ5IEpPU0Ugb3IgeW91ciBqYXZhc2NyaXB0IHJ1bnRpbWVgKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBrZXlGb3JDcnlwdG87XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVjcnlwdCA9IGV4cG9ydHMuZW5jcnlwdCA9IHZvaWQgMDtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xuY29uc3QgY3J5cHRvXzEgPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgcmFuZG9tX2pzXzEgPSByZXF1aXJlKFwiLi9yYW5kb20uanNcIik7XG5jb25zdCBidWZmZXJfdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvYnVmZmVyX3V0aWxzLmpzXCIpO1xuY29uc3QgYmFzZTY0dXJsX2pzXzEgPSByZXF1aXJlKFwiLi9iYXNlNjR1cmwuanNcIik7XG5jb25zdCBhZXNrd19qc18xID0gcmVxdWlyZShcIi4vYWVza3cuanNcIik7XG5jb25zdCBjaGVja19wMnNfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvY2hlY2tfcDJzLmpzXCIpO1xuY29uc3Qgd2ViY3J5cHRvX2pzXzEgPSByZXF1aXJlKFwiLi93ZWJjcnlwdG8uanNcIik7XG5jb25zdCBjcnlwdG9fa2V5X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2NyeXB0b19rZXkuanNcIik7XG5jb25zdCBpc19rZXlfb2JqZWN0X2pzXzEgPSByZXF1aXJlKFwiLi9pc19rZXlfb2JqZWN0LmpzXCIpO1xuY29uc3QgaW52YWxpZF9rZXlfaW5wdXRfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvaW52YWxpZF9rZXlfaW5wdXQuanNcIik7XG5jb25zdCBpc19rZXlfbGlrZV9qc18xID0gcmVxdWlyZShcIi4vaXNfa2V5X2xpa2UuanNcIik7XG5jb25zdCBwYmtkZjIgPSAoMCwgdXRpbF8xLnByb21pc2lmeSkoY3J5cHRvXzEucGJrZGYyKTtcbmZ1bmN0aW9uIGdldFBhc3N3b3JkKGtleSwgYWxnKSB7XG4gICAgaWYgKCgwLCBpc19rZXlfb2JqZWN0X2pzXzEuZGVmYXVsdCkoa2V5KSkge1xuICAgICAgICByZXR1cm4ga2V5LmV4cG9ydCgpO1xuICAgIH1cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICBpZiAoKDAsIHdlYmNyeXB0b19qc18xLmlzQ3J5cHRvS2V5KShrZXkpKSB7XG4gICAgICAgICgwLCBjcnlwdG9fa2V5X2pzXzEuY2hlY2tFbmNDcnlwdG9LZXkpKGtleSwgYWxnLCAnZGVyaXZlQml0cycsICdkZXJpdmVLZXknKTtcbiAgICAgICAgcmV0dXJuIGNyeXB0b18xLktleU9iamVjdC5mcm9tKGtleSkuZXhwb3J0KCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKDAsIGludmFsaWRfa2V5X2lucHV0X2pzXzEuZGVmYXVsdCkoa2V5LCAuLi5pc19rZXlfbGlrZV9qc18xLnR5cGVzLCAnVWludDhBcnJheScpKTtcbn1cbmNvbnN0IGVuY3J5cHQgPSBhc3luYyAoYWxnLCBrZXksIGNlaywgcDJjID0gMjA0OCwgcDJzID0gKDAsIHJhbmRvbV9qc18xLmRlZmF1bHQpKG5ldyBVaW50OEFycmF5KDE2KSkpID0+IHtcbiAgICAoMCwgY2hlY2tfcDJzX2pzXzEuZGVmYXVsdCkocDJzKTtcbiAgICBjb25zdCBzYWx0ID0gKDAsIGJ1ZmZlcl91dGlsc19qc18xLnAycykoYWxnLCBwMnMpO1xuICAgIGNvbnN0IGtleWxlbiA9IHBhcnNlSW50KGFsZy5zbGljZSgxMywgMTYpLCAxMCkgPj4gMztcbiAgICBjb25zdCBwYXNzd29yZCA9IGdldFBhc3N3b3JkKGtleSwgYWxnKTtcbiAgICBjb25zdCBkZXJpdmVkS2V5ID0gYXdhaXQgcGJrZGYyKHBhc3N3b3JkLCBzYWx0LCBwMmMsIGtleWxlbiwgYHNoYSR7YWxnLnNsaWNlKDgsIDExKX1gKTtcbiAgICBjb25zdCBlbmNyeXB0ZWRLZXkgPSBhd2FpdCAoMCwgYWVza3dfanNfMS53cmFwKShhbGcuc2xpY2UoLTYpLCBkZXJpdmVkS2V5LCBjZWspO1xuICAgIHJldHVybiB7IGVuY3J5cHRlZEtleSwgcDJjLCBwMnM6ICgwLCBiYXNlNjR1cmxfanNfMS5lbmNvZGUpKHAycykgfTtcbn07XG5leHBvcnRzLmVuY3J5cHQgPSBlbmNyeXB0O1xuY29uc3QgZGVjcnlwdCA9IGFzeW5jIChhbGcsIGtleSwgZW5jcnlwdGVkS2V5LCBwMmMsIHAycykgPT4ge1xuICAgICgwLCBjaGVja19wMnNfanNfMS5kZWZhdWx0KShwMnMpO1xuICAgIGNvbnN0IHNhbHQgPSAoMCwgYnVmZmVyX3V0aWxzX2pzXzEucDJzKShhbGcsIHAycyk7XG4gICAgY29uc3Qga2V5bGVuID0gcGFyc2VJbnQoYWxnLnNsaWNlKDEzLCAxNiksIDEwKSA+PiAzO1xuICAgIGNvbnN0IHBhc3N3b3JkID0gZ2V0UGFzc3dvcmQoa2V5LCBhbGcpO1xuICAgIGNvbnN0IGRlcml2ZWRLZXkgPSBhd2FpdCBwYmtkZjIocGFzc3dvcmQsIHNhbHQsIHAyYywga2V5bGVuLCBgc2hhJHthbGcuc2xpY2UoOCwgMTEpfWApO1xuICAgIHJldHVybiAoMCwgYWVza3dfanNfMS51bndyYXApKGFsZy5zbGljZSgtNiksIGRlcml2ZWRLZXksIGVuY3J5cHRlZEtleSk7XG59O1xuZXhwb3J0cy5kZWNyeXB0ID0gZGVjcnlwdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIGNyeXB0b18xID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNyeXB0b18xLnJhbmRvbUZpbGxTeW5jOyB9IH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlY3J5cHQgPSBleHBvcnRzLmVuY3J5cHQgPSB2b2lkIDA7XG5jb25zdCBjcnlwdG9fMSA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCBjaGVja19tb2R1bHVzX2xlbmd0aF9qc18xID0gcmVxdWlyZShcIi4vY2hlY2tfbW9kdWx1c19sZW5ndGguanNcIik7XG5jb25zdCB3ZWJjcnlwdG9fanNfMSA9IHJlcXVpcmUoXCIuL3dlYmNyeXB0by5qc1wiKTtcbmNvbnN0IGNyeXB0b19rZXlfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvY3J5cHRvX2tleS5qc1wiKTtcbmNvbnN0IGlzX2tleV9vYmplY3RfanNfMSA9IHJlcXVpcmUoXCIuL2lzX2tleV9vYmplY3QuanNcIik7XG5jb25zdCBpbnZhbGlkX2tleV9pbnB1dF9qc18xID0gcmVxdWlyZShcIi4uL2xpYi9pbnZhbGlkX2tleV9pbnB1dC5qc1wiKTtcbmNvbnN0IGlzX2tleV9saWtlX2pzXzEgPSByZXF1aXJlKFwiLi9pc19rZXlfbGlrZS5qc1wiKTtcbmNvbnN0IGNoZWNrS2V5ID0gKGtleSwgYWxnKSA9PiB7XG4gICAgaWYgKGtleS5hc3ltbWV0cmljS2V5VHlwZSAhPT0gJ3JzYScpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBrZXkgZm9yIHRoaXMgb3BlcmF0aW9uLCBpdHMgYXN5bW1ldHJpY0tleVR5cGUgbXVzdCBiZSByc2EnKTtcbiAgICB9XG4gICAgKDAsIGNoZWNrX21vZHVsdXNfbGVuZ3RoX2pzXzEuZGVmYXVsdCkoa2V5LCBhbGcpO1xufTtcbmNvbnN0IHJlc29sdmVQYWRkaW5nID0gKGFsZykgPT4ge1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ1JTQS1PQUVQJzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMjU2JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMzg0JzpcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzpcbiAgICAgICAgICAgIHJldHVybiBjcnlwdG9fMS5jb25zdGFudHMuUlNBX1BLQ1MxX09BRVBfUEFERElORztcbiAgICAgICAgY2FzZSAnUlNBMV81JzpcbiAgICAgICAgICAgIHJldHVybiBjcnlwdG9fMS5jb25zdGFudHMuUlNBX1BLQ1MxX1BBRERJTkc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn07XG5jb25zdCByZXNvbHZlT2FlcEhhc2ggPSAoYWxnKSA9PiB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAnOlxuICAgICAgICAgICAgcmV0dXJuICdzaGExJztcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMjU2JzpcbiAgICAgICAgICAgIHJldHVybiAnc2hhMjU2JztcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtMzg0JzpcbiAgICAgICAgICAgIHJldHVybiAnc2hhMzg0JztcbiAgICAgICAgY2FzZSAnUlNBLU9BRVAtNTEyJzpcbiAgICAgICAgICAgIHJldHVybiAnc2hhNTEyJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufTtcbmZ1bmN0aW9uIGVuc3VyZUtleU9iamVjdChrZXksIGFsZywgLi4udXNhZ2VzKSB7XG4gICAgaWYgKCgwLCBpc19rZXlfb2JqZWN0X2pzXzEuZGVmYXVsdCkoa2V5KSkge1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICBpZiAoKDAsIHdlYmNyeXB0b19qc18xLmlzQ3J5cHRvS2V5KShrZXkpKSB7XG4gICAgICAgICgwLCBjcnlwdG9fa2V5X2pzXzEuY2hlY2tFbmNDcnlwdG9LZXkpKGtleSwgYWxnLCAuLi51c2FnZXMpO1xuICAgICAgICByZXR1cm4gY3J5cHRvXzEuS2V5T2JqZWN0LmZyb20oa2V5KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigoMCwgaW52YWxpZF9rZXlfaW5wdXRfanNfMS5kZWZhdWx0KShrZXksIC4uLmlzX2tleV9saWtlX2pzXzEudHlwZXMpKTtcbn1cbmNvbnN0IGVuY3J5cHQgPSAoYWxnLCBrZXksIGNlaykgPT4ge1xuICAgIGNvbnN0IHBhZGRpbmcgPSByZXNvbHZlUGFkZGluZyhhbGcpO1xuICAgIGNvbnN0IG9hZXBIYXNoID0gcmVzb2x2ZU9hZXBIYXNoKGFsZyk7XG4gICAgY29uc3Qga2V5T2JqZWN0ID0gZW5zdXJlS2V5T2JqZWN0KGtleSwgYWxnLCAnd3JhcEtleScsICdlbmNyeXB0Jyk7XG4gICAgY2hlY2tLZXkoa2V5T2JqZWN0LCBhbGcpO1xuICAgIHJldHVybiAoMCwgY3J5cHRvXzEucHVibGljRW5jcnlwdCkoeyBrZXk6IGtleU9iamVjdCwgb2FlcEhhc2gsIHBhZGRpbmcgfSwgY2VrKTtcbn07XG5leHBvcnRzLmVuY3J5cHQgPSBlbmNyeXB0O1xuY29uc3QgZGVjcnlwdCA9IChhbGcsIGtleSwgZW5jcnlwdGVkS2V5KSA9PiB7XG4gICAgY29uc3QgcGFkZGluZyA9IHJlc29sdmVQYWRkaW5nKGFsZyk7XG4gICAgY29uc3Qgb2FlcEhhc2ggPSByZXNvbHZlT2FlcEhhc2goYWxnKTtcbiAgICBjb25zdCBrZXlPYmplY3QgPSBlbnN1cmVLZXlPYmplY3Qoa2V5LCBhbGcsICd1bndyYXBLZXknLCAnZGVjcnlwdCcpO1xuICAgIGNoZWNrS2V5KGtleU9iamVjdCwgYWxnKTtcbiAgICByZXR1cm4gKDAsIGNyeXB0b18xLnByaXZhdGVEZWNyeXB0KSh7IGtleToga2V5T2JqZWN0LCBvYWVwSGFzaCwgcGFkZGluZyB9LCBlbmNyeXB0ZWRLZXkpO1xufTtcbmV4cG9ydHMuZGVjcnlwdCA9IGRlY3J5cHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNyeXB0byA9IHJlcXVpcmUoXCJjcnlwdG9cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwidXRpbFwiKTtcbmNvbnN0IGRzYV9kaWdlc3RfanNfMSA9IHJlcXVpcmUoXCIuL2RzYV9kaWdlc3QuanNcIik7XG5jb25zdCBobWFjX2RpZ2VzdF9qc18xID0gcmVxdWlyZShcIi4vaG1hY19kaWdlc3QuanNcIik7XG5jb25zdCBub2RlX2tleV9qc18xID0gcmVxdWlyZShcIi4vbm9kZV9rZXkuanNcIik7XG5jb25zdCBnZXRfc2lnbl92ZXJpZnlfa2V5X2pzXzEgPSByZXF1aXJlKFwiLi9nZXRfc2lnbl92ZXJpZnlfa2V5LmpzXCIpO1xubGV0IG9uZVNob3RTaWduO1xuaWYgKGNyeXB0by5zaWduLmxlbmd0aCA+IDMpIHtcbiAgICBvbmVTaG90U2lnbiA9ICgwLCB1dGlsXzEucHJvbWlzaWZ5KShjcnlwdG8uc2lnbik7XG59XG5lbHNlIHtcbiAgICBvbmVTaG90U2lnbiA9IGNyeXB0by5zaWduO1xufVxuY29uc3Qgc2lnbiA9IGFzeW5jIChhbGcsIGtleSwgZGF0YSkgPT4ge1xuICAgIGNvbnN0IGtleU9iamVjdCA9ICgwLCBnZXRfc2lnbl92ZXJpZnlfa2V5X2pzXzEuZGVmYXVsdCkoYWxnLCBrZXksICdzaWduJyk7XG4gICAgaWYgKGFsZy5zdGFydHNXaXRoKCdIUycpKSB7XG4gICAgICAgIGNvbnN0IGhtYWMgPSBjcnlwdG8uY3JlYXRlSG1hYygoMCwgaG1hY19kaWdlc3RfanNfMS5kZWZhdWx0KShhbGcpLCBrZXlPYmplY3QpO1xuICAgICAgICBobWFjLnVwZGF0ZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIGhtYWMuZGlnZXN0KCk7XG4gICAgfVxuICAgIHJldHVybiBvbmVTaG90U2lnbigoMCwgZHNhX2RpZ2VzdF9qc18xLmRlZmF1bHQpKGFsZyksIGRhdGEsICgwLCBub2RlX2tleV9qc18xLmRlZmF1bHQpKGFsZywga2V5T2JqZWN0KSk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gc2lnbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY3J5cHRvXzEgPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgdGltaW5nU2FmZUVxdWFsID0gY3J5cHRvXzEudGltaW5nU2FmZUVxdWFsO1xuZXhwb3J0cy5kZWZhdWx0ID0gdGltaW5nU2FmZUVxdWFsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKFwiY3J5cHRvXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcInV0aWxcIik7XG5jb25zdCBkc2FfZGlnZXN0X2pzXzEgPSByZXF1aXJlKFwiLi9kc2FfZGlnZXN0LmpzXCIpO1xuY29uc3Qgbm9kZV9rZXlfanNfMSA9IHJlcXVpcmUoXCIuL25vZGVfa2V5LmpzXCIpO1xuY29uc3Qgc2lnbl9qc18xID0gcmVxdWlyZShcIi4vc2lnbi5qc1wiKTtcbmNvbnN0IGdldF9zaWduX3ZlcmlmeV9rZXlfanNfMSA9IHJlcXVpcmUoXCIuL2dldF9zaWduX3ZlcmlmeV9rZXkuanNcIik7XG5jb25zdCBbbWFqb3IsIG1pbm9yXSA9IHByb2Nlc3MudmVyc2lvblxuICAgIC5zbGljZSgxKVxuICAgIC5zcGxpdCgnLicpXG4gICAgLm1hcCgoc3RyKSA9PiBwYXJzZUludChzdHIsIDEwKSk7XG5jb25zdCBvbmVTaG90Q2FsbGJhY2tTdXBwb3J0ZWQgPSBtYWpvciA+PSAxNiB8fCAobWFqb3IgPT09IDE1ICYmIG1pbm9yID49IDEzKTtcbmxldCBvbmVTaG90VmVyaWZ5O1xuaWYgKGNyeXB0by52ZXJpZnkubGVuZ3RoID4gNCAmJiBvbmVTaG90Q2FsbGJhY2tTdXBwb3J0ZWQpIHtcbiAgICBvbmVTaG90VmVyaWZ5ID0gKDAsIHV0aWxfMS5wcm9taXNpZnkpKGNyeXB0by52ZXJpZnkpO1xufVxuZWxzZSB7XG4gICAgb25lU2hvdFZlcmlmeSA9IGNyeXB0by52ZXJpZnk7XG59XG5jb25zdCB2ZXJpZnkgPSBhc3luYyAoYWxnLCBrZXksIHNpZ25hdHVyZSwgZGF0YSkgPT4ge1xuICAgIGNvbnN0IGtleU9iamVjdCA9ICgwLCBnZXRfc2lnbl92ZXJpZnlfa2V5X2pzXzEuZGVmYXVsdCkoYWxnLCBrZXksICd2ZXJpZnknKTtcbiAgICBpZiAoYWxnLnN0YXJ0c1dpdGgoJ0hTJykpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBhd2FpdCAoMCwgc2lnbl9qc18xLmRlZmF1bHQpKGFsZywga2V5T2JqZWN0LCBkYXRhKTtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gc2lnbmF0dXJlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGNyeXB0by50aW1pbmdTYWZlRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFsZ29yaXRobSA9ICgwLCBkc2FfZGlnZXN0X2pzXzEuZGVmYXVsdCkoYWxnKTtcbiAgICBjb25zdCBrZXlJbnB1dCA9ICgwLCBub2RlX2tleV9qc18xLmRlZmF1bHQpKGFsZywga2V5T2JqZWN0KTtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgb25lU2hvdFZlcmlmeShhbGdvcml0aG0sIGRhdGEsIGtleUlucHV0LCBzaWduYXR1cmUpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gdmVyaWZ5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzQ3J5cHRvS2V5ID0gdm9pZCAwO1xuY29uc3QgY3J5cHRvID0gcmVxdWlyZShcImNyeXB0b1wiKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKFwidXRpbFwiKTtcbmNvbnN0IHdlYmNyeXB0byA9IGNyeXB0by53ZWJjcnlwdG87XG5leHBvcnRzLmRlZmF1bHQgPSB3ZWJjcnlwdG87XG5leHBvcnRzLmlzQ3J5cHRvS2V5ID0gdXRpbC50eXBlcy5pc0NyeXB0b0tleVxuICAgID8gKGtleSkgPT4gdXRpbC50eXBlcy5pc0NyeXB0b0tleShrZXkpXG4gICAgOlxuICAgICAgICAoa2V5KSA9PiBmYWxzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZsYXRlID0gZXhwb3J0cy5pbmZsYXRlID0gdm9pZCAwO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcInV0aWxcIik7XG5jb25zdCB6bGliXzEgPSByZXF1aXJlKFwiemxpYlwiKTtcbmNvbnN0IGluZmxhdGVSYXcgPSAoMCwgdXRpbF8xLnByb21pc2lmeSkoemxpYl8xLmluZmxhdGVSYXcpO1xuY29uc3QgZGVmbGF0ZVJhdyA9ICgwLCB1dGlsXzEucHJvbWlzaWZ5KSh6bGliXzEuZGVmbGF0ZVJhdyk7XG5jb25zdCBpbmZsYXRlID0gKGlucHV0KSA9PiBpbmZsYXRlUmF3KGlucHV0KTtcbmV4cG9ydHMuaW5mbGF0ZSA9IGluZmxhdGU7XG5jb25zdCBkZWZsYXRlID0gKGlucHV0KSA9PiBkZWZsYXRlUmF3KGlucHV0KTtcbmV4cG9ydHMuZGVmbGF0ZSA9IGRlZmxhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5lbmNvZGUgPSB2b2lkIDA7XG5jb25zdCBiYXNlNjR1cmwgPSByZXF1aXJlKFwiLi4vcnVudGltZS9iYXNlNjR1cmwuanNcIik7XG5leHBvcnRzLmVuY29kZSA9IGJhc2U2NHVybC5lbmNvZGU7XG5leHBvcnRzLmRlY29kZSA9IGJhc2U2NHVybC5kZWNvZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVjb2RlSnd0ID0gdm9pZCAwO1xuY29uc3QgYmFzZTY0dXJsX2pzXzEgPSByZXF1aXJlKFwiLi9iYXNlNjR1cmwuanNcIik7XG5jb25zdCBidWZmZXJfdXRpbHNfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvYnVmZmVyX3V0aWxzLmpzXCIpO1xuY29uc3QgaXNfb2JqZWN0X2pzXzEgPSByZXF1aXJlKFwiLi4vbGliL2lzX29iamVjdC5qc1wiKTtcbmNvbnN0IGVycm9yc19qc18xID0gcmVxdWlyZShcIi4vZXJyb3JzLmpzXCIpO1xuZnVuY3Rpb24gZGVjb2RlSnd0KGp3dCkge1xuICAgIGlmICh0eXBlb2Ygand0ICE9PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXVEludmFsaWQoJ0pXVHMgbXVzdCB1c2UgQ29tcGFjdCBKV1Mgc2VyaWFsaXphdGlvbiwgSldUIG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICBjb25zdCB7IDE6IHBheWxvYWQsIGxlbmd0aCB9ID0gand0LnNwbGl0KCcuJyk7XG4gICAgaWYgKGxlbmd0aCA9PT0gNSlcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXVEludmFsaWQoJ09ubHkgSldUcyB1c2luZyBDb21wYWN0IEpXUyBzZXJpYWxpemF0aW9uIGNhbiBiZSBkZWNvZGVkJyk7XG4gICAgaWYgKGxlbmd0aCAhPT0gMylcbiAgICAgICAgdGhyb3cgbmV3IGVycm9yc19qc18xLkpXVEludmFsaWQoJ0ludmFsaWQgSldUJyk7XG4gICAgaWYgKCFwYXlsb2FkKVxuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUSW52YWxpZCgnSldUcyBtdXN0IGNvbnRhaW4gYSBwYXlsb2FkJyk7XG4gICAgbGV0IGRlY29kZWQ7XG4gICAgdHJ5IHtcbiAgICAgICAgZGVjb2RlZCA9ICgwLCBiYXNlNjR1cmxfanNfMS5kZWNvZGUpKHBheWxvYWQpO1xuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnNfanNfMS5KV1RJbnZhbGlkKCdGYWlsZWQgdG8gcGFyc2UgdGhlIGJhc2U2NHVybCBlbmNvZGVkIHBheWxvYWQnKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKGJ1ZmZlcl91dGlsc19qc18xLmRlY29kZXIuZGVjb2RlKGRlY29kZWQpKTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUSW52YWxpZCgnRmFpbGVkIHRvIHBhcnNlIHRoZSBkZWNvZGVkIHBheWxvYWQgYXMgSlNPTicpO1xuICAgIH1cbiAgICBpZiAoISgwLCBpc19vYmplY3RfanNfMS5kZWZhdWx0KShyZXN1bHQpKVxuICAgICAgICB0aHJvdyBuZXcgZXJyb3JzX2pzXzEuSldUSW52YWxpZCgnSW52YWxpZCBKV1QgQ2xhaW1zIFNldCcpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmRlY29kZUp3dCA9IGRlY29kZUp3dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWNvZGVQcm90ZWN0ZWRIZWFkZXIgPSB2b2lkIDA7XG5jb25zdCBiYXNlNjR1cmxfanNfMSA9IHJlcXVpcmUoXCIuL2Jhc2U2NHVybC5qc1wiKTtcbmNvbnN0IGJ1ZmZlcl91dGlsc19qc18xID0gcmVxdWlyZShcIi4uL2xpYi9idWZmZXJfdXRpbHMuanNcIik7XG5jb25zdCBpc19vYmplY3RfanNfMSA9IHJlcXVpcmUoXCIuLi9saWIvaXNfb2JqZWN0LmpzXCIpO1xuZnVuY3Rpb24gZGVjb2RlUHJvdGVjdGVkSGVhZGVyKHRva2VuKSB7XG4gICAgbGV0IHByb3RlY3RlZEI2NHU7XG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdCgnLicpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAzIHx8IHBhcnRzLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgO1xuICAgICAgICAgICAgW3Byb3RlY3RlZEI2NHVdID0gcGFydHM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHRva2VuID09PSAnb2JqZWN0JyAmJiB0b2tlbikge1xuICAgICAgICBpZiAoJ3Byb3RlY3RlZCcgaW4gdG9rZW4pIHtcbiAgICAgICAgICAgIHByb3RlY3RlZEI2NHUgPSB0b2tlbi5wcm90ZWN0ZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUb2tlbiBkb2VzIG5vdCBjb250YWluIGEgUHJvdGVjdGVkIEhlYWRlcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvdGVjdGVkQjY0dSAhPT0gJ3N0cmluZycgfHwgIXByb3RlY3RlZEI2NHUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IEpTT04ucGFyc2UoYnVmZmVyX3V0aWxzX2pzXzEuZGVjb2Rlci5kZWNvZGUoKDAsIGJhc2U2NHVybF9qc18xLmRlY29kZSkocHJvdGVjdGVkQjY0dSkpKTtcbiAgICAgICAgaWYgKCEoMCwgaXNfb2JqZWN0X2pzXzEuZGVmYXVsdCkocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFRva2VuIG9yIFByb3RlY3RlZCBIZWFkZXIgZm9ybWF0dGluZycpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVjb2RlUHJvdGVjdGVkSGVhZGVyID0gZGVjb2RlUHJvdGVjdGVkSGVhZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCA9IGV4cG9ydHMuSldLU1RpbWVvdXQgPSBleHBvcnRzLkpXS1NNdWx0aXBsZU1hdGNoaW5nS2V5cyA9IGV4cG9ydHMuSldLU05vTWF0Y2hpbmdLZXkgPSBleHBvcnRzLkpXS1NJbnZhbGlkID0gZXhwb3J0cy5KV0tJbnZhbGlkID0gZXhwb3J0cy5KV1RJbnZhbGlkID0gZXhwb3J0cy5KV1NJbnZhbGlkID0gZXhwb3J0cy5KV0VJbnZhbGlkID0gZXhwb3J0cy5KV0VEZWNyeXB0aW9uRmFpbGVkID0gZXhwb3J0cy5KT1NFTm90U3VwcG9ydGVkID0gZXhwb3J0cy5KT1NFQWxnTm90QWxsb3dlZCA9IGV4cG9ydHMuSldURXhwaXJlZCA9IGV4cG9ydHMuSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkID0gZXhwb3J0cy5KT1NFRXJyb3IgPSB2b2lkIDA7XG5jbGFzcyBKT1NFRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pPU0VfR0VORVJJQyc7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgKF9hID0gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKEVycm9yLCB0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KT1NFX0dFTkVSSUMnO1xuICAgIH1cbn1cbmV4cG9ydHMuSk9TRUVycm9yID0gSk9TRUVycm9yO1xuY2xhc3MgSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjbGFpbSA9ICd1bnNwZWNpZmllZCcsIHJlYXNvbiA9ICd1bnNwZWNpZmllZCcpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0NMQUlNX1ZBTElEQVRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5jbGFpbSA9IGNsYWltO1xuICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1RfQ0xBSU1fVkFMSURBVElPTl9GQUlMRUQnO1xuICAgIH1cbn1cbmV4cG9ydHMuSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkID0gSldUQ2xhaW1WYWxpZGF0aW9uRmFpbGVkO1xuY2xhc3MgSldURXhwaXJlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgY2xhaW0gPSAndW5zcGVjaWZpZWQnLCByZWFzb24gPSAndW5zcGVjaWZpZWQnKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXVF9FWFBJUkVEJztcbiAgICAgICAgdGhpcy5jbGFpbSA9IGNsYWltO1xuICAgICAgICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV1RfRVhQSVJFRCc7XG4gICAgfVxufVxuZXhwb3J0cy5KV1RFeHBpcmVkID0gSldURXhwaXJlZDtcbmNsYXNzIEpPU0VBbGdOb3RBbGxvd2VkIGV4dGVuZHMgSk9TRUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb2RlID0gJ0VSUl9KT1NFX0FMR19OT1RfQUxMT1dFRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9BTEdfTk9UX0FMTE9XRUQnO1xuICAgIH1cbn1cbmV4cG9ydHMuSk9TRUFsZ05vdEFsbG93ZWQgPSBKT1NFQWxnTm90QWxsb3dlZDtcbmNsYXNzIEpPU0VOb3RTdXBwb3J0ZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pPU0VfTk9UX1NVUFBPUlRFRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSk9TRV9OT1RfU1VQUE9SVEVEJztcbiAgICB9XG59XG5leHBvcnRzLkpPU0VOb3RTdXBwb3J0ZWQgPSBKT1NFTm90U3VwcG9ydGVkO1xuY2xhc3MgSldFRGVjcnlwdGlvbkZhaWxlZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJ2RlY3J5cHRpb24gb3BlcmF0aW9uIGZhaWxlZCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldFX0RFQ1JZUFRJT05fRkFJTEVEJztcbiAgICB9XG59XG5leHBvcnRzLkpXRURlY3J5cHRpb25GYWlsZWQgPSBKV0VEZWNyeXB0aW9uRmFpbGVkO1xuY2xhc3MgSldFSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldFX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXRV9JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnRzLkpXRUludmFsaWQgPSBKV0VJbnZhbGlkO1xuY2xhc3MgSldTSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldTX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXU19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnRzLkpXU0ludmFsaWQgPSBKV1NJbnZhbGlkO1xuY2xhc3MgSldUSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldUX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXVF9JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnRzLkpXVEludmFsaWQgPSBKV1RJbnZhbGlkO1xuY2xhc3MgSldLSW52YWxpZCBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLX0lOVkFMSUQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnRzLkpXS0ludmFsaWQgPSBKV0tJbnZhbGlkO1xuY2xhc3MgSldLU0ludmFsaWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfSU5WQUxJRCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldLU19JTlZBTElEJztcbiAgICB9XG59XG5leHBvcnRzLkpXS1NJbnZhbGlkID0gSldLU0ludmFsaWQ7XG5jbGFzcyBKV0tTTm9NYXRjaGluZ0tleSBleHRlbmRzIEpPU0VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY29kZSA9ICdFUlJfSldLU19OT19NQVRDSElOR19LRVknO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnbm8gYXBwbGljYWJsZSBrZXkgZm91bmQgaW4gdGhlIEpTT04gV2ViIEtleSBTZXQnO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNvZGUoKSB7XG4gICAgICAgIHJldHVybiAnRVJSX0pXS1NfTk9fTUFUQ0hJTkdfS0VZJztcbiAgICB9XG59XG5leHBvcnRzLkpXS1NOb01hdGNoaW5nS2V5ID0gSldLU05vTWF0Y2hpbmdLZXk7XG5jbGFzcyBKV0tTTXVsdGlwbGVNYXRjaGluZ0tleXMgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfTVVMVElQTEVfTUFUQ0hJTkdfS0VZUyc7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdtdWx0aXBsZSBtYXRjaGluZyBrZXlzIGZvdW5kIGluIHRoZSBKU09OIFdlYiBLZXkgU2V0JztcbiAgICB9XG4gICAgc3RhdGljIGdldCBjb2RlKCkge1xuICAgICAgICByZXR1cm4gJ0VSUl9KV0tTX01VTFRJUExFX01BVENISU5HX0tFWVMnO1xuICAgIH1cbn1cbmV4cG9ydHMuSldLU011bHRpcGxlTWF0Y2hpbmdLZXlzID0gSldLU011bHRpcGxlTWF0Y2hpbmdLZXlzO1xuY2xhc3MgSldLU1RpbWVvdXQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXS1NfVElNRU9VVCc7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdyZXF1ZXN0IHRpbWVkIG91dCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldLU19USU1FT1VUJztcbiAgICB9XG59XG5leHBvcnRzLkpXS1NUaW1lb3V0ID0gSldLU1RpbWVvdXQ7XG5jbGFzcyBKV1NTaWduYXR1cmVWZXJpZmljYXRpb25GYWlsZWQgZXh0ZW5kcyBKT1NFRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmNvZGUgPSAnRVJSX0pXU19TSUdOQVRVUkVfVkVSSUZJQ0FUSU9OX0ZBSUxFRCc7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdzaWduYXR1cmUgdmVyaWZpY2F0aW9uIGZhaWxlZCc7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY29kZSgpIHtcbiAgICAgICAgcmV0dXJuICdFUlJfSldTX1NJR05BVFVSRV9WRVJJRklDQVRJT05fRkFJTEVEJztcbiAgICB9XG59XG5leHBvcnRzLkpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZCA9IEpXU1NpZ25hdHVyZVZlcmlmaWNhdGlvbkZhaWxlZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5DbGllbnQgPSB2b2lkIDA7XG5cbnZhciBfcGFja2FnZSA9IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIik7XG5cbnZhciBqb3NlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcImpvc2VcIikpO1xuXG52YXIgX2lzb21vcnBoaWNCYXNlID0gcmVxdWlyZShcImlzb21vcnBoaWMtYmFzZTY0XCIpO1xuXG52YXIgZW52cyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2VudnNcIikpO1xuXG52YXIgX2NyeXB0b193YWxsZXRzID0gcmVxdWlyZShcIi4vY3J5cHRvX3dhbGxldHNcIik7XG5cbnZhciBfdXNlcnMgPSByZXF1aXJlKFwiLi91c2Vyc1wiKTtcblxudmFyIF9tYWdpY19saW5rcyA9IHJlcXVpcmUoXCIuL21hZ2ljX2xpbmtzXCIpO1xuXG52YXIgX29hdXRoID0gcmVxdWlyZShcIi4vb2F1dGhcIik7XG5cbnZhciBfb3RwcyA9IHJlcXVpcmUoXCIuL290cHNcIik7XG5cbnZhciBfc2Vzc2lvbnMgPSByZXF1aXJlKFwiLi9zZXNzaW9uc1wiKTtcblxudmFyIF90b3RwcyA9IHJlcXVpcmUoXCIuL3RvdHBzXCIpO1xuXG52YXIgX3dlYmF1dGhuID0gcmVxdWlyZShcIi4vd2ViYXV0aG5cIik7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7IHZhciBjYWNoZUJhYmVsSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHZhciBjYWNoZU5vZGVJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgcmV0dXJuIChfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiAobm9kZUludGVyb3ApIHsgcmV0dXJuIG5vZGVJbnRlcm9wID8gY2FjaGVOb2RlSW50ZXJvcCA6IGNhY2hlQmFiZWxJbnRlcm9wOyB9KShub2RlSW50ZXJvcCk7IH1cblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqLCBub2RlSW50ZXJvcCkgeyBpZiAoIW5vZGVJbnRlcm9wICYmIG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpIHsgcmV0dXJuIHsgZGVmYXVsdDogb2JqIH07IH0gdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoa2V5ICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyBpZiAoY2FjaGUpIHsgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTsgfSByZXR1cm4gbmV3T2JqOyB9XG5cbmNvbnN0IERFRkFVTFRfVElNRU9VVCA9IDEwICogNjAgKiAxMDAwOyAvLyBUZW4gbWludXRlc1xuXG5jbGFzcyBDbGllbnQge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZyAhPSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIGNvbmZpZyB0eXBlLiBSZWZlciB0byBodHRwczovL2dpdGh1Yi5jb20vc3R5dGNoYXV0aC9zdHl0Y2gtbm9kZSBmb3IgaG93IHRvIHVzZSB0aGUgTm9kZSBjbGllbnQgbGlicmFyeS5cIik7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcucHJvamVjdF9pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFwicHJvamVjdF9pZFwiIGluIGNvbmZpZycpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnNlY3JldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFwic2VjcmV0XCIgaW4gY29uZmlnJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcuZW52KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgXCJlbnZcIiBpbiBjb25maWcnKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmVudiAhPSBlbnZzLnRlc3QgJiYgY29uZmlnLmVudiAhPSBlbnZzLmxpdmUpIHsvLyBUT0RPOiB3YXJuIGFib3V0IG5vbi1wcm9kdWN0aW9uIGNvbmZpZ3VyYXRpb25cbiAgICB9XG5cbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICBcIlVzZXItQWdlbnRcIjogYFN0eXRjaCBOb2RlIHYke19wYWNrYWdlLnZlcnNpb259YCxcbiAgICAgIEF1dGhvcml6YXRpb246IFwiQmFzaWMgXCIgKyAoMCwgX2lzb21vcnBoaWNCYXNlLmJ0b2EpKGNvbmZpZy5wcm9qZWN0X2lkICsgXCI6XCIgKyBjb25maWcuc2VjcmV0KVxuICAgIH07XG4gICAgdGhpcy5mZXRjaENvbmZpZyA9IHtcbiAgICAgIGJhc2VVUkw6IGNvbmZpZy5lbnYsXG4gICAgICBoZWFkZXJzLFxuICAgICAgdGltZW91dDogY29uZmlnLnRpbWVvdXQgfHwgREVGQVVMVF9USU1FT1VULFxuICAgICAgYWdlbnQ6IGNvbmZpZy5hZ2VudFxuICAgIH07IC8vIEdldCBhIGJhc2VVUkwgdGhhdCBlbmRzIHdpdGggYSBzbGFzaCB0byBtYWtlIGJ1aWxkaW5nIHJvdXRlIFVSTHMgZWFzaWVyLlxuXG4gICAgbGV0IGJhc2VVUkwgPSBjb25maWcuZW52O1xuXG4gICAgaWYgKCFiYXNlVVJMLmVuZHNXaXRoKFwiL1wiKSkge1xuICAgICAgYmFzZVVSTCArPSBcIi9cIjtcbiAgICB9XG5cbiAgICBjb25zdCBqd3RDb25maWcgPSB7XG4gICAgICAvLyBPbmx5IGFsbG93IEpXVHMgdGhhdCB3ZXJlIG1lYW50IGZvciB0aGlzIHByb2plY3QuXG4gICAgICBwcm9qZWN0SUQ6IGNvbmZpZy5wcm9qZWN0X2lkLFxuICAgICAgLy8gRmV0Y2ggdGhlIHNpZ25hdHVyZSB2ZXJpZmljYXRpb24ga2V5cyBmb3IgdGhpcyBwcm9qZWN0IGFzIG5lZWRlZC5cbiAgICAgIGp3a3M6IGpvc2UuY3JlYXRlUmVtb3RlSldLU2V0KG5ldyBVUkwoYHNlc3Npb25zL2p3a3MvJHtjb25maWcucHJvamVjdF9pZH1gLCBiYXNlVVJMKSlcbiAgICB9O1xuICAgIHRoaXMudXNlcnMgPSBuZXcgX3VzZXJzLlVzZXJzKHRoaXMuZmV0Y2hDb25maWcpO1xuICAgIHRoaXMubWFnaWNMaW5rcyA9IG5ldyBfbWFnaWNfbGlua3MuTWFnaWNMaW5rcyh0aGlzLmZldGNoQ29uZmlnKTtcbiAgICB0aGlzLm9hdXRoID0gbmV3IF9vYXV0aC5PQXV0aCh0aGlzLmZldGNoQ29uZmlnKTtcbiAgICB0aGlzLm90cHMgPSBuZXcgX290cHMuT1RQcyh0aGlzLmZldGNoQ29uZmlnKTtcbiAgICB0aGlzLnNlc3Npb25zID0gbmV3IF9zZXNzaW9ucy5TZXNzaW9ucyh0aGlzLmZldGNoQ29uZmlnLCBqd3RDb25maWcpO1xuICAgIHRoaXMudG90cHMgPSBuZXcgX3RvdHBzLlRPVFBzKHRoaXMuZmV0Y2hDb25maWcpO1xuICAgIHRoaXMud2ViYXV0aG4gPSBuZXcgX3dlYmF1dGhuLldlYkF1dGhuKHRoaXMuZmV0Y2hDb25maWcpO1xuICAgIHRoaXMuY3J5cHRvV2FsbGV0cyA9IG5ldyBfY3J5cHRvX3dhbGxldHMuQ3J5cHRvV2FsbGV0cyh0aGlzLmZldGNoQ29uZmlnKTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuQ2xpZW50ID0gQ2xpZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5DcnlwdG9XYWxsZXRzID0gdm9pZCAwO1xuXG52YXIgX3NoYXJlZCA9IHJlcXVpcmUoXCIuL3NoYXJlZFwiKTtcblxuY2xhc3MgQ3J5cHRvV2FsbGV0cyB7XG4gIGJhc2VfcGF0aCA9IFwiY3J5cHRvX3dhbGxldHNcIjtcblxuICBjb25zdHJ1Y3RvcihmZXRjaENvbmZpZykge1xuICAgIHRoaXMuZmV0Y2hDb25maWcgPSBmZXRjaENvbmZpZztcbiAgfVxuXG4gIGVuZHBvaW50KHBhdGgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlX3BhdGh9LyR7cGF0aH1gO1xuICB9XG5cbiAgYXV0aGVudGljYXRlU3RhcnQoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwiYXV0aGVudGljYXRlL3N0YXJ0XCIpLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgYXV0aGVudGljYXRlKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcImF1dGhlbnRpY2F0ZVwiKSxcbiAgICAgIGRhdGFcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5yZXMsXG4gICAgICAgIHVzZXI6ICgwLCBfc2hhcmVkLnBhcnNlVXNlcikocmVzLnVzZXIpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0cy5DcnlwdG9XYWxsZXRzID0gQ3J5cHRvV2FsbGV0czsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubGl2ZSA9IGV4cG9ydHMudGVzdCA9IHZvaWQgMDtcbmNvbnN0IHRlc3QgPSBcImh0dHBzOi8vdGVzdC5zdHl0Y2guY29tL3YxL1wiO1xuZXhwb3J0cy50ZXN0ID0gdGVzdDtcbmNvbnN0IGxpdmUgPSBcImh0dHBzOi8vYXBpLnN0eXRjaC5jb20vdjEvXCI7XG5leHBvcnRzLmxpdmUgPSBsaXZlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5DbGllbnRFcnJvciA9IGV4cG9ydHMuUmVxdWVzdEVycm9yID0gZXhwb3J0cy5TdHl0Y2hFcnJvciA9IHZvaWQgMDtcblxuY2xhc3MgU3R5dGNoRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgdGhpcy5zdGF0dXNfY29kZSA9IGRhdGEuc3RhdHVzX2NvZGU7XG4gICAgdGhpcy5yZXF1ZXN0X2lkID0gZGF0YS5yZXF1ZXN0X2lkO1xuICAgIHRoaXMuZXJyb3JfdHlwZSA9IGRhdGEuZXJyb3JfdHlwZTtcbiAgICB0aGlzLmVycm9yX21lc3NhZ2UgPSBkYXRhLmVycm9yX21lc3NhZ2U7XG4gICAgdGhpcy5lcnJvcl91cmwgPSBkYXRhLmVycm9yX3VybDtcbiAgfVxuXG59XG5cbmV4cG9ydHMuU3R5dGNoRXJyb3IgPSBTdHl0Y2hFcnJvcjtcblxuY2xhc3MgUmVxdWVzdEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCByZXF1ZXN0KSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG59XG5cbmV4cG9ydHMuUmVxdWVzdEVycm9yID0gUmVxdWVzdEVycm9yO1xuXG5jbGFzcyBDbGllbnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY29kZSwgbWVzc2FnZSwgY2F1c2UpIHtcbiAgICBsZXQgbXNnID0gYCR7Y29kZX06ICR7bWVzc2FnZX1gO1xuXG4gICAgaWYgKGNhdXNlKSB7XG4gICAgICBtc2cgKz0gYDogJHtjYXVzZX1gO1xuICAgIH1cblxuICAgIHN1cGVyKG1zZyk7XG4gICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB0aGlzLmNhdXNlID0gY2F1c2U7XG4gIH1cblxufVxuXG5leHBvcnRzLkNsaWVudEVycm9yID0gQ2xpZW50RXJyb3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgX2V4cG9ydE5hbWVzID0ge1xuICBDbGllbnQ6IHRydWUsXG4gIGVudnM6IHRydWUsXG4gIFVzZXJTZWFyY2hPcGVyYXRvcjogdHJ1ZVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNsaWVudFwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfY2xpZW50LkNsaWVudDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJVc2VyU2VhcmNoT3BlcmF0b3JcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3VzZXJzLlVzZXJTZWFyY2hPcGVyYXRvcjtcbiAgfVxufSk7XG5leHBvcnRzLmVudnMgPSB2b2lkIDA7XG5cbnZhciBfY2xpZW50ID0gcmVxdWlyZShcIi4vY2xpZW50XCIpO1xuXG52YXIgX2VudnMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9lbnZzXCIpKTtcblxuZXhwb3J0cy5lbnZzID0gX2VudnM7XG5cbnZhciBfdXNlcnMgPSByZXF1aXJlKFwiLi91c2Vyc1wiKTtcblxudmFyIF9lcnJvcnMgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG5cbk9iamVjdC5rZXlzKF9lcnJvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICBpZiAoa2V5ID09PSBcImRlZmF1bHRcIiB8fCBrZXkgPT09IFwiX19lc01vZHVsZVwiKSByZXR1cm47XG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX2V4cG9ydE5hbWVzLCBrZXkpKSByZXR1cm47XG4gIGlmIChrZXkgaW4gZXhwb3J0cyAmJiBleHBvcnRzW2tleV0gPT09IF9lcnJvcnNba2V5XSkgcmV0dXJuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfZXJyb3JzW2tleV07XG4gICAgfVxuICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGVCYWJlbEludGVyb3AgPSBuZXcgV2Vha01hcCgpOyB2YXIgY2FjaGVOb2RlSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gKG5vZGVJbnRlcm9wKSB7IHJldHVybiBub2RlSW50ZXJvcCA/IGNhY2hlTm9kZUludGVyb3AgOiBjYWNoZUJhYmVsSW50ZXJvcDsgfSkobm9kZUludGVyb3ApOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaiwgbm9kZUludGVyb3ApIHsgaWYgKCFub2RlSW50ZXJvcCAmJiBvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IGRlZmF1bHQ6IG9iaiB9OyB9IHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCk7IGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkgeyByZXR1cm4gY2FjaGUuZ2V0KG9iaik7IH0gdmFyIG5ld09iaiA9IHt9OyB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKGtleSAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDsgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpOyB9IGVsc2UgeyBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgaWYgKGNhY2hlKSB7IGNhY2hlLnNldChvYmosIG5ld09iaik7IH0gcmV0dXJuIG5ld09iajsgfSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5NYWdpY0xpbmtzID0gdm9pZCAwO1xuXG52YXIgX3NoYXJlZCA9IHJlcXVpcmUoXCIuL3NoYXJlZFwiKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG5jbGFzcyBFbWFpbCB7XG4gIGRlbGl2ZXJ5ID0gXCJlbWFpbFwiO1xuXG4gIGNvbnN0cnVjdG9yKGZldGNoQ29uZmlnLCBwYXJlbnRfcGF0aCkge1xuICAgIHRoaXMuZmV0Y2hDb25maWcgPSBmZXRjaENvbmZpZztcbiAgICB0aGlzLmJhc2VfcGF0aCA9IGAke3BhcmVudF9wYXRofWA7XG4gIH1cblxuICBlbmRwb2ludChwYXRoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZV9wYXRofS8ke3RoaXMuZGVsaXZlcnl9LyR7cGF0aH1gO1xuICB9XG5cbiAgc2VuZChkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQoXCJzZW5kXCIpLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgbG9naW5PckNyZWF0ZShkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQoXCJsb2dpbl9vcl9jcmVhdGVcIiksXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH1cblxuICBpbnZpdGUoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwiaW52aXRlXCIpLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgcmV2b2tlSW52aXRlKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcInJldm9rZV9pbnZpdGVcIiksXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH1cblxufVxuXG5jbGFzcyBNYWdpY0xpbmtzIHtcbiAgYmFzZV9wYXRoID0gXCJtYWdpY19saW5rc1wiO1xuXG4gIGNvbnN0cnVjdG9yKGZldGNoQ29uZmlnKSB7XG4gICAgdGhpcy5mZXRjaENvbmZpZyA9IGZldGNoQ29uZmlnO1xuICAgIHRoaXMuZW1haWwgPSBuZXcgRW1haWwoZmV0Y2hDb25maWcsIHRoaXMuYmFzZV9wYXRoKTtcbiAgfVxuXG4gIGVuZHBvaW50KHBhdGgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlX3BhdGh9LyR7cGF0aH1gO1xuICB9XG5cbiAgY3JlYXRlKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5iYXNlX3BhdGgsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSk7XG4gIH1cblxuICBhdXRoZW50aWNhdGUodG9rZW4sIGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcImF1dGhlbnRpY2F0ZVwiKSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIC4uLmRhdGFcbiAgICAgIH1cbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5yZXMsXG4gICAgICAgIHVzZXI6ICgwLCBfc2hhcmVkLnBhcnNlVXNlcikocmVzLnVzZXIpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0cy5NYWdpY0xpbmtzID0gTWFnaWNMaW5rczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuT0F1dGggPSB2b2lkIDA7XG5cbnZhciBfc2hhcmVkID0gcmVxdWlyZShcIi4vc2hhcmVkXCIpO1xuXG5jbGFzcyBPQXV0aCB7XG4gIGJhc2VfcGF0aCA9IFwib2F1dGhcIjtcblxuICBjb25zdHJ1Y3RvcihmZXRjaENvbmZpZykge1xuICAgIHRoaXMuZmV0Y2hDb25maWcgPSBmZXRjaENvbmZpZztcbiAgfVxuXG4gIGVuZHBvaW50KHBhdGgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlX3BhdGh9LyR7cGF0aH1gO1xuICB9XG5cbiAgYXV0aGVudGljYXRlKHRva2VuLCBkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQoXCJhdXRoZW50aWNhdGVcIiksXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICAuLi5kYXRhXG4gICAgICB9XG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmV0dXJuIHsgLi4ucmVzLFxuICAgICAgICB1c2VyOiAoMCwgX3NoYXJlZC5wYXJzZVVzZXIpKHJlcy51c2VyKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuT0F1dGggPSBPQXV0aDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuT1RQcyA9IHZvaWQgMDtcblxudmFyIF9zaGFyZWQgPSByZXF1aXJlKFwiLi9zaGFyZWRcIik7XG5cbmNsYXNzIEVtYWlsIHtcbiAgZGVsaXZlcnkgPSBcImVtYWlsXCI7XG5cbiAgY29uc3RydWN0b3IoZmV0Y2hDb25maWcsIGJhc2VfcGF0aCkge1xuICAgIHRoaXMuZmV0Y2hDb25maWcgPSBmZXRjaENvbmZpZztcbiAgICB0aGlzLmJhc2VfcGF0aCA9IGJhc2VfcGF0aDtcbiAgfVxuXG4gIGVuZHBvaW50KHBhdGgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlX3BhdGh9LyR7dGhpcy5kZWxpdmVyeX0vJHtwYXRofWA7XG4gIH1cblxuICBzZW5kKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcInNlbmRcIiksXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH1cblxuICBsb2dpbk9yQ3JlYXRlKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcImxvZ2luX29yX2NyZWF0ZVwiKSxcbiAgICAgIGRhdGFcbiAgICB9KTtcbiAgfVxuXG59XG5cbmNsYXNzIFNNUyB7XG4gIGRlbGl2ZXJ5ID0gXCJzbXNcIjtcblxuICBjb25zdHJ1Y3RvcihmZXRjaENvbmZpZywgYmFzZV9wYXRoKSB7XG4gICAgdGhpcy5mZXRjaENvbmZpZyA9IGZldGNoQ29uZmlnO1xuICAgIHRoaXMuYmFzZV9wYXRoID0gYmFzZV9wYXRoO1xuICB9XG5cbiAgZW5kcG9pbnQocGF0aCkge1xuICAgIHJldHVybiBgJHt0aGlzLmJhc2VfcGF0aH0vJHt0aGlzLmRlbGl2ZXJ5fS8ke3BhdGh9YDtcbiAgfVxuXG4gIHNlbmQoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwic2VuZFwiKSxcbiAgICAgIGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIGxvZ2luT3JDcmVhdGUoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwibG9naW5fb3JfY3JlYXRlXCIpLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbn1cblxuY2xhc3MgV2hhdHNBcHAge1xuICBkZWxpdmVyeSA9IFwid2hhdHNhcHBcIjtcblxuICBjb25zdHJ1Y3RvcihmZXRjaENvbmZpZywgYmFzZV9wYXRoKSB7XG4gICAgdGhpcy5mZXRjaENvbmZpZyA9IGZldGNoQ29uZmlnO1xuICAgIHRoaXMuYmFzZV9wYXRoID0gYmFzZV9wYXRoO1xuICB9XG5cbiAgZW5kcG9pbnQocGF0aCkge1xuICAgIHJldHVybiBgJHt0aGlzLmJhc2VfcGF0aH0vJHt0aGlzLmRlbGl2ZXJ5fS8ke3BhdGh9YDtcbiAgfVxuXG4gIHNlbmQoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwic2VuZFwiKSxcbiAgICAgIGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIGxvZ2luT3JDcmVhdGUoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwibG9naW5fb3JfY3JlYXRlXCIpLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbn1cblxuY2xhc3MgT1RQcyB7XG4gIGJhc2VfcGF0aCA9IFwib3Rwc1wiO1xuXG4gIGNvbnN0cnVjdG9yKGZldGNoQ29uZmlnKSB7XG4gICAgdGhpcy5mZXRjaENvbmZpZyA9IGZldGNoQ29uZmlnO1xuICAgIHRoaXMuZW1haWwgPSBuZXcgRW1haWwoZmV0Y2hDb25maWcsIHRoaXMuYmFzZV9wYXRoKTtcbiAgICB0aGlzLnNtcyA9IG5ldyBTTVMoZmV0Y2hDb25maWcsIHRoaXMuYmFzZV9wYXRoKTtcbiAgICB0aGlzLndoYXRzYXBwID0gbmV3IFdoYXRzQXBwKGZldGNoQ29uZmlnLCB0aGlzLmJhc2VfcGF0aCk7XG4gIH1cblxuICBlbmRwb2ludChwYXRoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZV9wYXRofS8ke3BhdGh9YDtcbiAgfVxuXG4gIGF1dGhlbnRpY2F0ZShkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQoXCJhdXRoZW50aWNhdGVcIiksXG4gICAgICBkYXRhXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmV0dXJuIHsgLi4ucmVzLFxuICAgICAgICB1c2VyOiAoMCwgX3NoYXJlZC5wYXJzZVVzZXIpKHJlcy51c2VyKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuT1RQcyA9IE9UUHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlNlc3Npb25zID0gdm9pZCAwO1xuXG52YXIgam9zZSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJqb3NlXCIpKTtcblxudmFyIF9zaGFyZWQgPSByZXF1aXJlKFwiLi9zaGFyZWRcIik7XG5cbnZhciBfZXJyb3JzID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGVCYWJlbEludGVyb3AgPSBuZXcgV2Vha01hcCgpOyB2YXIgY2FjaGVOb2RlSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gKG5vZGVJbnRlcm9wKSB7IHJldHVybiBub2RlSW50ZXJvcCA/IGNhY2hlTm9kZUludGVyb3AgOiBjYWNoZUJhYmVsSW50ZXJvcDsgfSkobm9kZUludGVyb3ApOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaiwgbm9kZUludGVyb3ApIHsgaWYgKCFub2RlSW50ZXJvcCAmJiBvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IGRlZmF1bHQ6IG9iaiB9OyB9IHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCk7IGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkgeyByZXR1cm4gY2FjaGUuZ2V0KG9iaik7IH0gdmFyIG5ld09iaiA9IHt9OyB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKGtleSAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDsgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpOyB9IGVsc2UgeyBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgaWYgKGNhY2hlKSB7IGNhY2hlLnNldChvYmosIG5ld09iaik7IH0gcmV0dXJuIG5ld09iajsgfVxuXG5jb25zdCBzZXNzaW9uQ2xhaW0gPSBcImh0dHBzOi8vc3R5dGNoLmNvbS9zZXNzaW9uXCI7XG5cbmNsYXNzIFNlc3Npb25zIHtcbiAgYmFzZV9wYXRoID0gXCJzZXNzaW9uc1wiO1xuXG4gIGNvbnN0cnVjdG9yKGZldGNoQ29uZmlnLCBqd3RDb25maWcpIHtcbiAgICB0aGlzLmZldGNoQ29uZmlnID0gZmV0Y2hDb25maWc7XG4gICAgdGhpcy5qd2tzQ2xpZW50ID0gand0Q29uZmlnLmp3a3M7XG4gICAgdGhpcy5qd3RPcHRpb25zID0ge1xuICAgICAgYXVkaWVuY2U6IGp3dENvbmZpZy5wcm9qZWN0SUQsXG4gICAgICBpc3N1ZXI6IGBzdHl0Y2guY29tLyR7and0Q29uZmlnLnByb2plY3RJRH1gLFxuICAgICAgdHlwOiBcIkpXVFwiXG4gICAgfTtcbiAgfVxuXG4gIGVuZHBvaW50KHBhdGgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlX3BhdGh9LyR7cGF0aH1gO1xuICB9XG5cbiAgZ2V0KHBhcmFtcykge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB1cmw6IHRoaXMuYmFzZV9wYXRoLFxuICAgICAgcGFyYW1zOiB7IC4uLnBhcmFtc1xuICAgICAgfVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJldHVybiB7IC4uLnJlcyxcbiAgICAgICAgc2Vzc2lvbnM6IHJlcy5zZXNzaW9ucy5tYXAocGFyc2VTZXNzaW9uKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGp3a3MocHJvamVjdF9pZCkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQoYGp3a3MvJHtwcm9qZWN0X2lkfWApXG4gICAgfSk7XG4gIH1cblxuICBhdXRoZW50aWNhdGUoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwiYXV0aGVudGljYXRlXCIpLFxuICAgICAgZGF0YVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJldHVybiB7IC4uLnJlcyxcbiAgICAgICAgdXNlcjogKDAsIF9zaGFyZWQucGFyc2VVc2VyKShyZXMudXNlciksXG4gICAgICAgIHNlc3Npb246IHBhcnNlU2Vzc2lvbihyZXMuc2Vzc2lvbilcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbiAgLyoqIFBhcnNlIGEgSldUIGFuZCB2ZXJpZnkgdGhlIHNpZ25hdHVyZSwgcHJlZmVycmluZyBsb2NhbCB2ZXJpZmljYXRpb24gb3ZlciByZW1vdGUuXG4gICAqXG4gICAqIElmIG1heF90b2tlbl9hZ2Vfc2Vjb25kcyBpcyBzZXQsIHJlbW90ZSB2ZXJpZmljYXRpb24gd2lsbCBiZSBmb3JjZWQgaWYgdGhlIEpXVCB3YXMgaXNzdWVkIGF0XG4gICAqIChiYXNlZCBvbiB0aGUgXCJpYXRcIiBjbGFpbSkgbW9yZSB0aGFuIHRoYXQgbWFueSBzZWNvbmRzIGFnby5cbiAgICpcbiAgICogVG8gZm9yY2UgcmVtb3RlIHZhbGlkYXRpb24gZm9yIGFsbCB0b2tlbnMsIHNldCBtYXhfdG9rZW5fYWdlX3NlY29uZHMgdG8gemVybyBvciB1c2UgdGhlXG4gICAqIGF1dGhlbnRpY2F0ZSBtZXRob2QgaW5zdGVhZC5cbiAgICovXG5cblxuICBhc3luYyBhdXRoZW50aWNhdGVKd3Qoand0LCBvcHRpb25zKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCB0aGlzLmF1dGhlbnRpY2F0ZUp3dExvY2FsKGp3dCwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZXNzaW9uLFxuICAgICAgICBzZXNzaW9uX2p3dDogand0XG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSldUIGNvdWxkIG5vdCBiZSB2ZXJpZmllZCBsb2NhbGx5LiBDaGVjayB3aXRoIHRoZSBTdHl0Y2ggQVBJLlxuICAgICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlKHtcbiAgICAgICAgc2Vzc2lvbl9qd3Q6IGp3dFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIC8qKiBQYXJzZSBhIEpXVCBhbmQgdmVyaWZ5IHRoZSBzaWduYXR1cmUgbG9jYWxseSAod2l0aG91dCBjYWxsaW5nIC9hdXRoZW50aWNhdGUgaW4gdGhlIEFQSSkuXG4gICAqXG4gICAqIElmIG1heFRva2VuQWdlIGlzIHNldCwgdGhpcyB3aWxsIHJldHVybiBhbiBlcnJvciBpZiB0aGUgSldUIHdhcyBpc3N1ZWQgKGJhc2VkIG9uIHRoZSBcImlhdFwiXG4gICAqIGNsYWltKSBtb3JlIHRoYW4gbWF4VG9rZW5BZ2Ugc2Vjb25kcyBhZ28uXG4gICAqXG4gICAqIElmIG1heF90b2tlbl9hZ2Vfc2Vjb25kcyBpcyBleHBsaWNpdGx5IHNldCB0byB6ZXJvLCBhbGwgdG9rZW5zIHdpbGwgYmUgY29uc2lkZXJlZCB0b28gb2xkLFxuICAgKiBldmVuIGlmIHRoZXkgYXJlIG90aGVyd2lzZSB2YWxpZC5cbiAgICpcbiAgICogVGhlIHZhbHVlIGZvciBjdXJyZW50X2RhdGUgaXMgdXNlZCB0byBjb21wYXJlIHRpbWVzdGFtcCBjbGFpbXMgKFwiZXhwXCIsIFwibmJmXCIsIFwiaWF0XCIpLiBJdFxuICAgKiBkZWZhdWx0cyB0byB0aGUgY3VycmVudCBkYXRlIChuZXcgRGF0ZSgpKS5cbiAgICpcbiAgICogVGhlIHZhbHVlIGZvciBjbG9ja190b2xlcmFuY2Vfc2Vjb25kcyBpcyB0aGUgbWF4aW11bSBhbGxvd2FibGUgZGlmZmVyZW5jZSB3aGVuIGNvbXBhcmluZ1xuICAgKiB0aW1lc3RhbXBzLiBJdCBkZWZhdWx0cyB0byB6ZXJvLlxuICAgKi9cblxuXG4gIGFzeW5jIGF1dGhlbnRpY2F0ZUp3dExvY2FsKGp3dCwgb3B0aW9ucykge1xuICAgIGNvbnN0IG5vdyA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY3VycmVudF9kYXRlKSB8fCBuZXcgRGF0ZSgpO1xuICAgIGxldCBwYXlsb2FkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgam9zZS5qd3RWZXJpZnkoand0LCB0aGlzLmp3a3NDbGllbnQsIHsgLi4udGhpcy5qd3RPcHRpb25zLFxuICAgICAgICBjbG9ja1RvbGVyYW5jZTogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNsb2NrX3RvbGVyYW5jZV9zZWNvbmRzLFxuICAgICAgICBjdXJyZW50RGF0ZTogbm93IC8vIERvbid0IHBhc3MgbWF4VG9rZW5BZ2UgZGlyZWN0bHkgdG8gand0VmVyaWZ5IGJlY2F1c2UgaXQgaW50ZXJwcmV0cyB6ZXJvIGFzIFwiaW5maW5pdHlcIi5cbiAgICAgICAgLy8gV2Ugd2FudCB6ZXJvIHRvIG1lYW4gXCJldmVyeSB0b2tlbiBpcyBzdGFsZVwiIGFuZCBmb3JjZSByZW1vdGUgdmVyaWZpY2F0aW9uLlxuXG4gICAgICB9KTtcbiAgICAgIHBheWxvYWQgPSB0b2tlbi5wYXlsb2FkO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3cgbmV3IF9lcnJvcnMuQ2xpZW50RXJyb3IoXCJqd3RfaW52YWxpZFwiLCBcIkNvdWxkIG5vdCB2ZXJpZnkgSldUXCIsIGVycik7XG4gICAgfVxuXG4gICAgY29uc3QgbWF4VG9rZW5BZ2UgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubWF4X3Rva2VuX2FnZV9zZWNvbmRzO1xuXG4gICAgaWYgKG1heFRva2VuQWdlICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGlhdCA9IHBheWxvYWQuaWF0O1xuXG4gICAgICBpZiAoIWlhdCkge1xuICAgICAgICB0aHJvdyBuZXcgX2Vycm9ycy5DbGllbnRFcnJvcihcImp3dF9pbnZhbGlkXCIsIFwiSldUIHdhcyBtaXNzaW5nIGlhdCBjbGFpbVwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm93RXBvY2ggPSArbm93IC8gMTAwMDsgLy8gRXBvY2ggc2Vjb25kcyBmcm9tIG1pbGxpc2Vjb25kc1xuXG4gICAgICBpZiAobm93RXBvY2ggLSBpYXQgPj0gbWF4VG9rZW5BZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IF9lcnJvcnMuQ2xpZW50RXJyb3IoXCJqd3RfdG9vX29sZFwiLCBgSldUIHdhcyBpc3N1ZWQgYXQgJHtpYXR9LCBtb3JlIHRoYW4gJHttYXhUb2tlbkFnZX0gc2Vjb25kcyBhZ29gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjbGFpbSA9IHBheWxvYWRbc2Vzc2lvbkNsYWltXTtcbiAgICByZXR1cm4ge1xuICAgICAgc2Vzc2lvbl9pZDogY2xhaW0uaWQsXG4gICAgICBhdHRyaWJ1dGVzOiBjbGFpbS5hdHRyaWJ1dGVzLFxuICAgICAgYXV0aGVudGljYXRpb25fZmFjdG9yczogY2xhaW0uYXV0aGVudGljYXRpb25fZmFjdG9ycyxcbiAgICAgIHVzZXJfaWQ6IHBheWxvYWQuc3ViIHx8IFwiXCIsXG4gICAgICAvLyBQYXJzZSB0aGUgdGltZXN0YW1wcyBpbnRvIERhdGVzLiBUaGUgSldUIGV4cGlyYXRpb24gdGltZSBpcyB0aGUgc2FtZSBhcyB0aGUgc2Vzc2lvbidzLlxuICAgICAgLy8gVGhlIGV4cCBjbGFpbSBpcyBhIFVuaXggdGltZXN0YW1wIGluIHNlY29uZHMsIHNvIGNvbnZlcnQgaXQgdG8gbWlsbGlzZWNvbmRzIGZpcnN0LiBUaGVcbiAgICAgIC8vIG90aGVyIHRpbWVzdGFtcHMgYXJlIFJGQzMzMzktZm9ybWF0dGVkIHN0cmluZ3MuXG4gICAgICBzdGFydGVkX2F0OiBuZXcgRGF0ZShjbGFpbS5zdGFydGVkX2F0KSxcbiAgICAgIGxhc3RfYWNjZXNzZWRfYXQ6IG5ldyBEYXRlKGNsYWltLmxhc3RfYWNjZXNzZWRfYXQpLFxuICAgICAgLy8gRm9yIEpXVHMgdGhhdCBpbmNsdWRlIGl0LCBwcmVmZXIgdGhlIGlubmVyIGV4cGlyZXNfYXQgY2xhaW0uXG4gICAgICBleHBpcmVzX2F0OiBuZXcgRGF0ZShjbGFpbS5leHBpcmVzX2F0IHx8IChwYXlsb2FkLmV4cCB8fCAwKSAqIDEwMDApXG4gICAgfTtcbiAgfVxuXG4gIHJldm9rZShkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQoXCJyZXZva2VcIiksXG4gICAgICBkYXRhXG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnRzLlNlc3Npb25zID0gU2Vzc2lvbnM7XG5cbmZ1bmN0aW9uIHBhcnNlU2Vzc2lvbihzZXNzaW9uKSB7XG4gIGNvbnN0IHN0YXJ0ZWRfYXQgPSBuZXcgRGF0ZShzZXNzaW9uLnN0YXJ0ZWRfYXQpO1xuICBjb25zdCBsYXN0X2FjY2Vzc2VkX2F0ID0gbmV3IERhdGUoc2Vzc2lvbi5sYXN0X2FjY2Vzc2VkX2F0KTtcbiAgY29uc3QgZXhwaXJlc19hdCA9IG5ldyBEYXRlKHNlc3Npb24uZXhwaXJlc19hdCk7XG4gIHJldHVybiB7IC4uLnNlc3Npb24sXG4gICAgc3RhcnRlZF9hdCxcbiAgICBleHBpcmVzX2F0LFxuICAgIGxhc3RfYWNjZXNzZWRfYXRcbiAgfTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVxdWVzdCA9IHJlcXVlc3Q7XG5leHBvcnRzLnBhcnNlVXNlciA9IHBhcnNlVXNlcjtcblxudmFyIF9lcnJvcnMgPSByZXF1aXJlKFwiLi9lcnJvcnNcIik7XG5cbnZhciBmZXRjaEltcG9ydCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCJpc29tb3JwaGljLXVuZmV0Y2hcIikpO1xuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGVCYWJlbEludGVyb3AgPSBuZXcgV2Vha01hcCgpOyB2YXIgY2FjaGVOb2RlSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gKG5vZGVJbnRlcm9wKSB7IHJldHVybiBub2RlSW50ZXJvcCA/IGNhY2hlTm9kZUludGVyb3AgOiBjYWNoZUJhYmVsSW50ZXJvcDsgfSkobm9kZUludGVyb3ApOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaiwgbm9kZUludGVyb3ApIHsgaWYgKCFub2RlSW50ZXJvcCAmJiBvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IGRlZmF1bHQ6IG9iaiB9OyB9IHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCk7IGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkgeyByZXR1cm4gY2FjaGUuZ2V0KG9iaik7IH0gdmFyIG5ld09iaiA9IHt9OyB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKGtleSAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDsgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpOyB9IGVsc2UgeyBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgaWYgKGNhY2hlKSB7IGNhY2hlLnNldChvYmosIG5ld09iaik7IH0gcmV0dXJuIG5ld09iajsgfVxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGV2ZWxvcGl0L3VuZmV0Y2gvaXNzdWVzLzk5XG5jb25zdCBmZXRjaCA9IGZldGNoSW1wb3J0LmRlZmF1bHQgfHwgZmV0Y2hJbXBvcnQ7XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3QoZmV0Y2hDb25maWcsIHJlcXVlc3RDb25maWcpIHtcbiAgY29uc3QgdXJsID0gbmV3IFVSTChyZXF1ZXN0Q29uZmlnLnVybCwgZmV0Y2hDb25maWcuYmFzZVVSTCk7XG5cbiAgaWYgKHJlcXVlc3RDb25maWcucGFyYW1zKSB7XG4gICAgT2JqZWN0LmVudHJpZXMocmVxdWVzdENvbmZpZy5wYXJhbXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4gdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCBTdHJpbmcodmFsdWUpKSk7XG4gIH1cblxuICBsZXQgcmVzcG9uc2U7XG5cbiAgdHJ5IHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybC50b1N0cmluZygpLCB7XG4gICAgICBtZXRob2Q6IHJlcXVlc3RDb25maWcubWV0aG9kLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdENvbmZpZy5kYXRhKSxcbiAgICAgIC4uLmZldGNoQ29uZmlnXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zdCBlcnIgPSBlO1xuICAgIHRocm93IG5ldyBfZXJyb3JzLlJlcXVlc3RFcnJvcihlcnIubWVzc2FnZSwgcmVxdWVzdENvbmZpZyk7XG4gIH1cblxuICBsZXQgcmVzcG9uc2VKU09OO1xuXG4gIHRyeSB7XG4gICAgcmVzcG9uc2VKU09OID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc3QgZXJyID0gZTtcbiAgICB0aHJvdyBuZXcgX2Vycm9ycy5SZXF1ZXN0RXJyb3IoYFVuYWJsZSB0byBwYXJzZSBKU09OIHJlc3BvbnNlIGZyb20gc2VydmVyOiAke2Vyci5tZXNzYWdlfWAsIHJlcXVlc3RDb25maWcpO1xuICB9XG5cbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSA0MDApIHtcbiAgICB0aHJvdyBuZXcgX2Vycm9ycy5TdHl0Y2hFcnJvcihyZXNwb25zZUpTT04pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3BvbnNlSlNPTjtcbn1cblxuZnVuY3Rpb24gcGFyc2VVc2VyKHVzZXIpIHtcbiAgcmV0dXJuIHsgLi4udXNlcixcbiAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSh1c2VyLmNyZWF0ZWRfYXQpXG4gIH07XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlRPVFBzID0gdm9pZCAwO1xuXG52YXIgX3NoYXJlZCA9IHJlcXVpcmUoXCIuL3NoYXJlZFwiKTtcblxuY2xhc3MgVE9UUHMge1xuICBiYXNlX3BhdGggPSBcInRvdHBzXCI7XG5cbiAgY29uc3RydWN0b3IoZmV0Y2hDb25maWcpIHtcbiAgICB0aGlzLmZldGNoQ29uZmlnID0gZmV0Y2hDb25maWc7XG4gIH1cblxuICBlbmRwb2ludChwYXRoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZV9wYXRofS8ke3BhdGh9YDtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuYmFzZV9wYXRoLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgYXV0aGVudGljYXRlKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcImF1dGhlbnRpY2F0ZVwiKSxcbiAgICAgIGRhdGFcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5yZXMsXG4gICAgICAgIHVzZXI6ICgwLCBfc2hhcmVkLnBhcnNlVXNlcikocmVzLnVzZXIpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcmVjb3ZlcnlDb2RlcyhkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQoXCJyZWNvdmVyeV9jb2Rlc1wiKSxcbiAgICAgIGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIHJlY292ZXIoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwicmVjb3ZlclwiKSxcbiAgICAgIGRhdGFcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5yZXMsXG4gICAgICAgIHVzZXI6ICgwLCBfc2hhcmVkLnBhcnNlVXNlcikocmVzLnVzZXIpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0cy5UT1RQcyA9IFRPVFBzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Vc2VycyA9IGV4cG9ydHMuVXNlclNlYXJjaEl0ZXJhdG9yID0gZXhwb3J0cy5Vc2VyU2VhcmNoT3BlcmF0b3IgPSB2b2lkIDA7XG5cbnZhciBfc2hhcmVkID0gcmVxdWlyZShcIi4vc2hhcmVkXCIpO1xuXG5sZXQgVXNlclNlYXJjaE9wZXJhdG9yO1xuZXhwb3J0cy5Vc2VyU2VhcmNoT3BlcmF0b3IgPSBVc2VyU2VhcmNoT3BlcmF0b3I7XG5cbihmdW5jdGlvbiAoVXNlclNlYXJjaE9wZXJhdG9yKSB7XG4gIFVzZXJTZWFyY2hPcGVyYXRvcltcIk9SXCJdID0gXCJPUlwiO1xuICBVc2VyU2VhcmNoT3BlcmF0b3JbXCJBTkRcIl0gPSBcIkFORFwiO1xufSkoVXNlclNlYXJjaE9wZXJhdG9yIHx8IChleHBvcnRzLlVzZXJTZWFyY2hPcGVyYXRvciA9IFVzZXJTZWFyY2hPcGVyYXRvciA9IHt9KSk7XG5cbnZhciBtb2RlO1xuXG4oZnVuY3Rpb24gKG1vZGUpIHtcbiAgbW9kZVttb2RlW1wicGVuZGluZ1wiXSA9IDBdID0gXCJwZW5kaW5nXCI7XG4gIG1vZGVbbW9kZVtcImluUHJvZ3Jlc3NcIl0gPSAxXSA9IFwiaW5Qcm9ncmVzc1wiO1xuICBtb2RlW21vZGVbXCJjb21wbGV0ZVwiXSA9IDJdID0gXCJjb21wbGV0ZVwiO1xufSkobW9kZSB8fCAobW9kZSA9IHt9KSk7XG5cbmNsYXNzIFVzZXJTZWFyY2hJdGVyYXRvciB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgZGF0YSkge1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5tb2RlID0gbW9kZS5wZW5kaW5nO1xuICB9XG5cbiAgYXN5bmMgbmV4dCgpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmNsaWVudC5zZWFyY2godGhpcy5kYXRhKTtcbiAgICB0aGlzLmRhdGEgPSB7IC4uLnRoaXMuZGF0YSxcbiAgICAgIGN1cnNvcjogcmVzLnJlc3VsdHNfbWV0YWRhdGEubmV4dF9jdXJzb3JcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLmRhdGEuY3Vyc29yKSB7XG4gICAgICB0aGlzLm1vZGUgPSBtb2RlLmNvbXBsZXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vZGUgPSBtb2RlLmluUHJvZ3Jlc3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5yZXN1bHRzO1xuICB9XG5cbiAgaGFzTmV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlICE9PSBtb2RlLmNvbXBsZXRlO1xuICB9XG5cbiAgYXN5bmMgKltTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKSB7XG4gICAgd2hpbGUgKHRoaXMuaGFzTmV4dCgpKSB7XG4gICAgICB5aWVsZCB0aGlzLm5leHQoKTtcbiAgICB9XG4gIH1cblxufVxuXG5leHBvcnRzLlVzZXJTZWFyY2hJdGVyYXRvciA9IFVzZXJTZWFyY2hJdGVyYXRvcjtcblxuY2xhc3MgVXNlcnMge1xuICBiYXNlX3BhdGggPSBcInVzZXJzXCI7XG5cbiAgY29uc3RydWN0b3IoZmV0Y2hDb25maWcpIHtcbiAgICB0aGlzLmZldGNoQ29uZmlnID0gZmV0Y2hDb25maWc7XG4gIH1cblxuICBlbmRwb2ludChwYXRoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuYmFzZV9wYXRofS8ke3BhdGh9YDtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuYmFzZV9wYXRoLFxuICAgICAgZGF0YVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJldHVybiB7IC4uLnJlcyxcbiAgICAgICAgdXNlcjogKDAsIF9zaGFyZWQucGFyc2VVc2VyKShyZXMudXNlcilcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXQodXNlcklEKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludCh1c2VySUQpXG4gICAgfSkudGhlbihyZXMgPT4gKHsgLi4ucmVzLFxuICAgICAgLi4uKDAsIF9zaGFyZWQucGFyc2VVc2VyKShyZXMpXG4gICAgfSkpO1xuICB9XG5cbiAgc2VhcmNoKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcInNlYXJjaFwiKSxcbiAgICAgIGRhdGFcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5yZXMsXG4gICAgICAgIHJlc3VsdHM6IHJlcy5yZXN1bHRzLm1hcChfc2hhcmVkLnBhcnNlVXNlcilcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBzZWFyY2hBbGwoZGF0YSkge1xuICAgIHJldHVybiBuZXcgVXNlclNlYXJjaEl0ZXJhdG9yKHRoaXMsIGRhdGEpO1xuICB9XG5cbiAgdXBkYXRlKHVzZXJJRCwgZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQodXNlcklEKSxcbiAgICAgIGRhdGFcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5yZXMsXG4gICAgICAgIHVzZXI6ICgwLCBfc2hhcmVkLnBhcnNlVXNlcikocmVzLnVzZXIpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlKHVzZXJJRCkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQodXNlcklEKVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGVuZGluZyhwYXJhbXMpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwicGVuZGluZ1wiKSxcbiAgICAgIHBhcmFtczogeyAuLi5wYXJhbXNcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZUVtYWlsKGVtYWlsSUQpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KGBlbWFpbHMvJHtlbWFpbElEfWApXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmV0dXJuIHsgLi4ucmVzLFxuICAgICAgICB1c2VyOiAoMCwgX3NoYXJlZC5wYXJzZVVzZXIpKHJlcy51c2VyKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZVBob25lTnVtYmVyKHBob25lSUQpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KGBwaG9uZV9udW1iZXJzLyR7cGhvbmVJRH1gKVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJldHVybiB7IC4uLnJlcyxcbiAgICAgICAgdXNlcjogKDAsIF9zaGFyZWQucGFyc2VVc2VyKShyZXMudXNlcilcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVXZWJBdXRoblJlZ2lzdHJhdGlvbih3ZWJBdXRoblJlZ2lzdHJhdGlvbklEKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChgd2ViYXV0aG5fcmVnaXN0cmF0aW9ucy8ke3dlYkF1dGhuUmVnaXN0cmF0aW9uSUR9YClcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5yZXMsXG4gICAgICAgIHVzZXI6ICgwLCBfc2hhcmVkLnBhcnNlVXNlcikocmVzLnVzZXIpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlVE9UUCh0b3RwSUQpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KGB0b3Rwcy8ke3RvdHBJRH1gKVxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJldHVybiB7IC4uLnJlcyxcbiAgICAgICAgdXNlcjogKDAsIF9zaGFyZWQucGFyc2VVc2VyKShyZXMudXNlcilcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVDcnlwdG9XYWxsZXQoY3J5cHRvV2FsbGV0SUQpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KGBjcnlwdG9fd2FsbGV0cy8ke2NyeXB0b1dhbGxldElEfWApXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmV0dXJuIHsgLi4ucmVzLFxuICAgICAgICB1c2VyOiAoMCwgX3NoYXJlZC5wYXJzZVVzZXIpKHJlcy51c2VyKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydHMuVXNlcnMgPSBVc2VyczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuV2ViQXV0aG4gPSB2b2lkIDA7XG5cbnZhciBfc2hhcmVkID0gcmVxdWlyZShcIi4vc2hhcmVkXCIpO1xuXG5jbGFzcyBXZWJBdXRobiB7XG4gIGJhc2VfcGF0aCA9IFwid2ViYXV0aG5cIjtcblxuICBjb25zdHJ1Y3RvcihmZXRjaENvbmZpZykge1xuICAgIHRoaXMuZmV0Y2hDb25maWcgPSBmZXRjaENvbmZpZztcbiAgfVxuXG4gIGVuZHBvaW50KHBhdGgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5iYXNlX3BhdGh9LyR7cGF0aH1gO1xuICB9XG5cbiAgcmVnaXN0ZXJTdGFydChkYXRhKSB7XG4gICAgcmV0dXJuICgwLCBfc2hhcmVkLnJlcXVlc3QpKHRoaXMuZmV0Y2hDb25maWcsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IHRoaXMuZW5kcG9pbnQoXCJyZWdpc3Rlci9zdGFydFwiKSxcbiAgICAgIGRhdGFcbiAgICB9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcInJlZ2lzdGVyXCIpLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgYXV0aGVudGljYXRlU3RhcnQoZGF0YSkge1xuICAgIHJldHVybiAoMCwgX3NoYXJlZC5yZXF1ZXN0KSh0aGlzLmZldGNoQ29uZmlnLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50KFwiYXV0aGVudGljYXRlL3N0YXJ0XCIpLFxuICAgICAgZGF0YVxuICAgIH0pO1xuICB9XG5cbiAgYXV0aGVudGljYXRlKGRhdGEpIHtcbiAgICByZXR1cm4gKDAsIF9zaGFyZWQucmVxdWVzdCkodGhpcy5mZXRjaENvbmZpZywge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludChcImF1dGhlbnRpY2F0ZVwiKSxcbiAgICAgIGRhdGFcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4geyAuLi5yZXMsXG4gICAgICAgIHVzZXI6ICgwLCBfc2hhcmVkLnBhcnNlVXNlcikocmVzLnVzZXIpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0cy5XZWJBdXRobiA9IFdlYkF1dGhuOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGUsbil7cmV0dXJuIG49bnx8e30sbmV3IFByb21pc2UoZnVuY3Rpb24odCxyKXt2YXIgcz1uZXcgWE1MSHR0cFJlcXVlc3Qsbz1bXSx1PVtdLGk9e30sYT1mdW5jdGlvbigpe3JldHVybntvazoyPT0ocy5zdGF0dXMvMTAwfDApLHN0YXR1c1RleHQ6cy5zdGF0dXNUZXh0LHN0YXR1czpzLnN0YXR1cyx1cmw6cy5yZXNwb25zZVVSTCx0ZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIFByb21pc2UucmVzb2x2ZShzLnJlc3BvbnNlVGV4dCl9LGpzb246ZnVuY3Rpb24oKXtyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHMucmVzcG9uc2VUZXh0KS50aGVuKEpTT04ucGFyc2UpfSxibG9iOmZ1bmN0aW9uKCl7cmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbcy5yZXNwb25zZV0pKX0sY2xvbmU6YSxoZWFkZXJzOntrZXlzOmZ1bmN0aW9uKCl7cmV0dXJuIG99LGVudHJpZXM6ZnVuY3Rpb24oKXtyZXR1cm4gdX0sZ2V0OmZ1bmN0aW9uKGUpe3JldHVybiBpW2UudG9Mb3dlckNhc2UoKV19LGhhczpmdW5jdGlvbihlKXtyZXR1cm4gZS50b0xvd2VyQ2FzZSgpaW4gaX19fX07Zm9yKHZhciBsIGluIHMub3BlbihuLm1ldGhvZHx8XCJnZXRcIixlLCEwKSxzLm9ubG9hZD1mdW5jdGlvbigpe3MuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkucmVwbGFjZSgvXiguKj8pOlteXFxTXFxuXSooW1xcc1xcU10qPykkL2dtLGZ1bmN0aW9uKGUsbix0KXtvLnB1c2gobj1uLnRvTG93ZXJDYXNlKCkpLHUucHVzaChbbix0XSksaVtuXT1pW25dP2lbbl0rXCIsXCIrdDp0fSksdChhKCkpfSxzLm9uZXJyb3I9cixzLndpdGhDcmVkZW50aWFscz1cImluY2x1ZGVcIj09bi5jcmVkZW50aWFscyxuLmhlYWRlcnMpcy5zZXRSZXF1ZXN0SGVhZGVyKGwsbi5oZWFkZXJzW2xdKTtzLnNlbmQobi5ib2R5fHxudWxsKX0pfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5mZXRjaC5tb2R1bGUuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWxhbWJkYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJidWZmZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncmFwaHFsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBvbGxvLXNlcnZlci50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==