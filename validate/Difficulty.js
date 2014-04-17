exports.validate = validate;

function validate(difficulty,cb){
  difficulty.id = parseInt(difficulty.id,10);
  if(isNaN(difficulty.id)){
    difficulty.id = undefined;
  }else if(difficulty.id<=0){
    cb(Error.create('difficulty.id'),undefined);
    return;
  }
  cb(undefined,difficulty);
}
