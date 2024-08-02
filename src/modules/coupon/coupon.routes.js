import { Router } from "express";
import * as c from "./coupon.controller.js";
import { allowedTo, protectRoutes } from "../authantication/auth.controller.js";

const couponRouter=Router()
couponRouter.use(protectRoutes,allowedTo('admin'))
couponRouter
.route('/')
.post(c.addCoupon)
.get(c.allCoupons)
couponRouter.route('/:id')
.get(c.getCoupon)
.put(c.updateCoupon)
.delete(c.deleteCoupon)

export default couponRouter
