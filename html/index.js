var mainJs = require("../main.js");
var server = require("../server.js");
var orm = require("../ormISH.js");

/* Fucking promises! They are such a pain in the ass! I could have written this so much easier if JS was synchronous! */
function main(){
	var prom = new Promise(function(resolve, reject){
		var burgers = {};
		orm.getFromTable("burgers", "eaten", false).then(function(data){
			burgers.toEat = data;
		}).then(function(data){
			orm.getFromTable("burgers", "eaten", true).then(function(data2){
				burgers.haveEaten = data2;
				resolve(burgers);
			});
		});
	});
	return prom;
}
module.exports.main = main;