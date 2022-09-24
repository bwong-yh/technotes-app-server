import express from 'express';
import path from 'path';
import getDirname from '../utils/getDirname.mjs';

const router = express.Router();

router.get('/about(.html)?', (req, res) => {
  res.sendFile(
    path.join(getDirname(import.meta.url), '..', 'views', 'about.html')
  );
});

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(
    path.join(getDirname(import.meta.url), '..', 'views', 'index.html')
  );
});

router.get('/*', (req, res) => {
  res
    .status(404)
    .sendFile(
      path.join(getDirname(import.meta.url), '..', 'views', '404.html')
    );
});

export default router;
