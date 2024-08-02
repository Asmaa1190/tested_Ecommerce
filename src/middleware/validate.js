import { appError } from "../modules/utils/appError.js"



export const vaildation=(schema)=>{
   return (req,res,next)=>{
    let {error} =schema.validate({image:req.file,...req.body,...req.params,...req.query},{abortEarly:false})
    if(!error){
  next()
    }else{

      let errmsg=error.details.map(err=>err.message)
      // res.json(errmsg)
      next(new appError(errmsg,401))
    }

   }
}

