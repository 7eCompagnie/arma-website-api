const express = require('express');
const router = express.Router();
const operationController = require('../controllers/operation.controller');
const verifyToken = require("../middlewares/auth");

router.get('/', verifyToken, operationController.getOperations);
router.get('/maxPages', verifyToken, operationController.getMaxPages);
router.get('/:_id', verifyToken, operationController.getOperation);
router.post('/', verifyToken, operationController.createOperation);
router.patch('/:_id', verifyToken, operationController.updateOperation);
router.delete('/:_id', verifyToken, operationController.deleteOperation);

module.exports = router;