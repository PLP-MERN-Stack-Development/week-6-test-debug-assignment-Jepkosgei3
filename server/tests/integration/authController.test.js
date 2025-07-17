import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app.js';
import User from '../../src/models/userModel.js';
import request from 'supertest';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'password123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should login an existing user', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser2',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser2',
      password: 'password123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
