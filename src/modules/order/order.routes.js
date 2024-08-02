import { Router } from "express";
import * as o from "./order.controller.js";
import { allowedTo, protectRoutes } from "../authantication/auth.controller.js";

const orderRouter=Router()
orderRouter
.route('/')
.get(protectRoutes,allowedTo('admin'),o.getAllOrder)
orderRouter.get('/users',protectRoutes,allowedTo('user','admin'),o.getUserOrder)
// .delete(protectRoutes,allowedTo('user'),c.clearUserCart)


orderRouter.route('/:id')
.post(protectRoutes,allowedTo('user'),o.creatCashOrder)
orderRouter.post('/checkout/:id',protectRoutes,allowedTo('user'),o.creatCheckOutSession)

export default orderRouter
