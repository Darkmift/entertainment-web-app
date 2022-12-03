import { sign, verify } from '@services/authToken';
import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
    declare statusCode: number;
    declare message: string;
    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.cookies.access_token;
        // const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await verify(token);
        req.user = {
            email: decodedToken.email,
            id: decodedToken.id,
        };
        next();
    } catch (error) {
        const e = error as CustomError;
        e.statusCode = 500;
        e.message = JSON.stringify({
            1: e.message,
            2: 'auth failed:code bt :',
            info: req.headers,
        });
        next(error);
    }
};

export default authMiddleware;
