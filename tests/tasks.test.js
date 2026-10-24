const request = require('supertest');
const app = require('../src/app');

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

  it('renvoie la liste des tâches', async () => {
    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});