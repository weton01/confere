const financialsRepository = require("../repositories/financials.repository");
const Transactions = require("../models/transactions.model");
const Finacials = require("../models/financials.model");
const { validationResult } = require("express-validator");

function financialsController() {}

const _repo = new financialsRepository();

financialsController.prototype.getAll = async (req, res) => {
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	_repo.getAll(req, res);
};

financialsController.prototype.getFinancials = async (req, res) => {
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	_repo.getFinancials(req, res);
};

financialsController.prototype.post = async (req, res) => {
	let errors = validationResult(req);
	let arr_financial = [];

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		let transaction = await Transactions.findOne({ _id: req.params.id });

		let debit = transaction.value - transaction.value * 0.028;
		let credit = transaction.value - transaction.value * 0.032;

		let financial = {
			value: debit,
			status: "received",
			received_date: new Date(transaction.createdAt)
		};

		if (transaction.type === "credit") {
			var date = new Date(transaction.createdAt);
			date.setDate(date.getDate() + 30);

			financial = {
				value: credit,
				status: "expected",
				received_date: date
			};

			arr_financial.push(financial);

			return await _repo.post(req, res, arr_financial);
		}

		if (transaction.type === "installment_credit") {
			for (
				let installment = 1;
				installment < transaction.installments + 1;
				installment++
			) {
				var date = new Date(transaction.createdAt);
				date.setDate(date.getDate() + 30 * installment);

				if (transaction.installments > 1 && transaction.installments < 7) {
					let installment_credit =
						(transaction.value - transaction.value * 0.038) /
						transaction.installments;
					financial = {
						value: installment_credit,
						status: "expected",
						received_date: date
					};
				} else {
					let installment_credit =
						(transaction.value - transaction.value * 0.042) /
						transaction.installments;
					financial = {
						value: installment_credit,
						status: "expected",
						received_date: date
					};
				}
				arr_financial.push(financial);
			}

			return await _repo.post(req, res, arr_financial);
		}

		arr_financial.push(financial);
		return _repo.post(req, res, arr_financial);
	} catch (err) {
		return res.status(400).send(err);
	}
};

financialsController.prototype.delete = async (req, res) => {
	let errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		let response = await Finacials.findOne({ _id: req.params.id });
		if (!response)
			return res.status(404).json({
				errors: [
					{
						value: "",
						msg: "The financial not found",
						param: "id",
						location: "params"
					}
				]
			});
	} catch (err) {
		return res.status(400).send(err);
	}

	_repo.delete(req, res);
};

module.exports = financialsController;
