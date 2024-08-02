
import slugify from 'slugify'
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from '../../../database/models/brand.model.js'
import { deleteOne, getOnedoc } from '../handelfunction.js'
import { ApiFeature } from '../utils/apiFeature.js'
import { User } from '../../../database/models/user.model.js'

export const addToWishlist = catchError(async (req, res, next) => {
   
    let wishList = await User.findByIdAndUpdate(req.user._id,{$addToSet:{
        wishList:req.body.product}}, { new: true })
    
    wishList || next(new appError('Wishlist not found', 404))
    !wishList || res.status(201).json({ message: "success", wishList:wishList.wishList })
})
export const removeFromWishlist = catchError(async (req, res, next) => {
   
    let wishList = await User.findByIdAndUpdate(req.user._id,{$pull:{
        wishList:req.params.id}}, { new: true })
    
    wishList || next(new appError('Wishlist not found or deleted', 404))
    !wishList || res.status(201).json({ message: "success", wishList:wishList.wishList })
})
export const getLoggedUserWishList = catchError(async (req, res, next) => {
   
    let wishList = await User.findById(req.user._id).populate('wishList')
    
    wishList || next(new appError('you must be logged first', 404))
    !wishList || res.status(201).json({ message: "success", wishList:wishList.wishList })
})
