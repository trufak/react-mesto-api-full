const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const {
  userBodyValidator,
  userLoginValidator,
} = require('../utils/celebrateValidators');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const errorMessages = require('../utils/errorMessages');

/* краш-тест */
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
/* авторизация */
router.post('/signin', userLoginValidator, login);
/* регистрация */
router.post('/signup', userBodyValidator, createUser);
/* маршрутизация */
router.use('/users', auth, usersRouter);

router.use('/cards', auth, cardsRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(errorMessages.incorrectRoute));
});

module.exports = router;
