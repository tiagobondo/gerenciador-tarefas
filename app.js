import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import { fileURLToPath } from 'url'

import { autheticated } from './app/middlewares/auth.js'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const app = express();

const path_file = fileURLToPath(import.meta.url)
const name_path = path.dirname(path_file)

// view engine setup
app.set('views', path.join(name_path, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(name_path, 'public')));

app.use('/', indexRouter);
app.use('/users', autheticated, usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app