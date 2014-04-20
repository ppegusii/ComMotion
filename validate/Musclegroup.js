exports.validate = validate;

function validate(musclegroup,cb){
  musclegroup.id = parseInt(musclegroup.id,10);
  if(!musclegroup.id>0){
    cb(Error.create('musclegroup.id invalid'),undefined);
    return;
  }
  cb(undefined,musclegroup);
}
