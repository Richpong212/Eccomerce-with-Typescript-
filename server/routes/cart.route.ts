import { isLogin, isAdmin } from './../middlewares/user.middleware';
import express from 'express';
import { createCart, deleteCart, updateCart,getCart, getCarts } from '../controllers/cart.controller';
const cartRoute = express.Router();


cartRoute.post('/create-cart', isLogin, createCart)
cartRoute.put('/:id', isLogin, updateCart)
cartRoute.delete('/:id', isLogin, deleteCart)
cartRoute.get('/:userId', isLogin, getCart )
cartRoute.get('/', isLogin,isAdmin, getCarts )


export default cartRoute;