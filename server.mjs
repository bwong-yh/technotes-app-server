import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import viewRouter from './routes/viewPage.mjs';

const app = express();
const PORT = process.env.PORT || 8003;

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(viewRouter);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
