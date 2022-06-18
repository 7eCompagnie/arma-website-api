const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.get('/:identifier', userController.getUser);
router.get('/token/:token', userController.getUserByToken);
router.post('/', userController.createUser);
router.patch('/:identifier', userController.updateUser);
router.delete('/:identifier', userController.deleteUser);

module.exports = router;
