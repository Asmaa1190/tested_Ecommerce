import mongoose,{Types} from 'mongoose'

const couponSchema=new mongoose.Schema({
  code:{
    type:String,
    required:true,
    unique:true
  },
  discount:{
    type:Number,
    required:true
  },
  expire:Date

    
    
},{
    timestamps:true,
    versionKey:false
})
export const Coupon=mongoose.model('Coupon',couponSchema)