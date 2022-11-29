require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const {
  userBodyValidator,
  userLoginValidator,
} = require('./utils/celebrateValidators');
const errorMessages = require('./utils/errorMessages');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors);

app.use(bodyParser.json());

/* логирование запросов */
app.use(requestLogger);
/* авторизация */
app.post('/signin', userLoginValidator, login);
/* регистрация */
app.post('/signup', userBodyValidator, createUser);
/* маршрутизация */
app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError(errorMessages.incorrectRoute));
});
/* логирование ошибок */
app.use(errorLogger);
/* обработка ошибок celebrate */
app.use(errors());
/* обработка ошибок */
app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });
  next();
});
/* включение API */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
