import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { appError } from "../utils/appError.js";
import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

export const signup = catchError(async (req, res) => {
    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_KEY)
    res.json({ message: "success", token })
})


export const signin = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {

        let token = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_KEY)
        return res.json({ message: "success", token })
    }
    return next(new appError("Invalid email or password", 401))
})
export const changUserPassword = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.oldpassword, user.password)) {
        await User.findOneAndUpdate({ email: req.body.email },{password:req.body.newpassword,passwordChangedAt:Date.now()})

        let token = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_KEY)
        return res.json({ message: "success", token })
    }
    return next(new appError("Invalid email or password", 401))
})
export const protectRoutes= catchError(async (req, res, next) => {
    let {token}=req.headers
    let userPayload=null
    if(!token){
        return next(new appError("token not provided",401))
    }
    jwt.verify(token, process.env.JWT_KEY,(err,payload)=>{
        if(err){
            return next(new appError(err,401))
        }
       userPayload=payload
    })
    let user=await User.findById(userPayload.userId)
    if(!user){
        return next(new appError("user not found",401))
    }
  if(user.passwordChangedAt){
    let time=parseInt(user.passwordChangedAt.getTime()/1000)
    if(time>parseInt(userPayload.iat)){
        return next(new appError("token expired",401))
    }
  }
    req.user=user
    next()
})

export const allowedTo=(...roles)=>{
    return catchError(async(req,res,next)=>{
       if(roles.includes(req.user.role)){
        return next()
       }
       return next(new appError("you are not allowed to access this route",403))

    })
}


