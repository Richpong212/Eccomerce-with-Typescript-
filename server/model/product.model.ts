import mongoose from 'mongoose'



export const productSchema = new mongoose.Schema(
  {
    title: {
      type: String, 
      index: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      trim: true,
      maxlength: [100, 'Name must be less than 100 characters'],
      required: [true, 'Name is required'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, 'Description must be at least 3 characters long'],
      maxlength: [500, 'Description must be less than 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
    },
    isAdmin: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
      required: [true, 'quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    image: {
       type: String,
        data: Buffer,
        contentType: String, 
    },
    shipping: {
        type: Boolean,
    },
    category: {
        type: Array,  
    },
    color: {
        type: Array, 
    },
    size: {
        type: Array,
    }
  },
  { timestamps: true }
)
 
export default mongoose.model('Product', productSchema)
