const express = require("express");
const router = express();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const {
  tagsTimeRestriction,
  restrictTo,
} = require("../middlewares/restrictMiddleware");
const {
  viewRoles,
  updateRoles,
  viewRolesById,
  updatePost,
  deletePost,
} = require("../controllers/adminController");
// const { postValidator } = require("../helpers/validator");

router
  .get("/roles", isAuthenticated, restrictTo("admin"), viewRoles)
  .get("/roles/:id", isAuthenticated, restrictTo("admin"), viewRolesById)
  .patch("/roles/:id", isAuthenticated, restrictTo("admin"), updateRoles)
  .patch("/post/:id", isAuthenticated, restrictTo("admin"), updatePost)
  .delete("/post/:id", isAuthenticated, restrictTo("admin"), deletePost);

module.exports = router;
