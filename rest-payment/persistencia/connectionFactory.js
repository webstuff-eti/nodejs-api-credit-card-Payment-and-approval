var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '!@WeB12890',
			database: 'payfast'
		});
}

module.exports = function() {
	return createDBConnection;
}
