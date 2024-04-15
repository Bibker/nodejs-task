const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const viewRoles = asyncHandler(async (req, res) => {
  const userRoles = await User.find({}, "id role name");
  return res.status(200).json({
    success: true,
    message: "Roles Fetched Successfully!",
    data: userRoles,
  });
});

const viewRolesById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userRoles = await User.findOne({ _id: id }, "id role name");
  if (!userRoles) {
    res.status(400);
    throw new Error("User not found");
  }
  return res.status(200).json({
    success: true,
    message: "Roles Fetched Successfully!",
    data: userRoles,
  });
});

const updateRoles = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { role } = req.body;
  const updatedRoles = await User.findByIdAndUpdate(
    { _id: id },
    { role },
    {
      new: true,
    }
  ).select("id role name");
  return res.status(200).json({
    success: true,
    message: "Role Updated Successfully!",
    data: updatedRoles,
  });
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const postId = req.params.id;
  const updatedPost = await Post.findByIdAndUpdate(
    {
      _id: postId,
    },
    {
      title,
      content,
      tags,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: true,
    message: " Post Updated Successfully",
    data: updatedPost,
  });
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const deletedPost = await Post.deleteOne({ _id: postId });
  res.status(deletedPost);
  if (!deletedPost.count) {
    res.status(400);
    throw new Error("Post not found");
  }

  return res.status(200).json({
    success: true,
    message: " Post Deleted Successfully",
    data: deletedPost,
  });
});

module.exports = {
  viewRoles,
  viewRolesById,
  updateRoles,
  updatePost,
  deletePost,
};
