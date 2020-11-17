import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required().max(50),
    name: Joi.string(),
  }),
});
