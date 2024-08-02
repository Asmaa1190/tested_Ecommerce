import { Router } from "express";
import * as u from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";


const userRouter=Router()
userRouter
.route('/')
.post(checkEmail,u.addUser)
.get(u.allusers)
userRouter.route('/:id')
.get(u.getUser)
.put(u.updateUser)
.delete(u.deleteuser)

export default userRouter
