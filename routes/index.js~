var exerciseData = require(process.env.DATA_EXERCISE);

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ComMotion' });
};

exports.encyclopedia = function(req,res){
  res.render('encyclopedia', { title: 'Encyclopedia' });
};

exports.getExercises = function(req,res){
	var n = parseInt(req.body.n);
	if(n <= 0){
		res.send('invalid limit');
		return;
	}
	exerciseData.getExercises(n,function(err,exercises){
		if(err){
			res.send(err.msg);
		}
		else{
			res.contentType('application/json');
			res.send(exercises);
		}
	});
};
