const joi = require("joi");

const createCategorySchema = joi.object({
  name: joi.string().optional(),
  description: joi.string().optional(),
});

module.exports = { createCategorySchema };
