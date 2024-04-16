const express = require("express");
const router = express();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const {
  tagsTimeRestriction,
  postTimeRestriction,
} = require("../middlewares/restrictMiddleware");
const {
  createPost,
  viewPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { postValidator } = require("../helpers/validator");

router
  .get("/", isAuthenticated, viewPost)
  .post("/", postValidator, isAuthenticated, postTimeRestriction, createPost)
  .patch("/:id", isAuthenticated, tagsTimeRestriction, updatePost)
  .delete("/:id", isAuthenticated, deletePost);

module.exports = router;
