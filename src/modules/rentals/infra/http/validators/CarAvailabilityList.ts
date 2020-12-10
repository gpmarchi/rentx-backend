import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.QUERY]: Joi.object().keys({
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
  }),
});
