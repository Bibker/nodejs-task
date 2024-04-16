const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const adminRoute = require("./routes/adminRoute");
const editorRoute = require("./routes/adminRoute");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.get("/", (req, res) => {
  res.send("API is RUNNING....");
});
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/admin", adminRoute);
app.use("/editor", editorRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App Started at Port ${PORT}`));
