const express = require("express");
const router = express();

const { registerUser, loginUser } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../helpers/validator");

router
  .post("/register", registerValidator, registerUser)
  .post("/login", loginValidator, loginUser);

module.exports = router;
