"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const financialsModel = new schema({
	value: { type: Number, required: true },
	status: { type: String, required: true },
	received_date: { type: Date, required: true }
});

module.exports = mongoose.model("Financials", financialsModel);
