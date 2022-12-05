import { MediaCategory, MediaItem } from '@/models';
import { logger } from '@/utils/logger';
import data from '@/data/media.json';
import db from '@/db';
import { Favorites } from '@/db/models/Favorites';

const mediaData = data as unknown as MediaItem[];
const movies = mediaData.filter(m => m.category === MediaCategory.MOVIES);
const series = mediaData.filter(m => m.category === MediaCategory.TV_SERIES);

const _FavoritesModel = db.sequelize.models.Favorites;

export default function getMedia(category: MediaCategory): MediaItem[] {
    logger.info('mediaService->Pre' + JSON.stringify({ category }));

    switch (category) {
        case MediaCategory.ALL:
            return mediaData;
        case MediaCategory.MOVIES:
            return movies;
        case MediaCategory.TV_SERIES:
            return series;
        default:
            logger.error('Unknown category');
            return [];
    }
}

export async function toggleFavorite(
    mediaItemId: string,
    userId: string,
): Promise<boolean | null> {
    const favoriteEntry = await _FavoritesModel.findOne({
        where: { mediId: mediaItemId, userId: userId },
    });

    logger.info(
        'Favorite entry id search result: ' + favoriteEntry?.getDataValue('id'),
    );

    if (!favoriteEntry) {
        logger.info(
            'Favorites create entry:' + JSON.stringify({ mediaItemId, userId }),
        );
        await _FavoritesModel.create({
            userId,
            mediId: mediaItemId,
        });
        return true;
    }

    logger.info(
        'Favorites delete entry:' + JSON.stringify({ mediaItemId, userId }),
    );
    await _FavoritesModel.destroy({
        where: { mediId: mediaItemId, userId: userId },
    });
    return false;
}

export async function getFavoriteList(id: string): Promise<Favorites[]> {
    const favorites = await _FavoritesModel.findAll({
        where: { userId: id },
    });

    return favorites as Favorites[];
}
