const jwt = require("jsonwebtoken");

const hasRole = (role) => {
    return (req, res, next) => {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.roles.includes(role))
            return next();
        else {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to access this resource.'
            });
        }
    }
}

module.exports = hasRole;