const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }

  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const userCreated = await User.create({
    name,
    email,
    password,
  });

  if (userCreated) {
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: userCreated,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }

  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist && (await userExist.matchPassword(password))) {
    res.json({
      success: true,
      message: "Logged In Successfully!",
      data: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        token: generateToken(userExist._id, userExist.role),
        validTill: `30 Days`,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Username or Password.");
  }
});

module.exports = { registerUser, loginUser };
