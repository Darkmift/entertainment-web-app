import { logger } from '@/utils/logger';
import { Request, Response, NextFunction } from 'express';
import Joi from 'Joi';

interface Ischemas {
    [key: string]: Joi.ObjectSchema;
}

const schemas: Ischemas = {
    authUser: Joi.object({
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    }),
};

type schemaName = 'authUser';
type payloadType = 'body' | 'query';

export function joiValidateMiddleware(
    schemaName: schemaName,
    payloadType: payloadType,
) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error /*, value*/ } = schemas[schemaName].validate(
            req[payloadType],
        );
        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(', ');
            logger.error(message);
            return res.status(400).send({ error: message });
        }
        next();
    };
}
