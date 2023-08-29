const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true
    
  },
  lastName: {
    type: String,
    required:true
    
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true,
    select: false,
  },
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//JWT TOKEN
schema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECREAT, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//compare password
schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("E-User", schema);
