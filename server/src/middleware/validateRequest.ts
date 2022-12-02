import { logger } from '@/utils/logger';
import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema, object, string, array } from 'Joi';
import { User } from '@/models';
type GenericJoiSchema = { [key: string]: ObjectSchema };

const schemas: { [key: string]: Joi.ObjectSchema } = {
    user: object<User>({
        _id: string(),
        email: string().email(),
        password: string(),
        favorites: array().items(string()),
    }),
};
