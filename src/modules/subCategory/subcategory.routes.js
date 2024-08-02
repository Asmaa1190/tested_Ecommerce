import { Router } from "express";
import * as SubCat from "./subcategory.controller.js";

const SubRouter=Router({mergeParams:true})
SubRouter
.route('/')
.post(SubCat.addsubCategory)
.get(SubCat.allSubCategories)
SubRouter.route('/:id')
.get(SubCat.getsubCategory)
.put(SubCat.updateSubCategory)
.delete(SubCat.deleteSubCategory)

export default SubRouter
