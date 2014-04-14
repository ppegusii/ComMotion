exports.validate = validate;

function validate(musclegroup,cb){
  musclegroup.id = parseInt(musclegroup.id,10);
  if(musclegroup.id<=0){
    cb('invalid musclegroup id',undefined);
    return;
  }
  cb(undefined,musclegroup);
}
