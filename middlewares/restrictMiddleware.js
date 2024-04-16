const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");

const tagsTimeRestriction = asyncHandler(async (req, res, next) => {
  const { tags } = req.body;
  const postId = req.params.id;
  if (!tags) return next();
  if (!postId) {
    throw new Error("Post Not Found");
  }

  const postExist = await Post.findOne({ _id: postId });
  if (postExist) {
    const createdAt = new Date(postExist.createdAt).toLocaleString();
    const currentTime = new Date();

    // Adjusting the time to local time zone (Nepal)
    const localCreatedAt = createdAt.toLocaleString("en-US", {
      timeZone: "Asia/Kathmandu",
    });

    const localCurrentTime = currentTime.toLocaleString("en-US", {
      timeZone: "Asia/Kathmandu",
    });

    const timeDifference =
      (new Date(localCurrentTime) - new Date(localCreatedAt)) / 1000;

    if (timeDifference < process.env.ADD_POST_TAG_TIME_RESTRICTION) next();
    else throw new Error("Time Exceeded to add new tags");
  }
});

const postTimeRestriction = asyncHandler(async (req, res, next) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  if (currentHour < process.env.CREATE_POST_TIME_RESTRICTION) {
    res.status(400);
    throw new Error(
      `You cannon create a post before ${process.env.CREATE_POST_TIME_RESTRICTION}`
    );
  }
  next();
});

const restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      return next();
    } else {
      throw new Error("You are not authorized to perform this action.");
    }
  };
};

module.exports = { tagsTimeRestriction, postTimeRestriction, restrictTo };
