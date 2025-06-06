const Flower = require('../models/Flower');

/**
 * @desc    Get all flowers
 * @route   GET /api/flowers
 * @access  Public
 * @param   {object} req.query - Optional query parameters for filtering (category, search, minPrice, maxPrice, isFeatured)
 */
const getFlowers = async (req, res, next) => {
    try {
        const query = {};
        const { category, search, minPrice, maxPrice, isFeatured } = req.query;

        if (category) {
            query.category = category; // Assumes category is a valid ObjectId
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        if (isFeatured) {
            query.isFeatured = isFeatured === 'true'; // Convert string to boolean
        }

        const flowers = await Flower.find(query).populate('category'); // Populate category details
        res.status(200).json({
            success: true,
            count: flowers.length,
            data: flowers,
        });
    } catch (err) {
        next(err); // Pass error to centralized error handler
    }
};

/**
 * @desc    Get single flower by ID
 * @route   GET /api/flowers/:id
 * @access  Public
 */
const getFlowerById = async (req, res, next) => {
    try {
        // Use populate to fetch details of the referenced category
        const flower = await Flower.findById(req.params.id).populate('category');

        if (!flower) {
            const error = new Error(`Flower not found with ID of ${req.params.id}`);
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            data: flower,
        });
    } catch (err) {
        next(err); // Pass error to centralized error handler
    }
};

module.exports = {
    getFlowers,
    getFlowerById,
};