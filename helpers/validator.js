const { check } = require("express-validator");

exports.registerValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is required").not().isEmpty(),
];

exports.loginValidator = [
  check("email", "Please enter a valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is required").not().isEmpty(),
];

exports.postValidator = [
  check("title", "Please enter post title").not(),
  check("content", "Please providee post content").not().isEmpty(),
  check("tags", "Please providee post tags").not().isEmpty(),
];
