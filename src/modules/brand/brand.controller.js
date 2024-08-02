
import slugify from 'slugify'
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from '../../../database/models/brand.model.js'
import { deleteOne, getOnedoc } from '../handelfunction.js'
import { ApiFeature } from '../utils/apiFeature.js'


export const addBrand = catchError(async (req, res, next) => {
    if (req.body.slug) req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new Brand(req.body)
    await brand.save()
    res.status(201).json({ message: "brand added successfully", brand })
})

export const allBrands = catchError(async (req, res, next) => {
    let apiFeature=new ApiFeature(Brand.find(),req.query)
    .pagination()
    .fields()
    .filter()
    .search()
    .sort()
        let brands=await apiFeature.mongooseQuery
        res.status(201).json({ message: "success", page:apiFeature.pageNumber,brands})
  
})
export const getBrand = getOnedoc(Brand)
export const updateBrand = catchError(async (req, res, next) => {
    if (req.body.slug) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.logo = req.file.filename
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
    brand || next(new appError('brand not found', 404))
    !brand || res.status(201).json({ message: "success", brand })
})
export const deleteBrand = deleteOne(Brand)