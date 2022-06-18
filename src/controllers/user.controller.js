const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err.message || 'Some error occurred while retrieving users.'
            });
        } else
            res.json({
                success: true,
                data: {
                    users: users
                }
            });
    });
}
