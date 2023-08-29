const ErrorHandler=require('../utils/errorhandler')
const Joi=require('joi')

const firstName = Joi.string()
  .required()
  .min(2)
  .max(20)
  .label("firstName")
  .messages({
    "string.base": `{#label} must have a type of string`,
    "string.min": `{#label} should have minimum length of {#limit}`,
    "string.max": `{#label} can not be more than {#limit}`,
    "any.required": `{#label} is required`,
  });

  const lastName = Joi.string()
  .required()
  .min(1)
  .max(20)
  .label("lastName")
  .messages({
    "string.base": `{#label} must have a type of string`,
    "string.min": `{#label} should have minimum length of {#limit}`,
    "string.max": `{#label} can not be more than {#limit}`,
    "any.required": `{#label} is required`,
  });

  const email = Joi.string()
  .email()
  .label("email")
  .messages({
    "string.base": `{#label} must be a type of string`,
    "string.email": `{#label} must be an Email`,
  });

  const password = Joi.string()
  .required()
  .label('Password')
  .pattern(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,}$/)
  .message('Password must be at least 4 characters long and contain at least one letter and one digit.');
 
  const options = {
    errors: {
      wrap: {
        label: '' 
      }
    }
  };

const registerObj = Joi.object({
    firstName,
    lastName,
    email,
    password
 
});
const loginObj = Joi.object({
    email,
    password
 
});

exports.registerValidate = async (req, res, next) => {
  try {
    await registerObj.validateAsync(req.body, options);
  } catch (e) {
    return next(new ErrorHandler(e.message))
  }
  return next();
};

exports.loginValidate = async (req, res, next) => {
    try {
      await loginObj.validateAsync(req.body, options);
    } catch (e) {
      return next(new ErrorHandler(e.message))
    }
    return next();
  };
  
  