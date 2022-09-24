import express from 'express';
import path from 'path';
import viewRouter from './routes/viewPage.mjs';
import getDirname from './utils/getDirname.mjs';

const __dirname = getDirname(import.meta.url);

const app = express();
const PORT = process.env.PORT || 8003;

// app.use to serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(viewRouter);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
