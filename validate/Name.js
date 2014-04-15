exports.validate = validate;

function validate(name,cb){
  name.id = parseInt(name.id,10);
  if(name.id<=0){
    cb('invalid name id',undefined);
    return;
  }
  name.votes = parseInt(name.votes,10);
  if(isNaN(name.votes)){
    cb('votes is NaN',undefined);
    return;
  }
  cb(undefined,name);
}
