exports.validate = validate;

function validate(musclegroup,cb){
  musclegroup.id = parseInt(musclegroup.id,10);
  if(isNaN(musclegroup.id)){
    musclegroup.id = undefined;
  }else if(musclegroup.id<=0){
    cb(Error.create('musclegroup.id'),undefined);
    return;
  }
  cb(undefined,musclegroup);
}
