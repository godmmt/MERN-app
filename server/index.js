import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/index.js';

// connect to DB
(async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect to Mongo Atlas.');
  } catch (error) {
    console.log(error);
  }
})();
// server app
const app = express();
// middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routers
app.use('/api', apiRouter);
// listen on port
app.listen(process.env.PORT, () => {
  console.log('Server running on port 8080.');
});
