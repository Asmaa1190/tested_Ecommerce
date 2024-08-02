
import slugify from 'slugify'
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Product } from '../../../database/models/product.model.js'
import { deleteOne, getOnedoc } from '../handelfunction.js'
import { ApiFeature } from '../utils/apiFeature.js'



export const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(img => img.filename)
    let product = new Product(req.body)
    await product.save()
    res.status(201).json({ message: "product added successfully", product })
})

export const allProducts = catchError(async (req, res, next) => {
let apiFeature=new ApiFeature(Product.find(),req.query)
.pagination()
.filter()
.fields()
.search()
.sort()
    let products=await apiFeature.mongooseQuery
    res.status(201).json({ message: "success", page:apiFeature.pageNumber,products})
})
export const getProduct = getOnedoc(Product)

export const updateProduct = catchError(async (req, res, next) => {
    if (req.body.slug) req.body.slug = slugify(req.body.title)
    if (req.files) req.body.imageCover = req.files.imageCover[0].filename
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    product || next(new appError('product not found', 404))
    !product || res.status(201).json({ message: "success", product })
})
export const deleteProduct = deleteOne(Product)