exports.validate = validate;

function validate(difficulty,cb){
  difficulty.id = parseInt(difficulty.id,10);
  if(difficulty.id<=0){
    cb('difficulty.id\n'+__stack,undefined);
    return;
  }
  cb(undefined,difficulty);
}
