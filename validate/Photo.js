exports.validate = validate;

function validate(photo,cb){
  photo.id = parseInt(photo.id,10);
  if(photo.id<=0){
    cb(Error.create('photo.id invalid'),undefined);
    return;
  }
  cb(undefined,photo);
}
