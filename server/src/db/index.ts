import path from 'path';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: true,
});

sequelize.addModels([path.join(__dirname, 'models')]);

sequelize.sync({ force: false });

const db = {
    Sequelize,
    sequelize,
};

export default db;
