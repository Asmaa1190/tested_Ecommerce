import mongoose,{Types} from 'mongoose'

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:[true,'name is required'],
        trim:true,
        minLength:[2,'too short category name']
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
description:{
    type:String,
    required:true,
    minLength:5,
    maxLength:2000
},
imageCover:String,
images:[String],
price:{
    type:Number,
    required:true,
    min:0
},
priceAfterDiscount:{
    type:Number,
    required:true,
    min:0
},
sold:{
    type:Number
},
stock:{
    type:Number,
    min:0
},
category:{
    type:Types.ObjectId,
    ref:'Category',
},
subCategory:{
    type:Types.ObjectId,
    ref:'SubCategory',
},
brand:{
    type:Types.ObjectId,
    ref:'Brand',
},
rateAve:{
    type:Number,
    min:0,
    max:5
},
rateCount:{
    type:Number
   

},
cratedBy:{
    type:Types.ObjectId,
    ref:'User'
}



        
    
},{
    timestamps:true,
    versionKey:false,
    toJSON:{
        virtuals:true,
        id:false
    }
})
productSchema.virtual('myReviews',{
    ref:"Review",
    localField:"_id",
    foreignField:"product"
})
productSchema.pre('findOne',function(){
    this.populate("myReviews")
})
productSchema.post('init',function(doc){
  if(doc.imageCover)  doc.imageCover=process.env.BASE_URL+"products/"+doc.imageCover
   if(doc.images) doc.images=doc.images.map(img=>process.env.BASE_URL+"products/"+img)
})
export const Product=mongoose.model('Product',productSchema)