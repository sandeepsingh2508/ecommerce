const Joi = require("joi");
const ErrorHandler = require("../utils/errorhandler");

const address = Joi.string().label("address").min(3).max(50).messages({
  "string.base": `{#label} must be a type of string`,
  "string.min": `{#label} name should have minimum length of {#limit}`,
  "string.max": `{#label} name can not be more than {#limit}`,
  "any.required": `{#label}  is required`,
});

const city = Joi.string().min(3).max(30).label("city").messages({
  "string.base": `{#label} name must be a type of string`,
  "string.min": `{#label} name should have minimum length of {#limit}`,
  "string.max": `{#label} name can not be more than {#limit}`,
  "any.required": `{#label}  is required`,
});

const state = Joi.string().min(3).max(30).label("state").messages({
  "string.base": `{#label} name must be a type of string`,
  "string.min": `{#label} name should have minimum length of {#limit}`,
  "string.max": `{#label} name can not be more than {#limit}`,
  "any.required": `{#label}  is required`,
});

const country = Joi.string().min(3).max(30).label("country").messages({
  "string.base": `{#label} name must be a type of string`,
  "string.min": `{#label} name should have minimum length of {#limit}`,
  "string.max": `{#label} name can not be more than {#limit}`,
  "any.required": `{#label}  is required`,
});

const pincode = Joi.string()
  .regex(/^\d{6}$/)
  .label("pincode")
  .messages({
    "string.base": "{#label} must be a string",
    "string.pattern.base": "{#label} must be a 6-digit number",
    "any.required": `{#label}  is required`,
  });

const phoneNo = Joi.string()
  .required()
  .pattern(/^[0-9]{10}$/)
  .label("phoneNo")
  .messages({
    "string.base": `{#label} must have a type of string`,
    "string.pattern.base": `{#label} must have 10 digits numbers`,
    "any.required": `{#label} No is required`,
  });

  const options = {
    errors: {
      wrap: {
        label: '' 
      }
    }
  };

//   const orderItems=Joi.object()
  const shippingInfo=Joi.object({
        address,
        city,
        state,
        country,
        pincode,
        phoneNo,
      }) 
const createObj = Joi.object({
 shippingInfo,
//  orderItems
});

exports.createValidate = async (req, res, next) => {
  try {
    await createObj.validateAsync(req.body, options);
  } catch (e) {
    return next(new ErrorHandler(e.message));
  }
  return next();
};
