const express = require("express");
const router = express.Router();

// import controller function
const { postPlaceOrder,getOrderbook } = require("../controller/order");

// define route
router.post("/order", postPlaceOrder);
router.get("/depth", getOrderbook);


module.exports = router;
