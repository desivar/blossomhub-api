const express = require('express');
const { getCategories, getCategoryById } = require('../controllers/categoryController');
const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Categories
 * description: API for managing flower categories
 */

/**
 * @swagger
 * /categories:
 * get:
 * summary: Get all flower categories
 * tags: [Categories]
 * responses:
 * 200:
 * description: A list of categories.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success: { type: boolean, example: true }
 * count: { type: integer, example: 5 }
 * data:
 * type: array
 * items:
 * $ref: '#/components/schemas/Category'
 * 500:
 * description: Server error
 */
router.get('/', getCategories);

/**
 * @swagger
 * /categories/{id}:
 * get:
 * summary: Get a single category by ID
 * tags: [Categories]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The category ID
 * responses:
 * 200:
 * description: Category data.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success: { type: boolean, example: true }
 * data:
 * $ref: '#/components/schemas/Category'
 * 404:
 * description: Category not found
 * 500:
 * description: Server error
 */
router.get('/:id', getCategoryById);

module.exports = router;