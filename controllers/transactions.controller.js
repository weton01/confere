const Transactions = require("../models/transactions.model");
const { validationResult } = require("express-validator");
const transactionsRepository = require("../repositories/transactions.repository");

function transactionsController() {}

const _repo = new transactionsRepository();

transactionsController.prototype.getAll = async (req, res) => {
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	_repo.getAll(req, res);
};

transactionsController.prototype.post = async (req, res) => {
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	req.body.createdAt = new Date();

	if (
		(req.body.type !== "debit") ^
		(req.body.type !== "credit") ^
		(req.body.type !== "installment_credit")
	)
		return res.status(404).json({
			errors: [
				{
					value: req.body.type,
					msg: "Value passed to type is not valid",
					param: "card.expiry",
					location: "body"
				}
			]
		});

	if (req.body.type === "debit") req.body.installments = null;
	if (req.body.type === "credit") req.body.installments = 1;
	if (
		(req.body.type === "credit") ^ (req.body.type === "installment_credit") &&
		!req.body.installments
	)
		return res.status(404).json({
			errors: [
				{
					value: req.body.type,
					msg: "Number of installments in invalid for this type",
					param: "installments",
					location: "body"
				}
			]
		});

	if (req.body.type === "installment_credit" && req.body.installments <= 1)
		return res.status(404).json({
			errors: [
				{
					value: req.body.type,
					msg: "The number of parcels is greater than one",
					param: "installments",
					location: "body"
				}
			]
		});

	let auxStrCN = req.body.card.number.substring(12, 16);
	req.body.card.number = auxStrCN;

	let date = new Date(req.body.card.expiry);
	let auxStrDt1 = date
		.getFullYear()
		.toString()
		.substring(2, 4);
	let auxStrDt2 = date.getMonth();
	auxStrDt2 = auxStrDt2.length > 1 ? auxStrDt2 : "0" + auxStrDt2;
	req.body.card.expiry = `${auxStrDt2}/${auxStrDt1}`;

	_repo.post(req, res);
};

transactionsController.prototype.delete = async (req, res) => {
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		let response = await Transactions.findOne({ _id: req.params.id });

		if (!response)
			return res.status(404).json({
				errors: [
					{
						value: "",
						msg: "The transaction not found",
						param: "id",
						location: "params"
					}
				]
			});
	} catch (err) {
		return res.status(404).json({
			msg: error
		});
	}

	_repo.delete(req, res);
};

module.exports = transactionsController;
