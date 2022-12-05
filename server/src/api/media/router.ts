import { joiValidateMiddleware } from '@/middleware/validateRequest';
import authMiddleware from '@/middleware/validateToken';
import tryCatchWrapper from '@/utils/tryCatchWrapper';
import { Router } from 'express';
import { getAll, getFavorites } from './controller';

const router = Router();

router.get('/', (req, res) => {
    res.send('api media is running');
});

router.post(
    '/all',
    joiValidateMiddleware('getAll', 'body'),
    tryCatchWrapper(getAll),
);
router.post('/favorites', authMiddleware, tryCatchWrapper(getFavorites));

export default router;
