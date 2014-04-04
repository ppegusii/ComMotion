var data = require(process.env.DATA);

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ComMotion' });
};

exports.getExercises = function(req,res){
	var n = parseInt(req.body.n);
	if(n <= 0){
		res.send('invalid limit');
		return;
	}
	//exerciseData.getExercises(n,function(err,exercises){
	data.getExercisesN(n,function(err,exercises){
		if(err){
			res.send(err.msg);
		}
		else{
			res.contentType('application/json');
			res.send(exercises);
		}
	});
};
