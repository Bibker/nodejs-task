const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const adminSeeder = require("../adminSeeder");

const connectDB = asyncHandler(async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  adminSeeder();
});

module.exports = connectDB;
