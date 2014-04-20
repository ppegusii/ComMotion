var async = require('async');
var validator = require('validator');

var valExercise = require(process.env.VALIDATE_EXERCISE);
var valDifficulty = require(process.env.VALIDATE_DIFFICULTY);

exports.validate = validate;

function validate(user,cb){
  user.id = parseInt(user.id,10);
  if(isNaN(user.id)){
    user.id = undefined;
  }else if(user.id<=0){
    return cb(Error.create('user.id invalid'),undefined);
  }
  if(!user.username || user.username===''){
    return cb(Error.create('user.username blank undefined or blank'),undefined);
  }
  if(!user.password || user.password===''){
    return cb(Error.create('user.password blank undefined or blank'),undefined);
  }
  if(user.avatar_url && !validator.isURL(user.avatar_url)){
    return cb(Error.create('user.avatar_url invalid URL'),undefined);
  }
  if(!user.activities){
    user.activities = [];
  }
  if(!(user.activities instanceof(Array))){
    return cb(Error.create('user.activities not undefined or Array'),undefined);
  }
  if(!user.fav_exercises){
    user.fav_exercises = [];
  }
  if(!(user.fav_exercises instanceof(Array))){
    return cb(Error.create('user.fav_exercises not undefined or Array'),undefined);
  }
  for(var i=0; i<user.fav_exercises.length; i++){
    user.fav_exercises[i].id = parseInt(user.fav_exercises[i].id,10);
    if(!user.fav_exercises[i].id>0){
      return cb(Error.create('user.fav_exercises['+i+'].id invalid'),undefined);
    }
  }
  if(!user.follows){
    user.follows = [];
  }
  if(!(user.follows instanceof(Array))){
    return cb(Error.create('user.follows not undefined or Array'),undefined);
  }
  for(var i=0; i<user.follows.length; i++){
    user.follows[i] = parseInt(user.follows[i],10);
    if(user.follows[i] <= 0){
      return cb(Error.create('A follows id is invalid'),undefined);
    }
  }
  if(!user.followers){
    user.followers = [];
  }
  if(!(user.followers instanceof(Array))){
    return cb(Error.create('user.followers not undefined or Array'),undefined);
  }
  for(var i=0; i<user.followers.length; i++){
    user.followers[i] = parseInt(user.followers[i],10);
    if(user.followers[i] <= 0){
      return cb(Error.create('A followers id is invalid'),undefined);
    }
  }
  async.parallel({
    difficulty: function(callback){
      if(user.difficulty){
        return valDifficulty.validate(user.difficulty,callback);
      }
      callback(undefined,undefined);
    },
    exercises: function(callback){
      async.map(user.fav_exercises,valExercise.validate,callback);
    }/*,
    workouts: function(callback){
      async.map(user.fav_workouts,valWorkout.validate,callback);
    }
    */
  },function afterChildObjectValidation(err,results){
    user.fav_exercises = results.exercises;
    //user.fav_workouts = results.workouts;
    cb(undefined,user);
  });
}
