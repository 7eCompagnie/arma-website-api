const Training = require('../models/training.model');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

exports.getAllTrainings = async (req, res) => {
    try {
        const data = await Training.getAllTrainings(req.query.page, res);

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
        if (!req.body.title || !req.body.description || !req.body.picture || !req.body.formers) {
            res.status(400).json({
                success: false,
                message: 'Missing required fields.'
            });
        } else {
            const data = await Training.createTraining(req.body, res);

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
        const data = await Training.deleteTraining(req.params._id, res);

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
