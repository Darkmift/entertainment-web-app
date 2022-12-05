import bcrypt from 'bcryptjs';

const saltRounds = bcrypt.genSaltSync(10);

export function hashAsync(password: string) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });
}

export function compareAsync(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, comparisonResult) {
            if (err) reject(err);
            resolve(comparisonResult);
        });
    });
}
