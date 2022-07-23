const Training = require('../models/training.model');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

exports.getTrainings = async (req, res) => {
    try {
        const data = await Training.getTrainings(req.query.page, res);

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
        const data = await Training.getMaxPages(res);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.getTraining = async (req, res) => {
    try {
        const data = await Training.getTraining(req.params._id, res);

        if (!data) {
            res.status(404).json({
                success: false,
                message: 'Training not found.'
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

exports.createTraining = async (req, res) => {
    try {
        if (!req.body.title || !req.body.description || !req.files || !req.body.trainers || !req.body.isOpen) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields.'
            });
        } else {
            const newpath = __dirname + '/../../public/trainings';
            const file = req.files.picture;
            const filename = uuidv4();
            const re = /(?:\.([^.]+))?$/;
            const ext = re.exec(file.name)[1];

            file.mv(`${newpath}/${filename}.${ext}`, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
            });

            const data = await Training.createTraining({
                title: req.body.title,
                description: req.body.description,
                picture: `${filename}.${ext}`,
                trainers: JSON.parse(req.body.trainers),
                isOpen: req.body.isOpen === 'true'
            }, res);

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

exports.updateTraining = async (req, res) => {
    try {
        const data = await Training.updateTraining(req.params._id, req.body, res);

        if (!data) {
            res.status(404).json({
                success: false,
                message: 'Training not found.'
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

exports.deleteTraining = async (req, res) => {
    try {
        const oldTraining = await Training.getTraining(req.params._id, res);
        const data = await Training.deleteTraining(req.params._id, res);

        if (data.deletedCount === 0) {
            res.status(404).json({
                success: false,
                message: 'Training not found.'
            });
        } else {
            if (!oldTraining.picture.startsWith("http")) {
                const path = __dirname + '/../../public/trainings';
                fs.unlink(`${path}/${oldTraining.picture}`, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }
                });
            }

            const users = await User.getAllOfUsers();

            for (let i = 0; i < users.length; i++) {
                if (users[i].trained.includes(oldTraining._id.toString())) {
                    let newTrained = users[i].trained.filter(id => id !== oldTraining._id.toString());

                    await User.updateUser(users[i].identifier, {
                        trained: newTrained
                    }, res);
                }
            }

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
