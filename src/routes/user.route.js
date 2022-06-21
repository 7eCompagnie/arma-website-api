const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require("../middlewares/auth");

router.get('/', verifyToken, userController.getAllUsers);
router.get('/maxPages', verifyToken, userController.getMaxPages);
router.get('/:identifier', verifyToken, userController.getUser);
router.get('/token/:token', verifyToken, userController.getUserByToken);
router.post('/', verifyToken, userController.createUser);
router.patch('/:identifier', verifyToken, userController.updateUser);
router.delete('/:identifier', verifyToken, userController.deleteUser);

module.exports = router;
