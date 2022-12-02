import { logger } from '@/utils/logger';
import { NextFunction, Response, Request, RequestHandler } from 'express';

export default function tryCatchWrapper(requestHandler: RequestHandler): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await requestHandler(req, res, next);
        } catch (error) {
            logger.error(
                (error as Error).message ||
                    'Wrapper Error catch->undefined Error message for ' +
                        requestHandler.name ||
                    'unnamed requestHandler',
            );
            next(error);
        }
    };
}
