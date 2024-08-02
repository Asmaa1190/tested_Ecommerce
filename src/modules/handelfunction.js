import { catchError } from "../middleware/catchError.js"
import { appError } from "./utils/appError.js"

export const deleteOne=(model)=>{
    return catchError(async (req, res, next) => {
        let deleteDoc  = await model.findByIdAndDelete(req.params.id)
        deleteDoc  || next(new appError('deleteDoc not found or has deleted',404))
        !deleteDoc || res.status(201).json({ message: "success", deleteDoc  })
    })
}

export const getOnedoc=(model)=>{
return catchError(async (req, res, next) => {
    let getOne  = await model.findById(req.params.id)
    getOne  || next(new appError('getOne not found',404))
    !getOne  || res.status(201).json({ message: "success", getOne  })
})
}