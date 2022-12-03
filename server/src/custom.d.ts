declare namespace Express {
    interface Request {
        uuid?: string;
        user?: {
            email: decodedToken.email;
            id: decodedToken.userId;
        };
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
