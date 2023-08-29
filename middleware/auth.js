const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticationUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECREAT);
  req.user = await User.findById(decodeData.id);
  next();
});


