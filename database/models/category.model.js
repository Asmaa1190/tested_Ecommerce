import mongoose,{Types} from 'mongoose'

const catSchema=new mongoose.Schema({
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
        lowercase:true,
        unique:true
    },
    image:String,
    cratedBy:{
        type:Types.ObjectId,
        ref:'User'
    }
    
        
    
},{
    timestamps:true,
    versionKey:false
})
catSchema.post('init',function(doc){
   if(doc.image) doc.image=process.env.BASE_URL+"categories/"+doc.image
})
export const Category=mongoose.model('Category',catSchema)