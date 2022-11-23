const router = require('express').Router();
const {
  cardIdValidator,
  cardBodyValidator,
} = require('../utils/celebrateValidators');
const {
  getCards,
  createCard,
  deleteCard,
  addlikeCard,
  deletelikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', cardBodyValidator, createCard);
router.delete('/:cardId', cardIdValidator, deleteCard);
router.put('/:cardId/likes', cardIdValidator, addlikeCard);
router.delete('/:cardId/likes', cardIdValidator, deletelikeCard);

module.exports = router;
