import { Category } from "../../../database/models/category.model.js"
import slugify from 'slugify'
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import fs from 'fs'
import { deleteOne, getOnedoc } from "../handelfunction.js"
import { ApiFeature } from "../utils/apiFeature.js"
import { User } from "../../../database/models/user.model.js"


export const addUser = catchError(async (req, res, next) => {

    let user = new User(req.body)
    await user.save()
    res.status(201).json({ message: "user added successfully", user })
})

export const allusers = catchError(async (req, res, next) => {
    //     let apiFeature=new ApiFeature(Category.find(),req.query)
    // .pagination()
    // .filter()
    // .fields()
    // .search()
    // .sort()
    //     let categories=await apiFeature.mongooseQuery
    //     res.status(201).json({ message: "success", page:apiFeature.pageNumber,categories})
    let users = await User.find()
    res.status(201).json({ message: "success", users })

})
export const getUser = getOnedoc(User)

export const updateUser = catchError(async (req, res, next) => {

    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

    user || next(new appError('user not found', 404))
    !user || res.status(201).json({ message: "success", user })
})
export const deleteuser = deleteOne(User)