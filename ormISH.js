const main = require("./main.js");

function getFromTable(table, condition1, condition2){
	var prom = new Promise(function(resolve, reject){
		main.connection.query("select * from ?? where ?? = ?", [table, condition1, condition2], function(err, res){
			//console.log("success! " + JSON.stringify(res) );
			resolve(res);
		});
	});
	return prom;
}
module.exports.getFromTable = getFromTable;

function changeInTable(table, properties, condition1, condition2){
	var propertiesQuery = "";
	for(let i = 0; i < properties.length; i+=2 ){
		if(i+2 <= properties.length){
			propertiesQuery += "?? = ?";
		}
		if(i != properties.length-2){
			propertiesQuery += ", ";
		}else{
			propertiesQuery += " ";
		}
	}
	properties.unshift(table);
	properties.push(condition1);
	properties.push(condition2);
	// console.log(propertiesQuery);
	// console.log(properties);
	main.connection.query("update ?? set " + propertiesQuery + " where ?? = ?", properties, function(err, res){
		// console.log("success! " + res);
	});
}
module.exports.changeInTable = changeInTable;

function insertIntoTable(table, properties, data){
	var propertiesQuery = "(";
	for(let i = 0; i < properties.length; i++ ){
		if(i+1 <= properties.length){
			propertiesQuery += "??";
		}
		if(i != properties.length-1){
			propertiesQuery += ", ";
		}else{
			propertiesQuery += " ";
		}
	}
	propertiesQuery += ")";
	
	dataQuery = "";
	for(let i = 0; i < data.length; i+=properties.length){
		for(let k in properties){
			if(k == 0){
				dataQuery += "(";
			}
			dataQuery += "?";
			if(k != properties.length-1){
				dataQuery += ", ";
			}else{
				dataQuery += ")";
			}
		}
		if(i+properties.length < data.length){
			dataQuery += ", ";
		}
	}
	
	var finalArray = properties.concat(data);
	finalArray.unshift(table);
	
	// console.log("prop " + properties);
	// console.log("data " + data);
	// console.log("fin! " + finalArray);
	// console.log("insert into ?? " + propertiesQuery + " values " + dataQuery);
	main.connection.query("insert into ?? " + propertiesQuery + " values " + dataQuery, finalArray, function(err, res){
		// console.log("success! " + res);
	});
}
module.exports.insertIntoTable = insertIntoTable;

function deleteFromTable(table, condition1, condition2){
	main.connection.query("delete from ?? where ?? = ?", [table, condition1, condition2], function(err, res){
		// console.log("success! " + res);
	});
}
module.exports.deleteFromTable = deleteFromTable;