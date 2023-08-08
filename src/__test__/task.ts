// import mongoose from 'mongoose';
// import supertest from 'supertest';
// import app from '../app';

// describe('Create Task', () => {
//   const endpoint = '/api/v1/tasks';
//   const request = supertest(app);

//   beforeAll((done) => {
//     done();
//   });

//   afterAll((done) => {
//     // Closing the DB connection allows Jest to exit successfully.
//     mongoose.connection.close();
//     done();
//   });

//   it('should return success if data is correct', async() => {
//     const respones = await request.post(endpoint).send({
//         title:'task1',
//         note:'note',
//         category:'category',
//         deadline:new Date()
//     })
//   });
// });
