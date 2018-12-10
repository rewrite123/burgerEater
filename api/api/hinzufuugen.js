const server = require("../.././server.js");
const orm = require("../.././ormISH.js");

/* Just returns the user based on the id recieved. */
function main(req, res){
	server.extractJSONFromRequest(req).then(function(data){
		res.setHeader('Content-Type', 'application/json');
		var toAdd = [];
		if(data.constructor == Array){
			for(i in data){
				toAdd.push(data[i].name);
				toAdd.push(false);
			}
		}else{
			toAdd = [data.name, false];
		}
		orm.insertIntoTable("burgers", ["name", "eaten"], toAdd);
		res.end(data.id);
	});
}
module.exports.main = main;