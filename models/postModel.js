const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const postSchema = mongoose.Schema(
  {
    postId: { type: Number, unique: true },
    title: { type: "String", required: true, trim: true },
    content: { type: "String", required: true, trim: true },
    tags: { type: ["String"], required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
postSchema.pre("save", async function (next) {
  const post = this;
  if (!post.isNew) {
    return next();
  }
  try {
    const lastPost = await Post.findOne({}, {}, { sort: { postId: -1 } });
    if (lastPost) {
      post.postId = lastPost.postId + 1;
    } else {
      post.postId = 1000;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
