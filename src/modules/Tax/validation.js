import Joi from 'joi';

export function validateCreateTax(tax) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    source_of_income: Joi.string().required(),
    tin: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    incomes: Joi.array().items(
      Joi.object({
        income: Joi.number().required(),
        amount_tax_paid: Joi.number().required(),
        year: Joi.string().required(),
      })
    ),
  });
  return schema.validate(tax);
}

export function validateApproveTax(tax) {
  const schema = Joi.object({
    officer_remarks: Joi.string()
      .min(3)
      .required(),
  });
  return schema.validate(tax);
}

export function validateAssignOfficer(tax) {
  const schema = Joi.object({
    taxIds: Joi.array().required(),
    staff_id: Joi.number().required(),
  });
  return schema.validate(tax);
}
