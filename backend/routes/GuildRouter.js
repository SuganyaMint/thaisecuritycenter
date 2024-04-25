const express = require('express');
const router = express.Router();

const { getGuild } = require('../controllers/guildController');

router.get('/', getGuild);

module.exports = router;