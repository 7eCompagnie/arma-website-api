const Operation = require('../models/operation.model');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const {ObjectID} = require("mongodb");
const slugify = require('slugify');

exports.getOperations = async (req, res) => {
    try {
        const data = await Operation.getOperations(req.query.page, res);

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
        const data = await Operation.getMaxPages(res);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.getOperation = async (req, res) => {
    try {
        let data;

        if (ObjectID.isValid(req.params._id))
            data = await Operation.getOperation(req.params._id, res);
        else
            data = await Operation.getOperationBySlug(req.params._id, res);

        if (!data) {
            res.status(404).json({
                success: false,
                message: 'Operation not found.'
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

exports.createOperation = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
        if (!req.body.title || !req.body.description || !req.files || !req.body.date || !req.body.duration|| !req.body.connectionStartTime || !req.body.roles) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields.'
            });
        } else {
            const newpath = __dirname + '/../../public/operations';
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

            const data = await Operation.createOperation({
                title: req.body.title,
                slug: slugify(req.body.title).toLowerCase(),
                description: req.body.description,
                picture: `${filename}.${ext}`,
                date: req.body.date,
                duration: req.body.duration,
                connectionStartTime: req.body.connectionStartTime,
                roles: JSON.parse(req.body.roles)
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

exports.updateOperation = async (req, res) => {
    try {
        const data = await Operation.updateOperation(req.params._id, req.body, res);

        if (!data) {
            res.status(404).json({
                success: false,
                message: 'Operation not found.'
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

exports.deleteOperation = async (req, res) => {
    try {
        const oldOperation = await Operation.getOperation(req.params._id, res);
        const data = await Operation.deleteOperation(req.params._id, res);

        if (data.deletedCount === 0) {
            res.status(404).json({
                success: false,
                message: 'Operation not found.'
            });
        } else {
            if (!oldOperation.picture.startsWith("http")) {
                const path = __dirname + '/../../public/operations';

                fs.unlink(`${path}/${oldOperation.picture}`, (err) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }
                });
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
