const express = require('express');
const router = express.Router();
const operationController = require('../controllers/operation.controller');
const verifyToken = require("../middlewares/auth");
const hasRole = require("../middlewares/role");

router.get('/', verifyToken, operationController.getOperations);
router.get('/maxPages', verifyToken, operationController.getMaxPages);
router.get('/:_id', verifyToken, operationController.getOperation);
router.post('/', verifyToken, hasRole(['ZEUS_ROLE', 'HEAD_QUARTER_ROLE']), operationController.createOperation);
router.patch('/:_id', verifyToken, hasRole(['ZEUS_ROLE', 'HEAD_QUARTER_ROLE']), operationController.updateOperation);
router.delete('/:_id', verifyToken, hasRole(['ZEUS_ROLE', 'HEAD_QUARTER_ROLE']), operationController.deleteOperation);

module.exports = router;