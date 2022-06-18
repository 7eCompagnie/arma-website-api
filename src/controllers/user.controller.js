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
