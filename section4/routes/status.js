const express = require('express');

const statusController = require('../controllers/status');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/status', statusController.getStatus);

router.patch('/status', isAuth, body('status').trim().not().isEmpty(), statusController.updateStatus);

module.exports = router;
