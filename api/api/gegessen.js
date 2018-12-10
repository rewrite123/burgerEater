const server = require("../.././server.js");
const orm = require("../.././ormISH.js");

function main(req, res){
	res.setHeader('Content-Type', 'application/json');
	orm.getFromTable("burgers", "eaten", true).then(function(result){
		res.end( JSON.stringify(result) );
	});
}
module.exports.main = main;