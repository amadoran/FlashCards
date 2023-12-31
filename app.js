var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

/* MÓDULO dotenv */
const dotenv = require('dotenv');

/* CARGA DE DATOS DE CONFIGURACION EN MEMORIA */
dotenv.config();

/* CARGA DEL MIDDLEWARE authenticateJWT */
var authenticateJWT = require('./middleware/auth');
/* REFERENCIA AL MÓDULO */
const swaggerUi = require('swagger-ui-express')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/rest_user');
var flashcardRouter = require('./routes/rest_flashcard');
var topicRouter = require('./routes/rest_topic');
var flashcard_topicRouter = require('./routes/rest_flashcard_topic');

/* REFERENCIA AL ARCHIVO GENERADO */
const swaggerFile = require('./swagger_output.json')

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/rest/user', authenticateJWT, userRouter);
app.use('/rest/flashcard', flashcardRouter);
app.use('/rest/topic', topicRouter);
app.use('/rest/flashcard_topic', flashcard_topicRouter);
/* CONFIGURACIÓN DE LA RUTA A LA DOCUMENTACIÓN */
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
