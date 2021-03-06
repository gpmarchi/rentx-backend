import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    unit: Joi.string(),
    icon_id: Joi.string().uuid().required(),
  }),
});
