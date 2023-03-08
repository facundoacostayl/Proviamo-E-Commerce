const express = require("express");
const router = express.Router();
const { getItems, addItems, updateItems } = require("../controllers/orders");
const { validShippingInfo } = require("../middleware/shippingDataValidation");

router.get("/", getItems);
router.post("/", validShippingInfo, addItems);
router.get("/feedback", updateItems);

module.exports = router;
