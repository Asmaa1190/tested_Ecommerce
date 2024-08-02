process.on('uncaughtException', () => {
    console.log('error in code')
})
import express from 'express'
import { dbConnect } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { errorHandel } from './src/middleware/errorHandel.js'
import { appError } from './src/modules/utils/appError.js'
import 'dotenv/config'
import cors from 'cors'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Pib4zDHR07fDlC8x8j2Z1ixr8JszDEI3Nq3XuYnmPDBgS4mdbDkN7NBc5sV9VYC7vfRwIHcBaT5Xayrd0M301IR002R32KMF2');
import { catchError } from './src/middleware/catchError.js'
import { Order } from './database/models/order.model.js'
import { User } from './database/models/user.model.js'
import { Cart } from './database/models/cart.model.js'
import { Product } from './database/models/product.model.js'


const app = express()
const port = process.env.PORT || 3000
app.post('/api/webhook', express.raw({ type: 'application/json' }), catchError(
   async(req, res) => {
        const sig = req.headers['stripe-signature'].toString();
        let event;
        event = stripe.webhooks.constructEvent(req.body, sig, "whsec_TSKmMOZLXHccdRPBHRFNKAzBgMhZYepY")
        // Handle the event
        let checkOut
        if (event.type == 'checkout.session.completed') {
            checkOut = event.data.object;
            let user=await User.findOne({email:checkOut.customer_email})
            let cart = await Cart.findById(checkOut.client_reference_id)
            if (!cart) return next(new appError('not found', 404))

            let order=new Order({
                user:user._id,
                orderItems:cart.cartItems,
                shippingAddress:checkOut.metadata,
                orderTotalPrice:checkOut.amount_total/100,
                paymentType:'card',
                isPaid:true
            })
            await order.save()
            let options=cart.cartItems.map((prod)=>{
                return(
                    {
                        updateOne:{
                            "filter":{_id:prod.product},
                            "update":{$inc:{sold:prod.quantity,stock:-prod.quantity}}
                        }
                    }
                )
            })
            await Product.bulkWrite(options)
            await Cart.findByIdAndDelete(cart._id)
            
            res.json({message:'done',order})
            
        }
        res.json({ message: 'success', checkOut });
    })
)


app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
dbConnect
bootstrap(app)
app.use('*', (req, res, next) => {
    next(new appError(`route not found${req.originalUrl}`, 401))
})
app.use(errorHandel)
process.on('unhandledRejection', (err) => {
    console.log('error in connection', err)
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))