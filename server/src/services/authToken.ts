import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';

const options: jwt.SignOptions = {
    // algorithm: 'RS256',
    // expiresIn: 60 * 60 * 60,
};

type TokenPayload = { email: string; id: string };

export const sign = (user: TokenPayload) =>
    new Promise((resolve, reject) => {
        jwt.sign({ user }, SECRET_KEY, options, (err, token) => {
            err ? reject(err) : resolve(token);
        });
    });

export const verify = (token: string): Promise<TokenPayload> =>
    new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
            err ? reject(err) : resolve(decodedToken as TokenPayload);
        });
    });
