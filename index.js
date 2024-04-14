const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

app.get("/", (req, res) => {
  res.send("API is RUNNING....");
});
app.use("/auth", authRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App Started at Port ${PORT}`));
