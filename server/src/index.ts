import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import {
    NODE_ENV,
    PORT,
    LOG_LEVEL,
    LOG_FORMAT,
    MUTE_LOGS,
    TEST_MODE,
} from '@config';
import validateEnv from './utils/validateEnv';
import { logger, stream } from '@utils/logger';
import { v4 as uuidv4 } from 'uuid';
import mainRouter from './router.main';
import errorHandler from './middleware/errorHandler';
import path from 'path';
import db from './db';
import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express';
import swaggerJson from '../swagger.json';

validateEnv();

const app: Express = express();
const port = PORT || 5000;

app.use(morgan(LOG_FORMAT, { stream }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

// sync and test connection to sqlite
const initDb = async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ force: true });
        logger.info('Connection has been established successfully.');

        const { hashAsync } = await import('@services/encryption');
        const { prettyStringify } = await import('@utils/prettyPrinter');

        const emails = [
            'user1@users.com',
            'user2@users.com',
            'user3@users.com',
            'user4@users.com',
        ];

        await db.sequelize.models.User.bulkCreate(
            await Promise.all(
                emails.map(async email => {
                    return { email, password: await hashAsync(email) };
                }),
            ),
        );

        const newUsers = await db.sequelize.models.User.findAll();
        logger.info(
            '🚀 ~ file: index.ts:44 ~ newUsers' + prettyStringify(newUsers),
        );
    } catch (error) {
        console.log('🚀 ~ file: index.ts:55 ~ initDb ~ error', error);
        logger.error(
            'Unable to connect to the database:' + (error as Error).message,
        );
        process.exit(1);
    }
};

// enable public access to media resources
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({ api: 'online' });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    req.uuid = uuidv4();
    next();
});

app.use('/api', mainRouter);

// Always last (global error handler)
app.use(errorHandler);

const initServer = async () => {
    try {
        await initDb();

        const server = app.listen(port, () => {
            if (MUTE_LOGS) return;
            console.log(`⚡️[NODE_ENV]: ${NODE_ENV}`);
            console.log(`⚡️[MUTE_LOGS]: ${MUTE_LOGS}`);
            console.log(`⚡️[LOG_LEVEL]: ${LOG_LEVEL}`);
            console.log(
                `⚡️[server]: Server is running at https://localhost:${port}`,
            );

            logger.info(`=================================`);
            logger.info(`======= ENV: ${NODE_ENV} =======`);
            logger.info(
                `🚀 [server]: Server is running at https://localhost:${port}`,
            );
            logger.info(`=================================`);
        });

        process.on('SIGTERM', () => {
            console.info('SIGTERM signal received.');
            console.log('Closing http server.');
            server.close(() => {
                console.log('Http server closed.');
            });
        });

        return server;
    } catch (error) {
        logger.error((error as Error).message);
    }
};

// in testing we invoke from test env not here
if (!(TEST_MODE === 'true')) {
    initServer();
}

// for jest
export default initServer;
