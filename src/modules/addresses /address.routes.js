import { Router } from "express";
import * as A from "./address.controller.js";
import { allowedTo, protectRoutes } from "../authantication/auth.controller.js";

const addressRouter=Router()
addressRouter
.route('/')
.patch(protectRoutes,allowedTo('user'),A.addAddresses)
.get(protectRoutes,allowedTo('user'),A.getLoggedUserAddress)


addressRouter.route('/:id')
.delete(protectRoutes,allowedTo('user','admin'),A.removeAddress)

export default addressRouter
