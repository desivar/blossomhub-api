const passport = require('passport');
const jwt = require('jsonwebtoken');

// Middleware to protect routes by verifying JWT
const protect = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // No user found, token might be invalid or expired
            return res.status(401).json({ success: false, error: 'Unauthorized: No token provided or token invalid.' });
        }
        req.user = user; // Attach the user to the request object
        next();
    })(req, res, next);
};

module.exports = { protect };