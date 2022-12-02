import tryCatchWrapper from '@/utils/tryCatchWrapper';
import { Router, Request, Response } from 'express';
import { getAllMedia } from './controller';

const router = Router();

router.get('/', (req, res) => {
    res.send('api media is running');
});

router.get('/all', tryCatchWrapper(getAllMedia));

export default router;
