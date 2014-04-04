var data = require(process.env.DATA);

exports.query = query;

var queries = Array();
queries['getExercisesLimitN'] = data.getExercisesLimitN;

function query(req,res){
	if(queries[req.body.query]===undefined){
		res.send('invalid query');
		return;
	}
  queries[req.body.query](req.body,function(err,exercises){
		if(err){
			res.send(err.msg);
		}
		else{
			res.contentType('application/json');
			res.send(exercises);
		}
	});
}
