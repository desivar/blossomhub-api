const express = require('express');
const { getFlowers, getFlowerById } = require('../controllers/flowerController');
const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Flowers
 * description: API for managing flower inventory
 */

/**
 * @swagger
 * /flowers:
 * get:
 * summary: Get all flowers
 * tags: [Flowers]
 * parameters:
 * - in: query
 * name: category
 * schema:
 * type: string
 * description: Filter by category ID
 * - in: query
 * name: search
 * schema:
 * type: string
 * description: Search by flower name (case-insensitive)
 * - in: query
 * name: minPrice
 * schema:
 * type: number
 * description: Filter by minimum price
 * - in: query
 * name: maxPrice
 * schema:
 * type: number
 * description: Filter by maximum price
 * - in: query
 * name: isFeatured
 * schema:
 * type: boolean
 * description: Filter by featured status (true/false)
 * responses:
 * 200:
 * description: A list of flowers.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success: { type: boolean, example: true }
 * count: { type: integer, example: 10 }
 * data:
 * type: array
 * items:
 * $ref: '#/components/schemas/Flower'
 * 500:
 * description: Server error
 */
router.get('/', getFlowers);

/**
 * @swagger
 * /flowers/{id}:
 * get:
 * summary: Get a single flower by ID
 * tags: [Flowers]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The flower ID
 * responses:
 * 200:
 * description: Flower data.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success: { type: boolean, example: true }
 * data:
 * $ref: '#/components/schemas/Flower'
 * 404:
 * description: Flower not found
 * 500:
 * description: Server error
 */
router.get('/:id', getFlowerById);

module.exports = router;