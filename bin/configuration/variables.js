const variables = {
	Api: {
		port: process.env.port || 3000
	},
	Database: {
		connection:
			process.env.connection ||
			"mongodb+srv://weton01:Dragonite1@cluster0-rtk0z.mongodb.net/test?retryWrites=true&w=majority"
	}
};

module.exports = variables;
