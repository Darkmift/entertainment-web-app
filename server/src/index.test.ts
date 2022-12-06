import { describe, afterEach, beforeAll, expect, test } from '@jest/globals';
import supertest from 'supertest';
import server from './index';

describe('Server', () => {
    let request: any;

    beforeAll(async () => {
        request = supertest(server);
    });

    afterEach(async function () {
        server.close();
    });

    test('should pass', async () => {
        const response = await request.get('/api/health');
        expect(response.status).toEqual(200);
    });
});
