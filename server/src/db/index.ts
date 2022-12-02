import { MediaItem, User } from '@/models';
import { JsonDB, Config } from 'node-json-db';
import { join } from 'path';

const file = join(__dirname, 'db.json');
const db = new JsonDB(new Config(file, true, false, '/'));

export default db;
