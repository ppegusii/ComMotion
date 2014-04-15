exports.validate = validate;

function validate(photo,cb){
  photo.id = parseInt(photo.id,10);
  if(photo.id<=0){
    cb('invalid photo id',undefined);
    return;
  }
  cb(undefined,photo);
}
