declare namespace Express {
    interface Request {
        uuid?: string;
        body?: {
            userId?: string;
            favoriteItem?: { mediaItemId?: string; toggled?: boolean };
        };
    }
}

type DBData = {
    users: User[];
    media: MediaItem[];
};
