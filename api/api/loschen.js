const server = require("../.././server.js");
const orm = require("../.././ormISH.js");

/* Just returns the user based on the id recieved. */
function main(req, res){
	server.extractJSONFromRequest(req).then(function(data){
		res.setHeader('Content-Type', 'application/json');
		orm.changeInTable("burgers", ["eaten", true], "id", data.id);
		res.end(data.id);
	}).catch(function(err){
		/* This always triggers for some reason. Still working on finding out why. */
		/* TypeError: First argument must be a string or Buffer */
		res.end();
	});
}
module.exports.main = main;