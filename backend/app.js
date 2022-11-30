require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors: errorsCelebrate } = require('celebrate');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors);

app.use(bodyParser.json());
/* логирование запросов */
app.use(requestLogger);
/* подключение роутеров */
app.use(router);
/* логирование ошибок */
app.use(errorLogger);
/* обработка ошибок celebrate */
app.use(errorsCelebrate());
/* обработка ошибок */
app.use(errors);
/* включение API */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
