import mongoose, { Types } from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    orderItems: [
        {
            product: {
                type: Types.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            price: Number
        }
    ],
    orderTotalPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
    shippingAddress: {
        city: String,
        street: String,
        phone: String
    }
    ,
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: Date


}, {
    timestamps: true,
    versionKey: false
})

export const Order = mongoose.model('Order', orderSchema)