import mongoose,{Types} from 'mongoose'

const subCatSchema=new mongoose.Schema({
    name:{
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
  category:{
    type:Types.ObjectId,
    ref:'Category',
  }
  ,cratedBy:{
    type:Types.ObjectId,
    ref:'User'
}

        
    
},{
    timestamps:true,
    versionKey:false
})
export const SubCategory=mongoose.model('SubCategory',subCatSchema)