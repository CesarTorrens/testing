const request = require('supertest');
const { MongoClient } = require('mongodb');

const { config } = require('../config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

const createApp = require('../app');

describe('test for hello endpoint', () => {
  let app = null;
  let server = null;
  let database = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.dropDatabase();
  });

  describe('test for get /api/v1/books', () => {
    test('should return hello world', async () => {
      // Arrange
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Book1',
          years: 1998,
          author: 'Cesar',
        },
        {
          name: 'Book2',
          years: 1998,
          author: 'Cesar',
        },
      ]);
      // Act
      const { body } = await request(app).get('/api/v1/books');
      // Assert
      expect(body.length).toEqual(seedData.insertedCount);
    });
  });
});
