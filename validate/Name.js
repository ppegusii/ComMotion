exports.validate = validate;

function validate(name,cb){
  name.id = parseInt(name.id,10);
  if(name.id<=0){
    cb(Error.create('name.id invalid'),undefined);
    return;
  }
  name.votes = parseInt(name.votes,10);
  if(isNaN(name.votes)){
    cb(Error.create('name.votes NaN'),undefined);
    return;
  }
  cb(undefined,name);
}
