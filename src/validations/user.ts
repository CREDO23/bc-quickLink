import * as joi from 'joi';

class UserValidation {
  static create = joi
    .object({
      username: joi.string().required().min(5).max(15).messages({
        'any.required': 'The username is required',
        'any.min': 'The username must be at least 5 characters',
        'any.max': 'The username must be at most 15 characters',
      }),
      password: joi.string().required().min(5).messages({
        'any.required': 'The passowrd is required',
        'any.min': 'The name must be at least 5 characters',
      }),
      email: joi.string().required().email().messages({
        'any.required': 'The email is required',
        'any.email': 'You must provide a valid email address',
      }),
    })
    .required()
    .messages({
      'any.required': 'You must provide user information',
    });

  static update = joi.object({
    password: joi.string().required().min(5).messages({
      'any.required': 'The passowrd is required',
      'any.min': 'The name must be at least 5 characters',
    }),
    email: joi.string().required().email().messages({
      'any.required': 'The email is required',
      'any.email': 'You must provide a valid email address',
    }),
  });
}

export default UserValidation;
