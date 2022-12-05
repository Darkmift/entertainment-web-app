declare namespace Express {
    interface Request {
        uuid?: string;
        user?: {
            email: decodedToken.email;
            id: decodedToken.userId;
        };
        body?: {
            mediaId?: string;
            category?: MediaCategory;
            userId?: string;
            favoriteItem?: { mediaItemId?: string; toggled?: boolean };
        };
    }
}

type DBData = {
    users: User[];
    media: MediaItem[];
};
