import supertest from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import { log } from 'console';

describe('just testing jest', () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });
  it('should return ture', async () => {
    const endpoint = '/healthcheck';
    const request = supertest(app);
    const response = await request.get(endpoint);
    log(response.body);
    expect(true).toBe(true);
  });
});
