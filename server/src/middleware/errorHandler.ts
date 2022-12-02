import { logger } from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (typeof err === 'string') {
        // custom application error
        logger.error('[ERROR-HANDLER] ' + err);
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        logger.error('[ERROR-HANDLER] ' + err.name);
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    logger.error('[ERROR-HANDLER] ' + err.message);
    return res.status(500).json({ message: err.message });
};

export default errorHandler;
