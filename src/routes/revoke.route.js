const express = require('express');
const router = express.Router();
const revokeController = require('../controllers/revoke.controller');

router.post('/', revokeController.revoke);

module.exports = router;
