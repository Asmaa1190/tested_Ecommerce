
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getOnedoc } from '../handelfunction.js'
import { Coupon } from '../../../database/models/copoun.model.js'



export const addCoupon = catchError(async (req, res, next) => {
let isExist=await Coupon.findOne({code:req.body.code})
if(isExist)return next(new appError("coupon already exist",409))
    let coupon = new Coupon(req.body)
    await coupon.save()
    res.status(201).json({ message: "Coupon added successfully", coupon })
})

export const allCoupons = catchError(async (req, res, next) => {
    let coupons = await Coupon.find()
    res.status(201).json({ message: "success",  coupons })

})
export const getCoupon = getOnedoc(Coupon)

export const updateCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
    coupon || next(new appError('Coupon not found', 404))
    !coupon || res.status(201).json({ message: "success", coupon })
})
export const deleteCoupon = deleteOne(Coupon)