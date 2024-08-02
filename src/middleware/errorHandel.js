
let mode='prod'
export const errorHandel=(err,req,res,next)=>{
    let code=err.statusCode||500
    if(mode=='development'){
        res.status(code).json({error:"error",message:err.message,code,stack:err.stack})
    }else{
        res.status(code).json({error:"error",message:err.message,code})
    }
   
}