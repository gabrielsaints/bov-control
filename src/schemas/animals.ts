import Joi from '@hapi/joi';

import Validate from '../helpers/validate';

const id = Joi.custom((value: any, helpers: any) => {
  if (!Validate.objectId(value)) {
    return helpers.error('ObjectId is invalid');
  }

  return value;
});

const post = Joi.object().keys({
  weight: Joi.number()
    .min(0.1)
    .required(),
  ageInMonths: Joi.number()
    .min(0)
    .required(),
  name: Joi.string()
    .min(2)
    .required(),
  type: Joi.string()
    .min(2)
    .required(),
});

const put = Joi.object().keys({
  id,
  weight: Joi.number().min(0.1),
  ageInMonths: Joi.number().min(0),
  name: Joi.string().min(2),
  type: Joi.string().min(2),
});

const del = Joi.object().keys({
  id,
});

export { post, put, del };
