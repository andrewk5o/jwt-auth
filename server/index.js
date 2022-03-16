require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000;
const app = express();
const router = require("./router/index.js");
const errorMiddleware = require("./middlewares/error-middleware");
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);

const start = () => {
    try {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(5000, () => console.log(`Server started at ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();