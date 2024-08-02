
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getOnedoc } from '../handelfunction.js'
import { ApiFeature } from '../utils/apiFeature.js'
import { Review } from '../../../database/models/review.model.js'


export const addReview = catchError(async (req, res, next) => {
    req.body.user=req.user._id
    let isExist= await Review.findOne({user:req.user._id,product:req.body.product})
    if(isExist)return next(new appError('you already added review',409))
    let review = new Review(req.body)
    await review.save()
    res.status(201).json({ message: "Review added successfully", review })
})

export const allReviews = catchError(async (req, res, next) => {
    let apiFeature=new ApiFeature(Review.find(),req.query)
    .pagination()
    .fields()
    .filter()
    .search()
    .sort()
        let reviews=await apiFeature.mongooseQuery
        res.status(201).json({ message: "success", page:apiFeature.pageNumber,reviews})
  
})
export const getReview = getOnedoc(Review)

export const updateReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id}, req.body, { new: true })
    review || next(new appError('Review not found or you not the owner', 404))
    !review || res.status(201).json({ message: "success", review })
})
export const deleteReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndDelete({_id:req.params.id,user:req.user._id})
    review || next(new appError('Review not found or you not the owner', 404))
    !review || res.status(201).json({ message: "success", review })
})