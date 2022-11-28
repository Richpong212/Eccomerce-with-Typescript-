import { isAdmin } from './../middlewares/user.middleware';
import { runValidation } from './../validation/index';
import { test,registerUser, loginUser, updateUser, deleteUser, getAllUsers, getUser, getUserStats,  } from './../controllers/user.controller';
import express from 'express';
import { registerationValidation, loginValidation } from '../validation/user.validator';
import { isLogin } from '../middlewares/user.middleware';
const userRoute = express.Router();
//testing route
userRoute.get('/test', test)

//Register route
userRoute.post('/register' , registerationValidation,runValidation, registerUser)

// Activate route

// Login route
userRoute.post('/login',loginValidation, runValidation, loginUser)

// update user route
userRoute.put('/:id', isLogin, isAdmin, updateUser)

// delete user route
userRoute.delete('/:id', isLogin, isAdmin, deleteUser)

// get all users route
userRoute.get('/Users', isLogin, isAdmin, getAllUsers)

// get user route
userRoute.get('/:userId', isLogin, isAdmin, getUser)

// get User Stats NEEDS MORE CHECKING
userRoute.get('/stats', isLogin, isAdmin, getUserStats)

export default userRoute;