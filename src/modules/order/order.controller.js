
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Cart } from "../../../database/models/cart.model.js"
import { Product } from "../../../database/models/product.model.js"
import { Coupon } from "../../../database/models/copoun.model.js"
import { Order } from "../../../database/models/order.model.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Pib4zDHR07fDlC8x8j2Z1ixr8JszDEI3Nq3XuYnmPDBgS4mdbDkN7NBc5sV9VYC7vfRwIHcBaT5Xayrd0M301IR002R32KMF2');

export const creatCashOrder = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new appError('not found', 404))
    let orderTotalPrice = cart.totalPrice || cart.totalPriceAfterDiscount
let order=new Order({
    user:req.user._id,
    orderItems:cart.cartItems,
    shippingAddress:req.body.shippingAddress,
    orderTotalPrice
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


})

export const getUserOrder = catchError(async (req, res, next) => {
    
   let orders=await Order.findOne({user:req.user._id}).populate('orderItems.product')
   res.json({message:"success",orders})
})
export const getAllOrder = catchError(async (req, res, next) => {
   let orders=await Order.find()
   res.json({message:"success",orders})
})
export const creatCheckOutSession = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    if (!cart) return next(new appError('not found', 404))
    let orderTotalPrice = cart.totalPrice || cart.totalPriceAfterDiscount
 let session=await stripe.checkout.sessions.create({
    line_items:[
        {
            price_data:{
                currency:'egp',
                unit_amount:orderTotalPrice*100,
                product_data:{
                    name:req.user.name
                }
            },
            quantity:1,
        }
    ],
    mode:'payment',
    // url from frontend
    success_url:"https://asmaa1190.github.io/freshcart/#/products",
    cancel_url:"https://asmaa1190.github.io/freshcart/#/cart",
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress


 })
 res.json({message:'done',session})
})


