const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Post = require("../models/postModel");

const createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }

  const { title, content, tags } = req.body;

  const postCreated = await Post.create({
    title,
    content,
    tags,
    createdBy: req.user._id,
  });

  if (postCreated) {
    return res.status(200).json({
      success: true,
      message: "Post Created Successfully!",
      data: postCreated,
    });
  }
});

const viewPost = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const postPerPage = 5;

  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * postPerPage)
    .limit(postPerPage);

  if (posts) {
    return res.status(200).json({
      success: true,
      message: "Post Fetched Successfully",
      data: posts,
    });
  }
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

module.exports = { createPost, viewPost, updatePost };
