const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/db');

describe('GET /health', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('returns HTTP 200 when the API and database are healthy', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      database: 'connected',
    });
  });
});