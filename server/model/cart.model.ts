import mongoose, { Schema } from 'mongoose'



export const cartSchema = new mongoose.Schema(
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
    ]
  },
  { timestamps: true }
)
 
export default mongoose.model('cart', cartSchema)
