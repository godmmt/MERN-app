import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/index.js';
import corsOptionsDelegate from './config/cors.config.js';
import connectToDB from './config/db.config.js';

// server app
const app = express();

// connect to DB
connectToDB();

// middleware
app.use(morgan('tiny')); // 印出請求的資訊(http methods, url)
app.use(cors(corsOptionsDelegate)); // 是否符合同源政策(domain)
app.use(express.json()); // parse JSON to object
app.use(express.urlencoded({ extended: true })); // parse URL

// routers
app.use('/api', apiRouter);

// listen on port
app.listen(process.env.PORT, () => {
  console.log('Server running on port 8080.');
});
