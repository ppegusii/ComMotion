exports.validate = validate;

function validate(difficulty,cb){
  difficulty.id = parseInt(difficulty.id,10);
  if(!difficulty.id>0){
    cb(Error.create('difficulty.id invalid'),undefined);
    return;
  }
  cb(undefined,difficulty);
}
