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

exports.createUser = async (req, res) => {
    try {
        if (!req.body.identifier || !req.body.email || !req.body.username || !req.body.discriminator || !req.body.avatar) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields.'
            });
        } else {
            const data = await User.createUser(req.body, res);

            res.status(201).json({
                success: true,
                data: data
            });
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}
