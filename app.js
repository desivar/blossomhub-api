const express = require('express');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger'); // Import Swagger configuration
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const flowerRoutes = require('./routes/flowerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Passport config (ensure this runs before any route that uses passport)
require('./config/passport')(passport);

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(passport.initialize()); // Initialize Passport

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/flowers', flowerRoutes); // Changed to /api/flowers for consistency
app.use('/api/categories', categoryRoutes); // Changed to /api/categories
app.use('/api/users', userRoutes); // Changed to /api/users
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/', (req, res) => {
    res.send('BlossomHub API is running!');
});

// Centralized error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;