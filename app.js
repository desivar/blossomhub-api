const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const errorHandler = require('./middleware/errorHandler');

// Only import the routes you are actively using
const flowerRoutes = require('./routes/flowerRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// You should no longer have imports for:
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const wishlistRoutes = require('./routes/wishlistRoutes');
// const orderRoutes = require('./routes/orderRoutes');

const app = express();

// No Passport config or initialization here now
// require('./config/passport')(passport);
// app.use(passport.initialize());

// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes - Only mount the ones you want active
app.use('/api/flowers', flowerRoutes);
app.use('/api/categories', categoryRoutes);

// You should no longer have mountings for:
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/orders', orderRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/', (req, res) => {
    res.send('BlossomHub API is running!');
});

// Centralized error handling middleware (always keep this last)
app.use(errorHandler);

module.exports = app;