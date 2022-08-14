const express = require('express');
const router = express.Router();

const { getAuth, login } = require('../controller/auth');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getAuth);
router.route('/').post(login);

module.exports = router;
