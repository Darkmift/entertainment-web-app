import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { NODE_ENV, PORT, LOG_FORMAT } from '@config';
import validateEnv from './utils/validateEnv';
import { logger, stream } from '@utils/logger';
import { v4 as uuidv4 } from 'uuid';
import mainRouter from './router.main';
import errorHandler from './middleware/errorHandler';
import path from 'path';

validateEnv();

dotenv.config();
const app: Express = express();
const port = PORT || 5000;

app.use(morgan(LOG_FORMAT, { stream }));

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

import db from '@/db';

app.get('/test', async (req: Request, res: Response) => {
    try {
        // await db.push('/users/1/favorites',"test"+Date.now())
        await db.push('/users/1/favorites[]', 'test' + Date.now(), true);

        const userCollections = await db.getObject<DBData>('/users/1');
        const mediaCollections = await db.getObject<DBData>('/media');

        const t = await db.find('/users', (entry, index) => {
            // console.log('🚀 ~ file: index.ts:37 ~ db.find ~ entry, index', {
            //     entry,
            //     index,
            //     entryName: entry.name,
            // });
            return entry.name === 'John';
        });
        console.log('🚀 ~ file: index.ts:44 ~ t ~  t', t);

        res.json({ userCollections, mediaCollections, t });
        return;
    } catch (error) {
        console.log('🚀 ~ file: index.ts:36 ~ app.get ~ error', error);
        res.send('Express + TypeScript Server');
    }
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    req.uuid = uuidv4();
    next();
});

app.use('/api', mainRouter);

// Always last (global error handler)
app.use(errorHandler);

app.listen(port, () => {
    console.log(`⚡️[NODE_ENV]: ${NODE_ENV}`);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

    logger.info(`=================================`);
    logger.info(`======= ENV: ${NODE_ENV} =======`);
    logger.info(`🚀 [server]: Server is running at https://localhost:${port}`);
    logger.info(`=================================`);
});
