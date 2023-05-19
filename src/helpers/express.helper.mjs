import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

export function init() {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', join(__dirname, 'views'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(join(__dirname, 'public')));

    return app;
}