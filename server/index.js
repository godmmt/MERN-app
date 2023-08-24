import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/index.js';
import corsOptionsDelegate from './helpers/cors.helper.js';
import connectToDB from './config/db.config.js';

// server app
const app = express();

// connect to DB
connectToDB();

// middleware
app.use(morgan('tiny'));
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/api', apiRouter);

// listen on port
app.listen(process.env.PORT, () => {
  console.log('Server running on port 8080.');
});
