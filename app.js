const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
const farmers = require("./routes/farmers");
app.use("/api/v1/farmers", farmers);

//errorHandler
const { errorHandler } = require("./middlewares/error");
app.use(errorHandler);

module.exports = app;

