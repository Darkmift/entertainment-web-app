import { User } from '@/db/models/User';
import { sign } from '@/services/authToken';
import { logger } from '@/utils/logger';
import { compare, hash } from '@services/encryption';

export async function signup(email: string, password: string) {
    const modelExists = await User.findOne({ where: { email } });
    if (modelExists) {
        throw new Error('email not available');
    }

    const hashedPassword = hash(password);

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    (newUser as { password?: string }).password = undefined;
    return newUser;
}

export async function signIn(email: string, password: string) {
    const modelExists = await User.findOne({ where: { email } });
    if (!modelExists) {
        logger.error('login failed: no user');
        throw new Error('not authorized');
    }

    const hashedPassword = compare(password, modelExists.password);

    if (!hashedPassword) {
        logger.error('login failed: pw mismatch');
        throw new Error('not authorized');
    }

    const token = await sign({ id: modelExists.id, email });

    return { token };
}
