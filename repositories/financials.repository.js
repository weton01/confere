const Financials = require("../models/financials.model");

function financialsRepository() {}

financialsRepository.prototype.getAll = async (req, res) => {
	try {
		let response = await Financials.find(req.query);

		res.status(200).send(response);
	} catch (err) {
		return res.status(400).send(err);
	}
};

financialsRepository.prototype.getFinancials = async (req, res) => {
	try {
		let response = await Financials.aggregate([
			{
				$match: {
					$and: [
						{
							received_date: {
								$gte: new Date(req.query.firstDate)
							}
						},
						{
							received_date: {
								$lte: new Date(req.query.lastDate)
							}
						},
						{
							value: {
								$gte: parseFloat(req.query.minValue)
							}
						},
						{
							value: {
								$lte: parseFloat(req.query.maxValue)
							}
						}
					]
				}
			},
			{
				$group: {
					_id: {
						status: "$status"
					},
					total: { $sum: "$value" }
				}
			}
		]);

		res.status(200).send(response);
	} catch (err) {
		return res.status(400).send(err);
	}
};

financialsRepository.prototype.post = async (req, res, financial) => {
	try {
		let response = await Financials.insertMany(financial);

		return res.status(201).send(response);
	} catch (err) {
		return res.status(400).send(err);
	}
};

financialsRepository.prototype.delete = async (req, res) => {
	try {
		await Financials.findByIdAndDelete(req.params.id);

		res.status(200).send("Success!");
	} catch (err) {
		return res.status(400).send(err);
	}
};

module.exports = financialsRepository;
