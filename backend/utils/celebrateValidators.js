const { celebrate, Joi } = require('celebrate');

const schemeObjectId = Joi.string().alphanum().hex().length(24);
const schemeEmail = Joi.string().email();
const schemeUrl = Joi.string()
  .pattern(/^https?:\/\/(www.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[\w-._~:/?#[\]@!$'()*+,;=]*#?/);

const cardBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: schemeUrl.required(),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: schemeObjectId.required(),
  }),
});

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: schemeUrl.required(),
  }),
});

const userLoginValidator = celebrate({
  body: Joi.object().keys({
    email: schemeEmail.required(),
    password: Joi.string().required(),
  }),
});

const userBodyValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: schemeUrl,
    email: schemeEmail.required(),
    password: Joi.string().required(),
  }),
});

const userDescriptValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: schemeObjectId.required(),
  }),
});

module.exports = {
  cardBodyValidator,
  cardIdValidator,
  userAvatarValidator,
  userLoginValidator,
  userBodyValidator,
  userDescriptValidator,
  userIdValidator,
};
