const express = require("express");
const router = express.Router();
const { query, check, param } = require("express-validator");
const controller = require("../controllers/transactions.controller");

const _ctrl = new controller();

router.get(
	"/",
	[
		query("_id", "id is not valid")
			.optional()
			.isMongoId(),
		query("value", "value is a number")
			.optional()
			.isNumeric(),
		query("card.cvv", "Card cvv is a number")
			.optional()
			.isNumeric(),
		query("createdAt", "createdAt is a date")
			.optional()
			.isISO8601()
	],
	_ctrl.getAll
);

router.post(
	"/",
	[
		check("value", "value is a number").isNumeric(),
		check("description", "description is required")
			.not()
			.isEmpty(),
		check("type", "type is required")
			.not()
			.isEmpty(),
		check("installments").custom((value) => {
			if ((value < 0) ^ (value > 12))
				return Promise.reject(
					"number of parcels must be greater than 0 and less than 13"
				);
			else return Promise.resolve();
		}),
		check("card.number", "Card number is required")
			.not()
			.isEmpty(),
		check("card.number", "Card number has 16 digits").isLength({
			min: 16,
			max: 16
		}),
		check("card.expiry", "Card expiry is required")
			.not()
			.isEmpty(),
		check("card.expiry", "Card expiry is a date").isISO8601(),
		check("createdAt", "createdAt is a date")
			.optional()
			.isISO8601(),
		check("card.cvv", "Card cvv has 3 digits").isLength({
			min: 3,
			max: 3
		}),
		check("card.cvv", "Card cvv is a number").isNumeric(),
		check("card.holder", "Card holder is required")
			.not()
			.isEmpty()
	],
	_ctrl.post
);

router.delete(
	"/:id",
	[
		param("_id", "id is not valid")
			.optional()
			.isMongoId()
	],
	_ctrl.delete
);

module.exports = router;
