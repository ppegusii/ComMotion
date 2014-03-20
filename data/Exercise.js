var sqlite3 = require('sqlite3');

var exerciseModel = require(process.env.MODELS_EXERCISE);

var dbPath = process.env.DB_COMMOTION;

exports.getExercises = function(n,cb){
	var db = new sqlite3.Database(dbPath);
	db.all('SELECT * FROM exercises LIMIT $n',{$n:n},function(err,rows){
		cb(err,rowsToExercises(rows));
	});
	db.close();
};

function rowsToExercises(rows){
	return rows.map(function(row,index,rows){
		return new exerciseModel.Exercise(row.id.toString(),row.name);
	});
}
