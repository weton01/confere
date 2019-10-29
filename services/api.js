const axios = require("axios");
const variables = require("../bin/configuration/variables");

var url = `http://localhost:${variables.Api.port}`;

const api = axios.create({
	baseURL: url
});

module.exports = api;
