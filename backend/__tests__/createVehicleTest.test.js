const request = require('supertest');
const app = require('../main');
let server;

describe('POST /api/vehicles', () => {
  beforeAll(() => {
    process.env.PORT = 3001; // Use a different port
    server = app.listen(process.env.PORT);
  });

  afterAll(() => {
    server.close();
  });

  it('should create a new vehicle', async () => {
    const res = await request(server)
      .post('/api/vehicles')
      .send({
        model: 'Tesla Model S',
        registration_number: 'ABC-1234',
        description: 'An electric car',
        seats: 5,
        rent: 200,
        user_id: 1
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('model', 'Tesla Model S');
  });
});
