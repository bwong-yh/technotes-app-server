import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import viewRouter from './routes/viewPage.mjs';
import { logger } from './middleware/logger.mjs';

const app = express();
const PORT = process.env.PORT || 8003;

// middlewares
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(viewRouter);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
