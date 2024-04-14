const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: { type: "String", required: true, trim: true },
        description: { type: "String", required: true, unique: true, trim: true },
        tags: { type: "Array", required: true },
    },
    {
        timestamps: true
    });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;