const express = require('express');

const router = express.Router();

const { login_member, authen_member } = require('../../controllers/Member/LoginController');

router.post('/', login_member);
router.get('/authen', authen_member);

module.exports = router;