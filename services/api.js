const axios = require("axios");
const variables = require("../bin/configuration/variables");

var url = `https://confere-project.herokuapp.com`;

const api = axios.create({
	baseURL: url
});

module.exports = api;
