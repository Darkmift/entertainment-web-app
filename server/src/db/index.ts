import { logger } from '@/utils/logger';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: str => logger.info('SQL->' + str.substring(0, 2000) + '...'),
});

sequelize.addModels([path.join(__dirname, 'models')]);

const db = {
    Sequelize,
    sequelize,
};

export default db;
