import { connect } from 'mongoose'

export const dbConnect = connect('mongodb+srv://simoooz:KMDP9DfOIwoYDt5f@cluster0.zomov5x.mongodb.net/e_commerce')
.then(() => {
    console.log('db connected')
       
})
.catch(() => { console.log('database error') })


// connect local


//  export const dbConnect=connect('mongodb://127.0.0.1:27017/e_commerce').then(()=>{
//     console.log('db connected')})
// .catch(() => { console.log('database error') })
