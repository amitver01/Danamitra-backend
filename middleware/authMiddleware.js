const jwt = require('jsonwebtoken');

const protectRoute = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token; // Assuming you're using cookies to store the token
    console.log(token);
    if (token) {
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user information to request object (can be used later)
            req.user = decoded;

            next(); // Continue to the protected route
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = protectRoute;
