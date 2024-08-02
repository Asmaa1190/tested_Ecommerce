import { Router } from "express";
import { changUserPassword, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";


const authrouter=Router()
authrouter.post('/singup',checkEmail,signup)
authrouter.post('/singin',signin)
authrouter.patch('/changepassword',changUserPassword)

export default authrouter

