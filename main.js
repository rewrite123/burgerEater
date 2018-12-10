/* This is my version of express. Sorry */
var server = require("./server.js");
const mysql = require("mysql");

const orm = require("./ormISH.js");

server.startServer();

var connection = mysql.createConnection({
	database: (process.argv[5] || "burger_eater_db"),
	host: (process.argv[4] || "localhost"),
	user: (process.argv[3] || "root"),
	password: (process.argv[2] || "12345")
});

connection.connect(function(err){
	if(err){
		process.stderr.write("Sorry, but there seems to be a bit of heresy in the air, causing your machine spirit to fail to connect.\n");
		process.stderr.write(err);
		throw err;
	}
	console.log("Connected to sql as: " + connection.threadId);
});
module.exports.connection = connection;