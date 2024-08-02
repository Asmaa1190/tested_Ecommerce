
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from '../../../database/models/user.model.js'

export const addAddresses = catchError(async (req, res, next) => {
   
    let address = await User.findByIdAndUpdate(req.user._id,{$push:{
        addresses:req.body}}, { new: true })
    
    address || next(new appError('address not found', 404))
    !address || res.status(201).json({ message: "success", address })
})
export const removeAddress = catchError(async (req, res, next) => {
   
    let address = await User.findByIdAndUpdate(req.user._id,{$pull:{
        addresses:{_id:req.params.id}}}, { new: true })
    
    address || next(new appError('address not found or deleted', 404))
    !address || res.status(201).json({ message: "success", address })
})
export const getLoggedUserAddress = catchError(async (req, res, next) => {
   
    let address = await User.findById(req.user._id)
    
    address || next(new appError('you must be logged first', 404))
    !address || res.status(201).json({ message: "success", address })
})
