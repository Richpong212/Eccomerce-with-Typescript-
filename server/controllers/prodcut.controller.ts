import { Request,Response } from "express";
import  Product  from './../model/product.model';


// Create and Save a new Product
export const createProduct = async (req:Request, res:Response) => {
     try {
        const {title, price, description, category, quantity, color,image} = req.body;
        
        // checking if the product already exists
        const exisitingProduct = await Product.findOne({title});
        if(exisitingProduct) return res.status(400).json({error: 'Product already exists'});

        // checking if all the fields are filled
        if(!title || !price || !description || !category || !quantity || !color || !image) return res.status(400).json({error: 'All fields are required'});

        const newProduct = new Product({...req.body});

       const savedProduct =  await newProduct.save();

        return res.status(200).json({
            message: "Product created successfully",
            product: savedProduct
        });
     } catch (error) {
         return res.json({ error: error.message });
     }
}

// Updating a product
export const updateProduct = async (req:Request, res:Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productid, {
            $set: req.body
        }, {new: true});
        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Deleting a product
export const deleteProduct = async (req:Request, res:Response) => {
    try {
        await Product.findByIdAndDelete(req.params.productid);
        return res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Getting all products
export const getAllProducts = async (req:Request, res:Response) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products
        if(qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if(qCategory) {
            products = await Product.find({categories: {
                $in: [qCategory],
            }}).limit(1);
        } else{
            products = await Product.find();
        }

        return res.status(200).json({
            message: "All products",
            products
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// Getting a single product
export const getSingleProduct = async (req:Request, res:Response) => {
    try {
        const product = await Product.findById(req.params.productid);
        return res.status(200).json({
            message: "Single product",
            product
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}