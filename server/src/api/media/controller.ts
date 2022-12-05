import { logger } from '@/utils/logger';
import { Request, Response, NextFunction } from 'express';
import getMedia, { getFavoriteList, toggleFavorite } from './service';

export async function getAll(req: Request, res: Response, next: NextFunction) {
    const { category } = req.body;
    logger.info('category controller: category-> ' + category);
    const result = await getMedia(category);
    res.json(result);
}

export async function getFavorites(req: Request, res: Response) {
    // type safety
    if (!req?.user?.email) {
        throw new Error('getFavorites-> no user data');
    }
    const { email, id } = req.user;
    const favorites = await getFavoriteList(id);
    return res.json({ favorites, email: email });
}

export async function setOrRemoveFavorite(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // type safety
    if (!req.user?.id) {
        logger.error('setOrRemoveFavorite-> no user data');
        return;
    }

    const { id } = req.user;
    const { mediaId } = req.body;

    const result = await toggleFavorite(mediaId, id);
    logger.info(
        `favorite entry ${result ? 'added' : 'removed'} : ${JSON.stringify({
            mediaId,
            userId: id,
        })}`,
    );
    res.json(result);
}
