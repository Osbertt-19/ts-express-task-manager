import { Types } from 'mongoose';

export const API_KEY = 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj';
export const ACCESS_TOKEN = 'abc';
export const userId = new Types.ObjectId();

export const addHeaders = (request: any) =>
  request.set('Content-Type', 'application/json').set('x-api-key', API_KEY).timeout(2000);

export const addAuthHeaders = (request: any, accessToken = ACCESS_TOKEN) =>
  request
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accessToken}`)
    .set('x-api-key', API_KEY)
    .timeout(2000);
