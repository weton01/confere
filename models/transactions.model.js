"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionModel = new schema({
	value: { type: Number, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	installments: { type: Number },
	card: { type: Object, required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transactions", transactionModel);
