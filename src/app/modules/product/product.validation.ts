import Joi from "joi";

const variantsValidationSchema = Joi.object({
    type: Joi.string()
             .required()
             .messages({
                'string.base': '"type" should be a type of string',
                'string.empty': '"type" cannot be an empty field',
                'any.required': '"type" is required',
              }),

    value: Joi.string()
              .required()
              .messages({
                'string.base': '"value" should be a type of string',
                'string.empty': ' "value" connot be an empty field',
                'any.required': '"value" is required'
              })
})


const invertoryValidationSchema = Joi.object({
    quantity: Joi.number()
                 .integer()
                 .min(0)
                 .required()
                 .messages({
                    'number.base': 'Quantiy should be a number',
                    'number.integer': 'Quantity should be an integer',
                    'number.min': 'Quantity can not be less than 0',
                    'any.required': 'Quantity is required'
                 }),
    inStock: Joi.boolean()
                .required()
                .messages({
                    'boolean.base': 'Instock should be a boolean value',
                    'any.required': 'InStock is required'
                })
})

const productValidationSchema = Joi.object({
    name: Joi.string()
             .required()
             .messages({
                'string.base': 'name should be a string',
                'any.required': 'name is required'
             }),
    description: Joi.string()
                    .required()
                    .messages({
                       'string.base': 'description should be a string',
                       'any.required': 'description is required'
                    }),
    price: Joi.number()
              .positive()
              .required()
              .messages({
                'number.base':'Price should be a number',
                'number.positive': 'Price should be a positive number',
                'any.required': 'Price is required'
              }),
    category: Joi.string()
                 .required()
                 .messages({
                    'string.base': 'Category should be a string',
                    'string.empty': 'Category can not be empty',
                    'any.required': 'Category is required'
                 }),
    tags: Joi.array().items( Joi.string()
                                .messages({
                                  'string.base' : 'Each tag should be a string'
                                }))
                     .required()
                     .messages({
                        'array.base':'tags should be an array',
                        'any.required': 'tags are required'
                     }),
    variants: Joi.array()
                 .items(variantsValidationSchema)
                 .required()
                 .messages({
                    'array.base': 'variants should be an array',
                    'any.required': 'variants is required'
                 }),
    inventory: invertoryValidationSchema.required()
                                        .messages({
                                            'any.required':'Inventory is required'
                                        }),

})

export default productValidationSchema;