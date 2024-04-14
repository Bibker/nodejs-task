const express = require("express");
const dotenv= require("dotenv");

const app= express();
dotenv.config();
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("API is RUNNING....")
})

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`App Started at Port ${PORT}`));
