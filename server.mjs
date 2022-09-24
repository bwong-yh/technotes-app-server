import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDB from './config/dbConnection.mjs';
import viewRouter from './routes/pageRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';

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
app.use('/api/users', userRoutes);
app.use(viewRouter);

mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
  app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
});

mongoose.connection.on('error', () => {
  console.log(error);
});
