import { isAdmin } from './../middlewares/user.middleware';
import { createProduct, deleteProduct, updateProduct, getAllProducts, getSingleProduct } from './../controllers/prodcut.controller';
import express from 'express';
import { isLogin } from '../middlewares/user.middleware';
const productRoute = express.Router();
//testing route

// Create a new product
productRoute.post('/create', isLogin, isAdmin, createProduct);
productRoute.put('/update-product/:productid', isLogin, isAdmin, updateProduct);
productRoute.delete('/:productid', isLogin, isAdmin, deleteProduct);
productRoute.get('/get-all-products/', isLogin, isAdmin, getAllProducts);
productRoute.get('/:productid', isLogin, isAdmin, getSingleProduct);


export default productRoute;