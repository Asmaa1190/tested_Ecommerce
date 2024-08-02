import { Router } from "express";
import * as pro from "./product.controller.js";
import { uploadMixleFile } from "../../fileUpload/fileUplod.js";

const productRouter=Router()
productRouter
.route('/')
.post(uploadMixleFile([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),pro.addProduct)
.get(pro.allProducts)
productRouter.route('/:id')
.get(pro.getProduct)
.put(uploadMixleFile([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),pro.updateProduct)
.delete(pro.deleteProduct)

export default productRouter
