const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require("../middlewares/auth");
const hasRole = require("../middlewares/role");
const isSameUser = require("../middlewares/user");

router.get('/', verifyToken, userController.getUsers);
router.get('/maxPages', verifyToken, userController.getMaxPages);
router.get('/:identifier', verifyToken, userController.getUser);
router.get('/token/:token', verifyToken, userController.getUserByToken);
router.post('/', verifyToken, userController.createUser);
// TODO: add middleware to check if user is admin or if user is the same as the one to update
router.patch('/:identifier', verifyToken, isSameUser, userController.updateUser);
router.delete('/:identifier', verifyToken, hasRole('HEAD_QUARTER_ROLE'), userController.deleteUser);

module.exports = router;
