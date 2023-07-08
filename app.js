import express from 'express';
import path from 'path';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import MainRouter from './routes/views/main.js';
import LoginRouter from './routes/api/login.js';
import UserRouter from './routes/api/user.js';


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

app.use('/api/login', LoginRouter);
app.use('/api/user', UserRouter);
app.use('/', MainRouter);

app.use(express.static(__dirname + '/public'));




export default app;
