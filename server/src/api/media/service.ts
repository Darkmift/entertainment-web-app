import { MediaCategory, MediaItem, User } from '@/models';
import { logger } from '@/utils/logger';
import data from '@/data/media.json';

const mediaData = data as unknown as MediaItem[];
const movies = mediaData.filter(m => m.category === MediaCategory.MOVIES);
const series = mediaData.filter(m => m.category === MediaCategory.TV_SERIES);

export default function getMedia(
    category: MediaCategory,
    user: User,
): MediaItem[] {
    logger.info('mediaService->Pre' + JSON.stringify({ category, user }));

    switch (category) {
        case MediaCategory.ALL:
            return mediaData;
        case MediaCategory.MOVIES:
            return movies;
        case MediaCategory.TV_SERIES:
            return series;
        case MediaCategory.FAVORITES:
            return mediaData.filter(m => m.isBookmarked);

        default:
            logger.error('Unknown category');
            return [];
    }
}

export function toggleFavorite(mediaItemId: string, userId: string): boolean {
    return true;
}
