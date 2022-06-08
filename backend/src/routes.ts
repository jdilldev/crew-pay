import { Router } from 'express';
import * as stytch from 'stytch'
import dotenv from 'dotenv' 
import { SendOTPBySMSResponse } from 'stytch/types/lib/otps';

//load environment variables
dotenv.config()

const routes = Router();

const stytch_client = new stytch.Client({
    project_id: process.env.STYTCH_PROJECT_ID,
    secret:process.env.STYTCH_SECRET,
    env: stytch.envs.test,
  }
);

const params = {
    phone_number: "+12025550162",
};


routes.get('/', (req, res) => {
   
  return res.json({ message: 'Hello World' });
});

routes.get('/preauth/', async (req, res) => {
   // console.log(req.query.ace)
    const resp:SendOTPBySMSResponse = await stytch_client.otps.sms.loginOrCreate({ phone_number: '+10000000000' })

  return res.json(resp)
});

routes.get('/verify-passcode/', async(req,res) => {
    const resp = await stytch_client.otps.authenticate({ method_id:'',code:'000000'})

  return res.json(resp)
});

export default routes;