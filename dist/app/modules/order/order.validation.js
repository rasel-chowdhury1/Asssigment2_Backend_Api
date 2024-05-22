"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const orderValidationSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.base': 'Email should be a string.',
        'string.email': 'Email must be a valid email. ',
        'string.empty': 'Email cannot be empty. ',
        'any.required': 'Email is Required. '
    }),
    productId: joi_1.default.string()
        .required()
        .messages({
        'string.base': 'Product id should be a string',
        'string.empty': 'Product id can not be empty',
        'any.required': 'Product id is required.'
    }),
    price: joi_1.default.number()
        .positive()
        .required()
        .messages({
        'number.base': 'Price should be a number.',
        'number.positive': 'Price should be a positve number.',
        'any.required': 'Price is required. '
    }),
    quantity: joi_1.default.number()
        .integer()
        .min(1)
        .required()
        .messages({
        'number.base': 'Quantity should be a number.',
        'number.integer': "Quantity must be a integer number",
        'number.min': 'Quantity must be at least 1',
        'any.required': 'Quantity is required. '
    })
});
exports.default = orderValidationSchema;
