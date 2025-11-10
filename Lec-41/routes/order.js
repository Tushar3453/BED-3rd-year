const express = require("express");
const router = express.Router();

// import controller function
const { postPlaceOrder } = require("../controller/order");

// define route
router.post("/", postPlaceOrder);

module.exports = router;
