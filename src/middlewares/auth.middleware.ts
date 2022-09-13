import { Request, Response, NextFunction } from "express";
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { verify } = jsonwebtoken;
const JWT_SECRET: any = process.env.JWT_SECRET;

export function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        
        if (!req.headers['authorization']) return res.status(401).send('Forbidden').end()
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]

        const payload: any = verify(token, JWT_SECRET);
        if (!req.context) {
            req.context = {};
        }
        req.context.user = payload;
        req.context.userId = payload.userId;
    }
	catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
    next();
}
