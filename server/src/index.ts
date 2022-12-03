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
import db from './db';
import cookieParser from 'cookie-parser';

validateEnv();

dotenv.config();
const app: Express = express();
const port = PORT || 5000;

app.use(morgan(LOG_FORMAT, { stream }));

(async () => {
    try {
        await db.sequelize.sync({ force: true });
        await db.sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
// need cookieParser middleware before we can do anything with cookies

app.get('/', (req: Request, res: Response) => {
    res.json({ api: 'online' });
});

app.get('/test', async (req: Request, res: Response) => {
    const result = await db.sequelize.models.User.findAll();
    res.json({ result });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    req.uuid = uuidv4();
    next();
});

app.use('/api', mainRouter);

// Always last (global error handler)
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`⚡️[NODE_ENV]: ${NODE_ENV}`);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);

    logger.info(`=================================`);
    logger.info(`======= ENV: ${NODE_ENV} =======`);
    logger.info(`🚀 [server]: Server is running at https://localhost:${port}`);
    logger.info(`=================================`);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });
});
