import mongoose,{Types} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema=new mongoose.Schema({
name:String,
email:String,
password:String,
role:{
    type:String,
    enum:["admin","user"],
    default:"user"
}  ,
isBlocked:{
    type:Boolean,
    default:false
}  ,
confirmEmail:{
    type:Boolean,
    default:false
} ,
passwordChangedAt:{
    type:Date
},
wishList:[
    {
        type:Types.ObjectId,
        ref:'Product'
    }
],
addresses:[{
    city:String,
    phone:String,
    street:String
}]
    
},{
    timestamps:true,
    versionKey:false
})
// hashing password befor saving
userSchema.pre('save',function(){
    this.password=bcrypt.hashSync(this.password,8)
})
userSchema.pre('findOneAndUpdate',function(){
 if(this._update.password) this._update.password=bcrypt.hashSync(this._update.password,8)
})
export const User=mongoose.model('User',userSchema)