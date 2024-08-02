import mongoose,{Types} from 'mongoose'

const brandSchema=new mongoose.Schema({
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
logo:String,
cratedBy:{
    type:Types.ObjectId,
    ref:'User'
}

        
    
},{
    timestamps:true,
    versionKey:false
})
brandSchema.post('init',function(doc){
   if(doc.logo) doc.logo=process.env.BASE_URL+"brands/"+doc.logo
})
export const Brand=mongoose.model('Brand',brandSchema)