import mongoose from 'mongoose'



export const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: [true, 'userId is required'],
    },
    product: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ],
    amount: {
        type: Number,
        required: [true, 'amount is required'],
    },
    address: {
        type: Object,
        required: [true, 'address is required'],
    },
    status: {
        type: String,
        default: 'pending',
    },
  },
  { timestamps: true }
)
 
export default mongoose.model('Order', orderSchema)
