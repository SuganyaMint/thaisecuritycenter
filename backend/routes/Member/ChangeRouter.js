const express = require('express');
const router = express.Router();

const { ChangePass } = require('../../controllers/Member/ChangeController');

router.post('/changepass', ChangePass);

module.exports = router;