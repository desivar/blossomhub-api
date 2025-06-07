const express = require('express');
const { getFlowers, getFlowerById, createFlower } = require('../controllers/flowerController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Flowers
 *     description: API for managing flower inventory
 */

/**
 * @swagger
 * /flowers:
 *   get:
 *     summary: Get all flowers
 *     tags: [Flowers]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by flower name (case-insensitive)
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter by minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter by maximum price
 *       - in: query
 *         name: isFeatured
 *         schema:
 *           type: boolean
 *         description: Filter by featured status (true/false)
 *     responses:
 *       200:
 *         description: A list of flowers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Flower'
 *       500:
 *         description: Server error
 */
router.get('/', getFlowers);

/**
 * @swagger
 * /flowers/{id}:
 *   get:
 *     summary: Get a single flower by ID
 *     tags: [Flowers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The flower ID
 *     responses:
 *       200:
 *         description: Flower data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Flower'
 *       404:
 *         description: Flower not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getFlowerById);


/**
 * @swagger
 * /flowers:
 *   post:
 *     summary: Create a new flower
 *     tags: [Flowers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tulip
 *               description:
 *                 type: string
 *                 example: Bright and cheerful spring flower
 *               price:
 *                 type: number
 *                 example: 12.99
 *               categoryId:
 *                 type: string
 *                 description: MongoDB ObjectId of the category
 *                 example: 665fcd123abc4567def890ab
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/images/tulip.jpg
 *               stock:
 *                 type: integer
 *                 example: 20
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Flower created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 666abc123def456ghi789jkl
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 category:
 *                   type: string
 *                   description: Populated category ID
 *                 imageUrl:
 *                   type: string
 *                 stock:
 *                   type: integer
 *                 isFeatured:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", createFlower);

module.exports = router;


