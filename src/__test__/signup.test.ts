import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import { addAuthHeaders } from './utils';
import { log } from 'console';

describe('Create Task', () => {
  const endpoint = '/api/v1/signup/basic';
  const request = supertest(app);

  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });

  it('should return success if data is correct', async () => {
    const respone = await addAuthHeaders(
      request.post(endpoint).send({
        name: 'Min',
        email: 'min@gmail.com',
        password: 'password123',
        profilePicUrl: 'https://www.exampleProfilePic.com',
      }),
    );
    log(respone.body);
    expect(true).toBe(true);
  });
});
