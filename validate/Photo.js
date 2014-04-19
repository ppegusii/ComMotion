var validator = require('validator');

exports.validate = validate;

function validate(photo,cb){
  photo.id = parseInt(photo.id,10);
  if(isNaN(photo.id)){
    photo.id = undefined;
  }else if(photo.id<=0){
    cb(Error.create('photo.id invalid'),undefined);
    return;
  }
  if(!photo.url || !validator.isURL(photo.url)){
    cb(Error.create('photo.url undefined or invalid URL'),undefined);
    return;
  }
  photo.exerciseId = parseInt(photo.exerciseId,10);
  if(isNaN(photo.exerciseId)){
    photo.exerciseId = undefined;
  }else if(photo.exerciseId<=0){
    cb(Error.create('photo.exerciseId invalid'),undefined);
    return;
  }
  photo.workoutId = parseInt(photo.workoutId,10);
  if(isNaN(photo.workoutId)){
    photo.workoutId = undefined;
  }else if(photo.workoutId<=0){
    cb(Error.create('photo.workoutId invalid'),undefined);
    return;
  }
  cb(undefined,photo);
}
