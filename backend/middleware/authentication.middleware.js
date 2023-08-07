const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                error: 'Unauthorized. Please provide a valid token.',
            });
        }

        jwt.verify(token, "abhijeet", (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: 'Invalid token. Please provide a valid token.',
                });
            }

            userId = decoded.userId

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        console.error('Error while authenticating:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
};

module.exports = { authentication };
