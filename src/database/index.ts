import mongoose from 'mongoose';
import Logger from '../core/Logger';
import { db, environment } from '../config';

// Build the connection string
let dbName = db.name;
if (environment == 'test') {
  dbName = db.testName;
}
const dbURI = `mongodb://${db.host}:${db.port}/${dbName}`;

const options = {
  // autoIndex: true,
  // minPoolSize: db.minPoolSize, // Maintain up to x socket connections
  // maxPoolSize: db.maxPoolSize, // Maintain up to x socket connections
  // connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

Logger.debug(dbURI);

mongoose.set('strictQuery', true);

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    Logger.info('Mongoose connection done');
  })
  .catch((e) => {
    Logger.info('Mongoose connection error');
    Logger.error(e);
  });

export const connection = mongoose.connection;
