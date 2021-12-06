import Joi from 'joi';

export function validateCreateStaff(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    role: Joi.string().required(),
    phone: Joi.string()
      .min(11)
      .max(11)
      .required(),
    username: Joi.string().required(),
  });
  return schema.validate(user);
}

export function validateUserLogin(user) {
  const schema = Joi.object({
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    username: Joi.string().required(),
  });
  return schema.validate(user);
}
