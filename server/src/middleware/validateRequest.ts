import { logger } from '@/utils/logger';
import { Request, Response, NextFunction } from 'express';
import Joi from 'Joi';

import data from '@/data/media.json';
const mediaIds = data.map(mediaItem => mediaItem.uuid);

interface Ischemas {
    [key: string]: Joi.ObjectSchema;
}

const schemas: Ischemas = {
    authUser: Joi.object({
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    }),
    getAll: Joi.object({
        category: Joi.string().valid('all', 'movies', 'tv_series'),
    }),
    toggleFavorite: Joi.object({ mediaId: Joi.string().valid(...mediaIds) }),
};

type schemaNameType = 'authUser' | 'getAll' | 'toggleFavorite';
type payloadType = 'body' | 'query';

export function joiValidateMiddleware(
    schemaName: schemaNameType,
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
