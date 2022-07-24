const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/training.controller');
const verifyToken = require("../middlewares/auth");
const hasRole = require("../middlewares/role");

router.get('/', verifyToken, trainingController.getTrainings);
router.get('/maxPages', verifyToken, trainingController.getMaxPages);
router.get('/:_id', verifyToken, trainingController.getTraining);
router.post('/', verifyToken, hasRole('TRAINER_ROLE') || hasRole('HEAD_QUARTER_ROLE'), trainingController.createTraining);
router.patch('/:_id', verifyToken, hasRole('TRAINER_ROLE') || hasRole('HEAD_QUARTER_ROLE'), trainingController.updateTraining);
router.delete('/:_id', verifyToken, hasRole('TRAINER_ROLE') || hasRole('HEAD_QUARTER_ROLE'), trainingController.deleteTraining);

module.exports = router;
