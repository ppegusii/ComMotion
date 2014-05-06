var exercise = require('../data/Exercise.js');
var models = require('../models/index.js');
var data = require(process.env.DATA);

exports.encyclopedia_results = function(req, res){
console.log(JSON.stringify(req.query));
    data.exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId({search:req.query.query, difficultyId:req.query.difficultyId}, function(err, results) {
        if(err) {
            console.log(err.message);
            res.send(500, err.message);
        }
        else {
            res.render('encyclopediaresults', {title: 'Encyclopedia Results', exercises: results.exercises, workouts:results.workouts, pageN:0});
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
