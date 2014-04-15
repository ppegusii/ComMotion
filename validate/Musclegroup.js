exports.validate = validate;

function validate(musclegroup,cb){
  musclegroup.id = parseInt(musclegroup.id,10);
  if(musclegroup.id<=0){
    cb('musclegroup.id invalid\n'+__stack,undefined);
    return;
  }
  cb(undefined,musclegroup);
}
