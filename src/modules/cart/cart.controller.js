
import { appError } from "../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Cart } from "../../../database/models/cart.model.js"
import { Product } from "../../../database/models/product.model.js"
import { Coupon } from "../../../database/models/copoun.model.js"

function calcTotalPrice(isCartExist) {
    isCartExist.totalPrice = isCartExist.cartItems.reduce((prev, item) =>
        prev += item.quantity * item.price, 0
    )

    if (isCartExist.discount){
        isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100
        isCartExist.discount=isCartExist.discount 
    }
}


export const addToCart = catchError(async (req, res, next) => {
    let isCartExist = await Cart.findOne({ user: req.user._id })
    let product = await Product.findById(req.body.product)
    if (!product) return next(new appError('product not found', 404))
    if (req.body.quantity > product.stock) return next(new appError('Out of stock', 404))
    req.body.price = product.price
    if (!isCartExist) {
        let cart = new Cart({
            user: req.user._id,
            cartItems: [req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        res.json({ message: "sucsses", cart })
    } else {
        let item = isCartExist.cartItems.find((item) => item.product == req.body.product)
        if (item) {
            item.quantity += req.body.quantity || 1
            if (item.quantity > product.stock) return next(new appError('Out of stock', 404))
        }
        if (!item) isCartExist.cartItems.push(req.body)
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.json({ message: 'success', cart: isCartExist })
    }

})
export const updateCartQuantity = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    let item = cart.cartItems.find(item => item.product == req.params.id)
    if (!item) return next(new appError('item not found', 404))
    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    res.json({ message: 'success', cart })
})
export const removeItemFromCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndUpdate({ user: req.user._id },
        { $pull: { cartItems: { _id: req.params.id } } }, { new: true })
    calcTotalPrice(cart)
    await cart.save()
    cart || next(new appError('not found', 404))
    !cart || res.json({ message: 'success', cart })
})
export const getLoggedUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    cart || next(new appError('add items in your cart', 404))
    !cart || res.json({ message: 'success', cart })
})
export const clearUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndDelete({ user: req.user._id })
    cart || next(new appError('not found', 404))
    !cart || res.json({ message: 'success', cart })
})
export const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findOne({ code: req.body.code, expire: { $gte: Date.now() } })
    if (!coupon) return next(new appError('Ooops,this coupon not vaild', 404))
    let cart = await Cart.findOne({ user: req.user._id })
    calcTotalPrice(cart)
    await cart.save()
    res.json({ message: 'success', cart })
})
