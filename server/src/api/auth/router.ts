import { joiValidateMiddleware } from '@/middleware/validateRequest';
import tryCatchWrapper from '@/utils/tryCatchWrapper';
import { Router, Request, Response } from 'express';
import { register } from './controller';

const router = Router();

router.get('/', (req, res) => {
    res.send('api auth is running');
});

router.post(
    '/register',
    joiValidateMiddleware('authUser', 'body'),
    tryCatchWrapper(register),
);

export default router;
