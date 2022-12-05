export enum MediaCategory {
    ALL,
    MOVIES,
    TV_SERIES,
    FAVORITES,
}

export type MediaItem = {
    title: string;
    thumbnail: {
        trending: {
            small: string;
            large: string;
        };
        regular: {
            small: string;
            medium: string;
            large: string;
        };
    };
    year: number;
    category: MediaCategory;
    rating: 'PG' | 'E' | '18+';
    isBookmarked: boolean;
    isTrending: boolean;
    uuid: string;
};

export type User = {
    _id: string;
    email: string;
    password: string;
    favorites: string[];
};
