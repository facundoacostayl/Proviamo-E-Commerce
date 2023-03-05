const express = require('express');
const router = express.Router();
const {getItems, addItems} = require('../controllers/products');

router.get("/", getItems);
router.post("/", addItems);

module.exports = router;
