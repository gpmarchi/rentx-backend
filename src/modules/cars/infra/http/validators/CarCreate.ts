import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    daily_rent_value: Joi.number().required(),
  }),
});