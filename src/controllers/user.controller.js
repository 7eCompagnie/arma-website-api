const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const data = await User.getAllUsers(res);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.getUser = async (req, res) => {
    try {
        const data = await User.getUser(req.params.identifier, res);

        if (!data) {
            res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        } else {
            res.status(200).json({
                success: true,
                data: data
            });
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}
