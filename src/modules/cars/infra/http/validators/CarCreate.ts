import { celebrate, Joi, Segments } from 'celebrate';

export default celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    daily_rent_value: Joi.number().required(),
    specifications: Joi.array()
      .required()
      .items(
        Joi.object().required().keys({
          specification_id: Joi.string().uuid().required(),
          value: Joi.string().required(),
        }),
      ),
    fuel_id: Joi.string().uuid().required(),
    transmission_id: Joi.string().uuid().required(),
  }),
});
