exports.validate = validate;

function validate(difficulty,cb){
  difficulty.id = parseInt(difficulty.id,10);
  if(difficulty.id<=0){
    cb('invalid difficulty id',undefined);
    return;
  }
  cb(undefined,difficulty);
}
