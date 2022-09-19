const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync= require("../utils/catchAsync");

//const path = require('path');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  //console.log(users);
  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users,
    }, 
  });
});

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;
  
  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
  
exports.getUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  //console.log(req.params);
  if(foundUser){
    res.status(200).json({
      status: "success",
      data: {
        user: foundUser,
      },
    });
  } else{
      res.status(404).json({
        status: "not found",
      });
  }
});
exports.updateUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user){
    user.userName = req.body.userName;
    user.password = req.body.password;
    user.email = req.body.email;
    res.status(200).json({
      status: "success",
      data: {
         user: user,
      }
    });
  }else{
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteUserById = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  //console.log(product);
  if(user){
    res.status(200).json({
      user: user,
      status: "Usuario borrado correctamente",  
    });
  }else{
    res.status(404).json({
      status: "no existe el usuario",
    });
  }
});
