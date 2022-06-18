const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.get('/:identifier', userController.getUser);
router.post('/', userController.createUser);

module.exports = router;
