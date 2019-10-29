"use strict";

// Basic imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Variables
const variables = require("./configuration/variables");

// Import Routes
const transactionRoute = require("../routes/transactions.route");
const financialsRoute = require("../routes/financials.route");

// Create App
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to mongoDB
mongoose
	.connect(variables.Database.connection, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then()
	.catch((err) => {
		console.log(err);
	});
mongoose.set("useFindAndModify", false);

// Routes
app.use("/api/transaction", transactionRoute);
app.use("/api/financials", financialsRoute);

module.exports = app;
