const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  getUserDetails,
  updatePassword,
} = require("../controller/user");
const { isAuthenticationUser } = require("../middleware/auth");
const { registerValidate, loginValidate } = require("../validator/auth");
const router = express.Router();

router.route("/register").post(registerValidate, registerUser);

router.route("/login").post(loginValidate, loginUser);

router.route("/logOut").get(logOut);

router.route("/password/update").put(isAuthenticationUser, updatePassword);

router.route("/me").get(isAuthenticationUser, getUserDetails);

module.exports = router;
