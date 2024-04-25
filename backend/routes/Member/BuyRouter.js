const express = require('express');
const router = express.Router();

const { buyItemLevel, buyHotItem, buyWeekItem, buyMonthItem } = require('../../controllers/Member/BuyController');

router.post('/buyItemLevel', buyItemLevel);
router.post('/buyHotItem', buyHotItem);
router.post('/buyWeekItem', buyWeekItem);
router.post('/buyMonthItem', buyMonthItem);


module.exports = router;