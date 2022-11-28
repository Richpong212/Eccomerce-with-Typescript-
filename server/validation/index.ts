import {validationResult}  from 'express-validator';

export const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorLists = errors.array().map((error) => error.msg);
        return res.status(422).json({
            success: false,
            error: errorLists, 
        });
        next();
    }
    next();
}