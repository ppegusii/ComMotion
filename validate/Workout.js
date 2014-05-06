var async = require('async');

var valDifficulty = require(process.env.VALIDATE_DIFFICULTY);
var valVideo = require(process.env.VALIDATE_VIDEO);
var valPhoto = require(process.env.VALIDATE_PHOTO);

exports.validate = validate;

function validate(workout,cb){
  workout.id = parseInt(workout.id,10);
  if(isNaN(workout.id)){
    workout.id = undefined;
  }
  else if(workout.id<=0){
    return cb(Error.create('workout.id invalid'),undefined);
  }
  if(!workout.name || workout.name===''){
    return cb(Error.create('workout.name blank or undefined'),undefined);
  }
  if(!workout.difficulty){
    return cb(Error.create('workout.difficulty undefined'),undefined);
  }
  if(!workout.description || workout.description===''){
    return cb(Error.create('workout.description blank or undefined'),undefined);
  }
  if(!workout.videos){
    workout.videos = [];
  }
  if(!(workout.videos instanceof(Array))){
    return cb(Error.create('workout.videos not undefined or Array'),undefined);
  }
  if(!workout.photos){
    workout.photos = [];
  }
  if(!(workout.photos instanceof(Array))){
    return cb(Error.create('workout.photos not undefined or Array'),undefined);
  }
  async.parallel({
    difficulty: function(callback){
      valDifficulty.validate(workout.difficulty,callback);
    },
    videos: function(callback){
      async.map(workout.videos,valVideo.validate,callback);
    },
    photos: function(callback){
      async.map(workout.photos,valPhoto.validate,callback);
    }
  },
  function afterChildObjectValidation(err,results){
    if(err){
      return cb(err,undefined);
    }
    workout.difficulty = results.difficulty;
    workout.videos = results.videos;
    workout.photos = results.photos;
    cb(undefined,workout);
  });
}
