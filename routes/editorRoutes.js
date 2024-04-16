const express = require("express");
const router = express();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { restrictTo } = require("../middlewares/restrictMiddleware");
const { updatePost } = require("../controllers/adminController");
// const { postValidator } = require("../helpers/validator");

router.patch("/post/:id", isAuthenticated, restrictTo("editor"), updatePost);

module.exports = router;
