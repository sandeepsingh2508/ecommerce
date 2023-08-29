const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controller/order");
const { isAuthenticationUser} = require("../middleware/auth");
const { createValidate } = require("../validator/order");
const router = express.Router();

router.route("/order/new").post(isAuthenticationUser,createValidate, newOrder);
router.route("/order/:id").get(isAuthenticationUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticationUser, myOrders);

module.exports = router;
