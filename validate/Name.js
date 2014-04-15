exports.validate = validate;

function validate(name,cb){
  name.id = parseInt(name.id,10);
  if(name.id<=0){
    cb('name.id invalid\n'+__stack,undefined);
    return;
  }
  name.votes = parseInt(name.votes,10);
  if(isNaN(name.votes)){
    cb('name.votes NaN\n'+__stack,undefined);
    return;
  }
  cb(undefined,name);
}
