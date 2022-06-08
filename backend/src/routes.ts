import { Router } from "express";
import * as stytch from "stytch";
import dotenv from "dotenv";
import { SendOTPBySMSResponse } from "stytch/types/lib/otps";
import { StytchError } from "stytch";

//load environment variables
dotenv.config();

const routes = Router();

const stytch_client = new stytch.Client({
	project_id: process.env.STYTCH_PROJECT_ID,
	secret: process.env.STYTCH_SECRET,
	env: stytch.envs.test,
});

const params = {
	phone_number: "+12025550162",
};

routes.get("/", (req, res) => {
	return res.json({ message: "Hello World" });
});

routes.get("/preauth/", async (req, res) => {
	const userContact = String(req.query.userContact);
	const resp =
		String(req.query.authenticationMedium) === "PHONE"
			? await stytch_client.otps.sms.loginOrCreate({
					phone_number: "+10000000000",
			  })
			: await stytch_client.otps.email.loginOrCreate({
					email: userContact,
			  });

	return res.json(resp);
});

routes.get("/verify-code/", async (req, res) => {
	try {
		const resp = await stytch_client.otps.authenticate({
			method_id: String(req.query.methodID),
			code: String(req.query.passcode),
		});
		return res.json(resp);
	} catch (e) {
		res.send(e);
	}
});

export default routes;
