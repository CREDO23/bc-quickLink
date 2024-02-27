import * as joi from 'joi';

class LinkValidation {
  static create = joi
    .object({
      value: joi
        .string()
        .required()
        .regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
        .messages({
          'any.regex': 'You must provide a valid url',
          'any.required': 'The url is required',
        }),

        maker : joi.string().required()
    })
    .required()
    .messages({
      'any.required': 'You must provide link information',
    });
}

export default LinkValidation;
