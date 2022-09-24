import { fileURLToPath } from 'url';
import path from 'path';

// es6 doesn't work with node original __dirname
// https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const getDirname = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl);
  return path.dirname(__filename);
};

export default getDirname;
