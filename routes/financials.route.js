const express = require("express");
const router = express.Router();
const { param, query } = require("express-validator");

const controller = require("../controllers/financials.controller");

const _ctrl = new controller();

router.get(
	"/",
	[
		query("_id", "id is not valid")
			.optional()
			.isMongoId(),
		query("received_date", "received_date is date")
			.optional()
			.isISO8601()
	],
	_ctrl.getAll
);

router.get(
	"/total",
	[
		query("_id", "id is not valid")
			.optional()
			.isMongoId(),
		query("received_date", "received_date is date")
			.optional()
			.isISO8601()
	],
	_ctrl.getFinancials
);

router.post("/:id", [param("id", "id is not valid").isMongoId()], _ctrl.post);

router.delete(
	"/:id",
	[
		param("id", "id is not valid")
			.optional()
			.isMongoId()
	],
	_ctrl.delete
);

module.exports = router;
