import authMiddleware from '@/middleware/validateToken';
import tryCatchWrapper from '@/utils/tryCatchWrapper';
import { Router } from 'express';
import { getAll, getFavorites } from './controller';

const router = Router();

router.get('/', (req, res) => {
    res.send('api media is running');
});

router.get('/all', tryCatchWrapper(getAll));
router.get('/favorites', authMiddleware, tryCatchWrapper(getFavorites));

export default router;
