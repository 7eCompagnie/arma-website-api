const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Failed to authenticate token.'
        });
    }
    return next();
}

module.exports = verifyToken;
