const jwt = require("jsonwebtoken");
const hasRole = require("./role");

const isSameUser = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.identifier === req.params.identifier)
        return next();
    else {
        return hasRole('HEAD_QUARTER_ROLE')(req, res, next);
    }
}

module.exports = isSameUser;