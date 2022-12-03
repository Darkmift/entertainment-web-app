import { Request, Response, NextFunction } from 'express';
import { signIn, signup } from './service';

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await signup(email, password);

    res.json({ user });
}
export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { token } = await signIn(email, password);

    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    }).json({ email, token });
}
