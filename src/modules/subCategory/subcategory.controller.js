
import slugify from 'slugify'
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from '../../../database/models/subCat.model.js'
import { deleteOne, getOnedoc } from '../handelfunction.js'
import { ApiFeature } from '../utils/apiFeature.js'


export const addsubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory = new SubCategory(req.body)
    await subcategory.save()
    res.status(201).json({ message: "Category added successfully", subcategory  })
})

export const allSubCategories = catchError(async (req, res, next) => {
    let objFilter={}
    if(req.params.category) objFilter.category=req.params.category
    let apiFeature=new ApiFeature(SubCategory.find(objFilter),req.query)
    .pagination()
    .filter()
    .fields()
    .search()
    .sort()
        let subcategories=await apiFeature.mongooseQuery
        res.status(201).json({ message: "success", page:apiFeature.pageNumber,subcategories})
  
  
})
export const getsubCategory = getOnedoc(SubCategory)

export const updateSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory  = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    subcategory  || next(new appError('subcategory not found',404))
    !subcategory  || res.status(201).json({ message: "success", subcategory  })
})
export const deleteSubCategory = deleteOne(SubCategory)