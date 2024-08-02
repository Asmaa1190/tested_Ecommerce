import { Router } from "express";
import * as R from './review.controller.js'
import { allowedTo, protectRoutes } from "../authantication/auth.controller.js";

const reviewRouter=Router()
reviewRouter
.route('/')
.post(protectRoutes,allowedTo('user'),R.addReview)
.get(R.allReviews)
reviewRouter.route('/:id')
.get(R.getReview)
.put(protectRoutes,allowedTo('user'),R.updateReview)
.delete(protectRoutes,allowedTo('user','admin'),R.deleteReview)

export default reviewRouter
