const express = require("express");
const router = express.Router();

// import controller function
const { postPlaceOrder,getOrderbook,getRecentTrades } = require("../controller/order");

// define route
router.post("/order", postPlaceOrder);
router.get("/depth", getOrderbook);
router.get("/trades",getRecentTrades)


module.exports = router;
