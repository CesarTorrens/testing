const request = require('supertest');

const createApp = require('../app');

describe('test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('test for get', () => {
    test('should return hello world', async () => {
      const res = await request(app).get('/');
      expect(res.text).toEqual('Hello World!');
    });
  });
});
