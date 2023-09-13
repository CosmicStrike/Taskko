import express from 'express';
import path from 'path';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { InitializeDatabase } from './database.js';
import AuthRouter from './routes/api/auth.js';
import ViewRouter from './routes/views/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/public'));

// Initialize the database
InitializeDatabase();

app.use('/api/auth', AuthRouter);
app.use('/', ViewRouter);


export default app;
