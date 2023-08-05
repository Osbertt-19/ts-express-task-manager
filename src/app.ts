import express from 'express';
import Logger from './core/Logger';
import cors from 'cors';
import { corsUrl } from './config';
import './database'; // initialize database
import './cache'; // initialize cache

import routes from './routes';
import errorHandler from './error/errorHandler';
import notFound from './error/notFound';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(notFound);

// Middleware Error Handler
app.use(errorHandler);

export default app;
