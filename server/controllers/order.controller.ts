import { Request, Response} from 'express';
import Order from '../model/order.model';

// Create and Save a new Cart
export const createOrder = async (req:Request, res:Response) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json({
            message: "Order created successfully",
            cart: savedOrder
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// update cart
export const updateOrder = async (req:Request, res:Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            return res.status(200).json({
                message: "Order updated successfully",
                order: updatedOrder
            });
        } 
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Deleting a Cart
export const deleteOrder = async (req:Request, res:Response) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Order deleted successfully",
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Getting a single cart
export const getOrder = async (req:Request, res:Response) => {
    try {
        const order = await Order.findOne({
            userId: req.params.id
        });
        return res.status(200).json({
            message: "Single Order",
            order
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Getting all Orders
export const getOrders = async (req:Request, res:Response) => {
    try {
        const orders = await Order.find();
        return res.status(200).json({
            message: "All products",
            orders
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Getting all Orders Income
// get  order Income
export const getOrdersIncome = async (req:Request, res:Response) => {
    try {
       const date = new Date();
       const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
       const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
       const income = await Order.aggregate([
         {$match: {createdAt: {$gte: previousMonth}}},
         {$project: {month: {$month: "$createdAt"}, sales: "$amount"}},
         {$group: {_id: "$month", total: {$sum: "$sales"}}}
       ])
       return res.status(200).json({
            message: "Income",
            income
       });
    } catch (error) {
         return res.json({ error: error.message });
    }
 }
