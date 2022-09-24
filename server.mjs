import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import viewRouter from './routes/viewPage.mjs';
import mongoose from 'mongoose';
import connectDB from './config/dbConnection.mjs';

const app = express();
const PORT = process.env.PORT || 8003;

console.log(process.env.NODE_ENV);

// connect to db
connectDB();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(viewRouter);

mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
  app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
});

mongoose.connection.on('error', () => {
  console.log(error);
});
