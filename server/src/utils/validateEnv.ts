import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        LOG_FORMAT: str({
            choices: ['combined', 'common', 'dev', 'short', 'tiny'],
        }),
    });
}

export default validateEnv;
