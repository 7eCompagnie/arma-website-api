const jwt = require("jsonwebtoken");

const hasRole = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let hasRole = false;

        roles.forEach(role => {
            if (decoded.roles.includes(role))
                hasRole = true;
        })

        if (hasRole)
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