var exercise = require('../data/Exercise.js');
var models = require('../models/index.js');
var data = require(process.env.DATA);

exports.encyclopedia_exercise_entry = function(req, res) {
	userId = req.session.user.id;
     var data = getExerciseEntry('Get exercise id');
     res.render('encyclopedia/exerciseentry', {userId: userId, data});
}

exports.encyclopedia_workout_entry = function(req, res) {
     var data = getWorkoutEntry('Get workout id');
     res.render('encyclopedia/workoutentry', data);
}
