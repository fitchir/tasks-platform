const request = require('supertest');
const app = require('../src/app');
const { pool, initializeDatabase } = require('../src/db');

beforeAll(async () => {
  await initializeDatabase();
});

beforeEach(async () => {
  await pool.query('DELETE FROM tasks');
});

afterAll(async () => {
  await pool.end();
});

describe('Routes /tasks', () => {
  it('crée une tâche avec un titre valide', async () => {
    const title = `Réviser DevOps ${Date.now()}`;

    const response = await request(app)
      .post('/tasks')
      .send({ title });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title,
      completed: false,
    });
    expect(response.body.id).toBeDefined();
  });

  it('refuse une tâche sans titre', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: '   ' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('renvoie les tâches enregistrées en base', async () => {
    const title = `Tâche de test ${Date.now()}`;

    await request(app).post('/tasks').send({ title });
    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title, completed: false }),
      ])
    );
  });
});