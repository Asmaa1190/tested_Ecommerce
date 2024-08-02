import { Router } from "express";
import * as c from "./cart.controller.js";
import { allowedTo, protectRoutes } from "../authantication/auth.controller.js";

const cartRouter=Router()
cartRouter
.route('/')
.post(protectRoutes,allowedTo('user'),c.addToCart)
.get(protectRoutes,allowedTo('user'),c.getLoggedUserCart)
.delete(protectRoutes,allowedTo('user'),c.clearUserCart)


cartRouter.route('/:id')
.put(protectRoutes,allowedTo('user'),c.updateCartQuantity)
.delete(protectRoutes,allowedTo('user'),c.removeItemFromCart)
cartRouter.post('/applyCoupon',protectRoutes,allowedTo('user'),c.applyCoupon)

export default cartRouter
