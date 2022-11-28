import  User  from './../model/user.mode';
import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dev from '../config';
import { sendVerificationEmail } from '../helpers/email';

export const test = (req:Request, res:Response) => {
  res.send('testing route!');
}

// Register user controller
export const registerUser = async (req:Request, res:Response) => {
  try {
    const { name, email, password } = req.body;

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // store user in temp token
        const token = jwt.sign(
            {
             name, 
             email, 
             hashedPassword
             }, 
            dev.app.jwtSecret, 
            {expiresIn: '10m'}
            )
    
    // Prepare email data  
    const emailData = {
      email,
      subject: 'Account activation link',
      html: `
          <h1>Hello ${name}</h1>
          <p>Please use the following link to activate your account</p>
          <p><a href="${dev.app.clientURL}/auth/activate/${token}">Activate Account</a></p>
          `
  } 
   // send email
   sendVerificationEmail(emailData)

    // save user to database
    const user = await newUser.save();

    
    
    return res.status(200).json({
      message: 'User registered successfully',
      user,
    })
    
} catch (error) {
    return res.json({ error: error.message });
}
}

// Login user controller
export const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      const existUser = await User.findOne({ email}); 
      if(!existUser) {
          return res.status(400).json({ 
              error: "User does not exist, Please register"
          })
      } 
      const isMatch = await bcrypt.compare(password, existUser.password);
      if(!isMatch) {
          return res.status(400).json({
              error: "Invalid credentials Email or Password did not match "
          })
      }
      const token = jwt.sign({_id: existUser._id }, dev.app.jwtSecret, {expiresIn: '1d'});
      return res.status(200).json({
          message: "Login successful",
          user: {
              name: existUser.name,
              email: existUser.email,
              isAdmin: existUser.isAdmin,
          }, 
          token
      });
      
  } catch (error) {
      return res.json({ error: error.message });
  }
}

// update user controller
export const updateUser = async (req:Request, res:Response) => {
  try {
      const { name, email, password, address } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          name,
          email,
          password: hashedPassword,
          address
        }
      }, { new: true });
      return res.status(200).json({
          message: "User updated successfully",
          user: updatedUser
      });
  } catch (error) {
      return res.json({ error: error.message });
  }
}

// delete user controller
export const deleteUser = async (req:Request, res:Response) => {
  try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
          message: "User deleted successfully",
          user: deletedUser
      });
  } catch (error) {
      return res.json({ error: error.message });
  }
}

// get all users controller
export const getAllUsers = async (req:Request, res:Response) => {
  const query = req.query.new;
  try {
     const users = query ? await User.find().sort({_id: -1}).limit(1) : await User.find();
      return res.status(200).json({
          message: "All users",
          users
      });
  } catch (error) {
      return res.json({ error: error.message });
  }
}


// get user controller
export const getUser = async (req:Request, res:Response) => {
  try {
      const user = await User.findById(req.params.userId);
      return res.status(200).json({
          message: "Single User",
          user
      });
  } catch (error) {
      return res.json({ error: error.message });
  }
}

// get user stats controller NEEDS WORKING ON
export const getUserStats = async (req:Request, res:Response) => {
   try {
      const date = new Date();
      const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

      const data = await User.aggregate([
          { $match: { createdAt: { $gte: lastYear } } },
          {
              $project: {
                  month: { $month: "$createdAt" },
              }
          },
          {
              $group: {
                  _id: "$month",
                  total: { $sum: 1 }
              },
          }
      ])
      
      return res.status(200).json({
          message: "User stats",
          data
      });
   } catch (error) {
        return res.json({ error: error.message });
   }
}