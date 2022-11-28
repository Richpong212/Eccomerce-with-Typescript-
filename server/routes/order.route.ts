import { isLogin, isAdmin } from './../middlewares/user.middleware';
import express from 'express';
import { createOrder, updateOrder, deleteOrder,getOrder, getOrders, getOrdersIncome } from '../controllers/order.controller';
const orderRoute = express.Router();


orderRoute.post('/create-order', isLogin, createOrder)
orderRoute.put('/:id', isLogin, isAdmin, updateOrder)
orderRoute.delete('/:id', isLogin, isAdmin, deleteOrder)
orderRoute.get('/:id', isLogin, getOrder )
orderRoute.get('/', isLogin,isAdmin, getOrders )
orderRoute.get('/income', isLogin, isAdmin, getOrdersIncome )


export default orderRoute;