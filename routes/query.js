var data = require(process.env.DATA);

exports.query = query;

var queries = Array();
queries['exercisesGetLimitN'] = data.exercisesGetLimitN;
queries['exerciseInit'] = data.exerciseInit;

function query(req,res){
	if(queries[req.body.query]===undefined){
		res.send('invalid query');
		return;
	}
//console.log('body = '+JSON.stringify(req.body));
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
