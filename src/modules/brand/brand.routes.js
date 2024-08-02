import { Router } from "express";
import * as B from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUplod.js";

const brandRouter=Router()
brandRouter
.route('/')
.post(uploadSingleFile('logo','brands'),B.addBrand)
.get(B.allBrands)
brandRouter.route('/:id')
.get(B.getBrand)
.put(uploadSingleFile('logo','brands'),B.updateBrand)
.delete(B.deleteBrand)

export default brandRouter
