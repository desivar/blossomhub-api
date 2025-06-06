const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is an admin, proceed
    } else {
        res.status(403).json({ success: false, error: 'Forbidden: Admin access required.' });
    }
};

module.exports = { admin };