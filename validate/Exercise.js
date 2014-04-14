exports.validate = validate;

function validate(exercise,cb){
  if(exercise.id){
    var eid = parseInt(exercise.id,10);
    if(eid<=0){
      cb('invalid exercise id',undefined);
      return;
    }
    exercise.id = eid;
  }
  if(!exercise.description || exercise.description===''){
    cb('undefined or blank description',undefined);
    return;
  }
  if(!exercise.difficulty.id){
    cb('undefined difficulty id',undefined);
    return;
  }
  var did = parseInt(exercise.difficulty.id,10);
  if(did<=0){
    cb('invalid difficulty id',undefined);
    return;
  }
  exercise.difficulty.id = did;
  if(!exercise.musclegroup.id){
    cb('undefined musclegroup id',undefined);
    return;
  }
  var mid = parseInt(exercise.musclegroup.id,10);
  if(mid<=0){
    cb('invalid musclegroup id',undefined);
    return;
  }
  exercise.musclegroup.id = mid;
  //TODO validate child objects
  cb(undefined,exercise);
}
