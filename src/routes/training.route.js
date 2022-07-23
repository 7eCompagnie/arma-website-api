const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training.controller');
const verifyToken = require("../middlewares/auth");

router.get('/', verifyToken, trainingController.getTrainings);
router.get('/maxPages', verifyToken, trainingController.getMaxPages);
router.get('/:_id', verifyToken, trainingController.getTraining);
router.post('/', verifyToken, trainingController.createTraining);
router.patch('/:_id', verifyToken, trainingController.updateTraining);
router.delete('/:_id', verifyToken, trainingController.deleteTraining);

module.exports = router;
