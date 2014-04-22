var validator = require('validator');

exports.validate = validate;

function validate(video,cb){
  video.id = parseInt(video.id,10);
  if(isNaN(video.id)){
    video.id = undefined;
  }else if(video.id<=0){
    cb(Error.create('video.id invalid'),undefined);
    return;
  }
  if(!video.url || !validator.isURL(video.url)){
    cb(Error.create('video.url undefined or invalid URL'),undefined);
    return;
  }
  video.exerciseId = parseInt(video.exerciseId,10);
  if(isNaN(video.exerciseId)){
    video.exerciseId = undefined;
  }else if(video.exerciseId<=0){
    cb(Error.create('video.exerciseId invalid'),undefined);
    return;
  }
  video.workoutId = parseInt(video.workoutId,10);
  if(isNaN(video.workoutId)){
    video.workoutId = undefined;
  }else if(video.workoutId<=0){
    cb(Error.create('video.workoutId invalid'),undefined);
    return;
  }
  cb(undefined,video);
}
