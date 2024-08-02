import { Router } from "express";
import * as Cat from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUplod.js";
import { addCategoryValidation } from "./category.validation.js";
import { vaildation } from "../../middleware/validate.js";
import SubRouter from "../subCategory/subcategory.routes.js";
import { allowedTo, protectRoutes } from "../authantication/auth.controller.js";


const catRouter=Router()
catRouter.use('/:category/subcategories',SubRouter)
catRouter
.route('/')
.post(protectRoutes,allowedTo('admin','mgr'),uploadSingleFile('image','categories'),vaildation(addCategoryValidation),Cat.addCategory)
.get(Cat.allCategories)
catRouter.route('/:id')
.get(Cat.getCategory)
.put(protectRoutes,allowedTo('admin'),uploadSingleFile('image','categories'),Cat.updateCategory)
.delete(protectRoutes,allowedTo('admin'),Cat.deleteCategory)

export default catRouter
