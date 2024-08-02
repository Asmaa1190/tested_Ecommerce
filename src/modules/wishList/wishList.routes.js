import { Router } from "express";
import * as w from "./wishList.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUplod.js";
import { allowedTo, protectRoutes } from "../authantication/auth.controller.js";

const wishListRouter=Router()
wishListRouter
.route('/')
.patch(protectRoutes,allowedTo('user'),w.addToWishlist)
.get(protectRoutes,allowedTo('user'),w.getLoggedUserWishList)


wishListRouter.route('/:id')
.delete(protectRoutes,allowedTo('user','admin'),w.removeFromWishlist)

export default wishListRouter
