import mongoose from 'mongoose'



export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      index: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      trim: true,
      required: [true, 'Name is required'],
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      min: 6,
      required: [true, 'Password is required'],
    },
    isAdmin: {
      type: Number,
      default: 0,
    },
    Address: {
      type: String,
      trim: true, 
    },
    isVerify: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
