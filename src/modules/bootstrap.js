
import addressRouter from "./addresses /address.routes.js"
import authrouter from "./authantication/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import catRouter from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import SubRouter from "./subCategory/subcategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishListRouter from "./wishList/wishList.routes.js"

export const bootstrap=(app)=>{
app.use('/api/categories',catRouter)
app.use('/api/subcategories',SubRouter)
app.use('/api/brands',brandRouter)
app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
app.use('/api/auth',authrouter)
app.use('/api/reviews',reviewRouter)
app.use('/api/wishLists',wishListRouter)
app.use('/api/addresses',addressRouter)
app.use('/api/coupons',couponRouter)
app.use('/api/cart',cartRouter)
app.use('/api/orders',orderRouter)
}