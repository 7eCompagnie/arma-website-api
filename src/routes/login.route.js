const express = require('express');
const router = express.Router();
const revokeController = require('../controllers/login.controller');

router.post('/', revokeController.login);

module.exports = router;
