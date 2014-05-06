var exercise = require('../data/Exercise.js');
var models = require('../models/index.js');
var data = require(process.env.DATA);

exports.encyclopedia_results = function(req, res){

    data.searchForExercisesAndWorkoutsByNameDescriptionFilterByDifficultyId({search:req.query.query}, function(err, exercises) {
        if(err) {
            console.log(err.message);
            res.send(500, err.message);
        }
        else {
		for (var i=0;i<exercises.length;i++){
		console.log(exercises[i]);}
            res.render('encyclopediaresults', {title: 'Encyclopedia Results', exercises: exercises, workouts:workouts, pageN:0});
        }
    });
};

exports.user_search_results = function(req, res){
    data.usersSearchByUsername({search:req.query.query}, function(err, users) {
        if(err) {
            console.log(err.message);
            res.send(500, err.message);
        }
        else {
            res.render('usersearchresults', {title: 'User Results', users:users, pageN:0});
        }
    });
};
