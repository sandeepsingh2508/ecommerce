const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const EUser = require("../models/user");

//register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { firstName,lastName, email, password } = req.body;
  const user = await EUser.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendToken(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//login user
exports.loginUser = catchAsyncError(async(req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given email or password
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 401));
  }

  const user = await EUser.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//Update password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  console.log("==========", req.user);
  try {
    const user = await EUser.findById(req.user.id).select('+password');
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandler('Old password is incorrect', 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler(`Passwords do not match`));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    return next(error);
  }
});

//Logout
exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//User Details
exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
  console.log("========",req.user)
  const user =await EUser.findById(req.user.id);
  res.status(200).json({
    success:true,
    user
  })
})





