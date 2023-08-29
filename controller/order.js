const userOrder = require("../models/order");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const order = await userOrder.create(
    {
    user: req.user._id,
    ...req.body
    }
  );
  res.status(200).json({
    success: true,
    order,
  });
});
//get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await userOrder.findById(req.params.id).populate(
    "user",
    "firstName lastName email",
  );
  if (!order) {
    return next(new ErrorHandler(`Order does not found with this id`, 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});
//get order by userId oeders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await userOrder.find({ user: req.user._id });
  
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.paymentInfo.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount:totalAmount
  });
});



