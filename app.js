const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());


//routes
const farmers = require("./routes/farmers");
app.use("/api/v1/farmers", farmers);

//errorHandler
const { errorHandler } = require("./middlewares/error");
app.use(errorHandler);

module.exports = app;

