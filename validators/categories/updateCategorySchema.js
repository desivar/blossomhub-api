const joi = require("joi");

const updateCategorySchema = joi.object({
  name: joi.string().optional(),
  description: joi.string().optional(),
  createAt: joi.string().optional(),
});

module.exports = { updateCategorySchema };
