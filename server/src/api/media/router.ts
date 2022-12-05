import { joiValidateMiddleware } from '@/middleware/validateRequest';
import authMiddleware from '@/middleware/validateToken';
import tryCatchWrapper from '@/utils/tryCatchWrapper';
import { Router } from 'express';
import { getAll, getFavorites, setOrRemoveFavorite } from './controller';

const router = Router();

router.get('/', (req, res) => {
    res.send('api media is running');
});

// get media array (no favorite metadata)
router.post(
    '/all',
    joiValidateMiddleware('getAll', 'body'),
    tryCatchWrapper(getAll),
);

// get favorites media array by category
router.post('/favorites', authMiddleware, tryCatchWrapper(getFavorites));

//set or remove favorite for user
router.put(
    '/favorites',
    authMiddleware,
    joiValidateMiddleware('toggleFavorite', 'body'),
    tryCatchWrapper(setOrRemoveFavorite),
);

export default router;
