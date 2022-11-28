import Cart from './../model/cart.model';
import { Request, Response} from 'express';

// Create and Save a new Cart
export const createCart = async (req:Request, res:Response) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        return res.status(200).json({
            message: "Cart created successfully",
            cart: savedCart
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// update cart
export const updateCart = async (req:Request, res:Response) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (cart) {
            const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            return res.status(200).json({
                message: "Cart updated successfully",
                cart: updatedCart
            });
        } 
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Deleting a Cart
export const deleteCart = async (req:Request, res:Response) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "cart deleted successfully",
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Getting a single cart
export const getCart = async (req:Request, res:Response) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId
        });
        return res.status(200).json({
            message: "Single cart",
            cart
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Getting all Carts
export const getCarts = async (req:Request, res:Response) => {
    try {
        const carts = await Cart.find();
        return res.status(200).json({
            message: "All products",
            carts
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}