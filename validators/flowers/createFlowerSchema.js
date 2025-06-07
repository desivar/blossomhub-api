const joi = require("joi");
const Category = require("../../models/Category");

const createFlowerSchema = joi.object({
  name: joi.string().optional(),
  description: joi.string().optional(),
  price: joi.number().required(),
  Category: joi.string().required(),
  imageUrl: joi.string().optional(),
  stock: joi.number().required(),
  isFeatured: joi.boolean().required()
});

module.exports = { createFlowerSchema };
