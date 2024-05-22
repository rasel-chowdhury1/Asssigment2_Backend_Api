import Joi from "joi";


const orderValidationSchema = Joi.object({
    email: Joi.string()
              .email()
              .required()
              .messages({
                'string.base': 'Email should be a string.',
                'string.email': 'Email must be a valid email. ',
                'string.empty': 'Email cannot be empty. ',
                'any.required': 'Email is Required. '
              }),
    productId: Joi.string()
                  .required()
                  .messages({
                    'string.base': 'Product id should be a string',
                    'string.empty': 'Product id can not be empty',
                    'any.required': 'Product id is required.'
                  }),
    price: Joi.number()
              .positive() 
              .required()
              .messages({
                'number.base': 'Price should be a number.',
                'number.positive': 'Price should be a positve number.',
                'any.required': 'Price is required. '
              }),
    quantity: Joi.number()
                 .integer()
                 .min(1)
                 .required()
                 .messages({
                    'number.base': 'Quantity should be a number.',
                    'number.integer': "Quantity must be a integer number",
                    'number.min': 'Quantity must be at least 1',
                    'any.required': 'Quantity is required. '
                 })
})


export default orderValidationSchema;