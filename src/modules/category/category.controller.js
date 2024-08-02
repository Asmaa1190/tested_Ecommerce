import { Category } from "../../../database/models/category.model.js"
import slugify from 'slugify'
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import fs from 'fs'
import { deleteOne, getOnedoc } from "../handelfunction.js"
import { ApiFeature } from "../utils/apiFeature.js"


export const addCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
    res.status(201).json({ message: "Category added successfully", category })
})

export const allCategories = catchError(async (req, res, next) => {
    let apiFeature=new ApiFeature(Category.find(),req.query)
.pagination()
.filter()
.fields()
.search()
.sort()
    let categories=await apiFeature.mongooseQuery
    res.status(201).json({ message: "success", page:apiFeature.pageNumber,categories})
 
})
export const getCategory = getOnedoc(Category)

export const updateCategory = catchError(async (req, res, next) => {
    if (req.body.slug) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.image = req.file.filename
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
  
    category || next(new appError('category not found', 404))
    !category || res.status(201).json({ message: "success", category })
})
export const deleteCategory =deleteOne(Category)