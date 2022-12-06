import { config } from 'dotenv';
config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`,
    debug: process.env.MUTE_LOGS ? false : true,
    override: true,
});

type ConfigVars = {
    [key: string]: string;
};

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    SECRET_KEY,
    LOG_FORMAT,
    LOG_LEVEL,
    LOG_DIR,
    ORIGIN,
    MUTE_LOGS,
} = process.env as ConfigVars;
