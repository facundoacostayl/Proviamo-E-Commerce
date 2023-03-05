const express = require('express');
const router = express.Router();
const {getItems, addItems, updateItems} = require('../controllers/orders');

router.get('/', getItems);
router.post('/', addItems);
router.get('/feedback', updateItems);

module.exports = router;