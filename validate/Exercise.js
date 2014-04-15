var async = require('async');

var valDifficulty = require(process.env.VALIDATE_DIFFICULTY);
var valMusclegroup = require(process.env.VALIDATE_MUSCLEGROUP);
var valName = require(process.env.VALIDATE_NAME);
var valVideo = require(process.env.VALIDATE_VIDEO);
var valPhoto = require(process.env.VALIDATE_PHOTO);

exports.validate = validate;

function validate(exercise,cb){
  exercise.id = parseInt(exercise.id,10);
  if(exercise.id<=0){
    cb('invalid exercise id',undefined);
    return;
  }
  if(!exercise.description || exercise.description===''){
    cb('undefined or blank description',undefined);
    return;
  }
  if(!exercise.names){
    cb('undefined names',undefined);
    return;
  }
  if(!exercise.videos){
    cb('undefined videos',undefined);
    return;
  }
  if(!exercise.photos){
    cb('undefined photos',undefined);
    return;
  }
  async.parallel({
    difficulty: function(callback){
      valDifficulty.validate(exercise.difficulty,callback);
    },
    musclegroup: function(callback){
      valMusclegroup.validate(exercise.musclegroup,callback);
    },
    names: function(callback){
      async.map(exercise.names,valName.validate,callback);
    },
    videos: function(callback){
      async.map(exercise.videos,valVideo.validate,callback);
    },
    photos: function(callback){
      async.map(exercise.photos,valPhoto.validate,callback);
    }
  },
  function afterChildObjectValidation(err,results){
    if(err){
      cb(err,undefined);
      return;
    }
    exercise.difficulty = results.difficulty;
    exercise.musclegroup = results.musclegroup;
    exercise.names = results.names;
    exercise.videos = results.videos;
    exercise.photos = results.photos;
    cb(undefined,exercise);
  });
}
