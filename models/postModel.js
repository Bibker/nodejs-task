const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
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

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
