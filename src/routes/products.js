const express = require('express');
const router = express.Router();
const {getItems} = require('../controllers/products');

router.get("/", getItems);

module.exports = router;
