const Transactions = require("../models/transactions.model");
const api = require("../services/api");

function transactionsRepository() {}

transactionsRepository.prototype.getAll = async (req, res) => {
	try {
		let response = await Transactions.find(req.query);

		return res.status(200).send(response);
	} catch (err) {
		return res.status(200).send(err);
	}
};

transactionsRepository.prototype.post = async (req, res) => {
	try {
		let transaction = new Transactions(req.body);
		let response = await transaction.save();
		let createFinancials = await api.post(`/api/financials/${response._id}`);

		let fullResponse = {
			transaction: response,
			financials: createFinancials.data
		};

		return res.status(201).send(fullResponse);
	} catch (err) {
		return res.status(400).send(err);
	}
};

transactionsRepository.prototype.delete = async (req, res) => {
	try {
		await Transactions.findOneAndDelete({ _id: req.params.id });

		return res.status(200).send("Success!");
	} catch (err) {
		return res.status(400).send(err);
	}
};

module.exports = transactionsRepository;
