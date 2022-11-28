import User from './../model/user.mode';
import jwt from 'jsonwebtoken';
import dev from '../config';
import { Request, Response, NextFunction } from 'express';
// User Login 
export const isLogin = async (req:any, res:Response, next:NextFunction) => {
    try {
        if(!req.headers.authorization) {
            return res.status(404).json({ error: "No Token found in request header" });
        } 
        const token = req.headers.authorization
        const decode:any = jwt.verify(token, dev.app.jwtSecret)
        req.userId = decode._id; 
        next(); 
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
 }; 

 // Is Admin 
 export const isAdmin = async (req:any, res:Response, next:NextFunction) => {
    try {
        const existingUser = await User.findById({ _id: req.userId });
        if(!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if(existingUser.isAdmin !== 1 ){
            return res.status(401).json({ error: "You are not authorized to access this resource, You are not Admin" });
        }
        next(); 
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
 };