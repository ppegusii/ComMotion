var data = require(process.env.DATA);

exports.query = query;

var queries = Array();
queries['exercisesGetLimitN'] = data.exercisesGetLimitN;
queries['exerciseInit'] = data.exerciseInit;

function query(req,res){
//console.log('body = '+JSON.stringify(req.body));
	if(queries[req.body.query]===undefined){
		res.send('invalid query');
		return;
	}
  queries[req.body.query](req.body,function(err,results){
		if(err){
//console.log('error = '+JSON.stringify(err));
			res.send(err);
		}
		else{
//console.log('results = '+JSON.stringify(results));
			res.contentType('application/json');
			res.send(results);
		}
	});
}
