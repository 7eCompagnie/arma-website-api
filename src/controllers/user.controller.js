const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

exports.getUsers = async (req, res) => {
    try {
        const data = await User.getUsers(req.query.page, res);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.getMaxPages = async (req, res) => {
    try {
        const data = await User.getMaxPages(res);

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
        if (!req.body.identifier || !req.body.username || !req.body.discriminator || !req.body.avatar) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields.'
            });
        } else {
            let toSend = req.body;

            if (req.body.roles)
                toSend.roles = req.body.roles;
            else
                toSend.roles = ["USER_ROLE"];

            toSend.trained = [];
            const data = await User.createUser(toSend, res);

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

exports.updateUser = async (req, res) => {
    try {
        const data = await User.updateUser(req.params.identifier, req.body, res);

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

exports.deleteUser = async (req, res) => {
    try {
        const data = await User.deleteUser(req.params.identifier, res);

        if (data.deletedCount === 0) {
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

exports.getUserByToken = async (req, res) => {
    try {
        const payload = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY);
        const data = await User.getUser(payload.identifier, res);

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
