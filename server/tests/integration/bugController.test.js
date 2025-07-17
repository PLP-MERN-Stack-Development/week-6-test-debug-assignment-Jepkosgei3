import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app.js';
import Bug from '../../src/models/bugModel.js';
import User from '../../src/models/userModel.js';
import request from 'supertest';

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Register and login a test user
  await request(app).post('/api/auth/register').send({
    username: 'buguser',
    password: 'bugpass123',
  });

  const res = await request(app).post('/api/auth/login').send({
    username: 'buguser',
    password: 'bugpass123',
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Bug Controller', () => {
  it('should create a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Bug',
        description: 'This is a test bug.',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Bug');
  });
});
