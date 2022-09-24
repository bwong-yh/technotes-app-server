import express from 'express';
import path from 'path';
import getDirname from '../utils/getDirname.mjs';

const router = express.Router();
const __dirname = getDirname(import.meta.url);

router.get('/about(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
});

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

export default router;
