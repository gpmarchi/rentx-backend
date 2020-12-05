import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    car_id: Joi.string().uuid().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
  }),
});
